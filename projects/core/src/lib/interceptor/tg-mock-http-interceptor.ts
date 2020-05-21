import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TGConfig } from '../service';

@Injectable()
export class TGMockHttpInterceptor implements HttpInterceptor {

  constructor(
    private tgConfig: TGConfig
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tgConfig.applyMock) {
      const mockMapping = this.findMockMapping(request);
      if (mockMapping && mockMapping.applyMock) {
        return this.mockCall(mockMapping, next);
      }
    }

    return this.liveCall(request, next);
  }

  private liveCall(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request);
  }

  private mockCall(mockMapping, next: HttpHandler) {
    let mockRequest;
    if (mockMapping.httpStatus >= 200 && mockMapping.httpStatus <= 299) {
      mockRequest = new HttpRequest('GET', mockMapping.successFile);
    } else {
      mockRequest = new HttpRequest('GET', mockMapping.errorFile);
    }

    return next
      .handle(mockRequest)
      .pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            if (mockMapping.httpStatus < 200 || mockMapping.httpStatus > 299) {
              throw this.generateHttpErrorResponse(ev);
            }
          }
        }));
  }

  private generateHttpErrorResponse(httpResponse: HttpResponse<any>) {
    return new HttpErrorResponse({
      error: httpResponse.body,
      headers: httpResponse.headers,
      status: httpResponse.body.httpStatus,
      url: httpResponse.url
    });
  }

  private findMockMapping(request: HttpRequest<any>) {
    const reqUrl = request.url;
    const reqMethod = request.method;
    return this.tgConfig.mockMapping.find(mock => `${this.tgConfig.baseAPI}${mock.uri}` === reqUrl && mock.method === reqMethod);
  }
}
