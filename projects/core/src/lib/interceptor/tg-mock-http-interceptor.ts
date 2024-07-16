import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TGConfig } from '../service';
import { TGMockMapping } from '../model';

/**
 * Intercepts and handles an `HttpRequest` and `HttpResponse` for Mock Services
 *
 * It is dependent on `TGConfig` properties
 *
 * TGConfig.applyMock must be true for mocking services
 *
 * TGConfig.mockMapping must have mappings of mock service
 *
 * @export
 * @class TGMockHttpInterceptor
 * @implement {HttpInterceptor}
 */
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

    return this.realCall(request, next);
  }

  /**
   * Real Service calling
   *
   * @private
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns
   * @memberof TGMockHttpInterceptor
   */
  private realCall(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request);
  }

  /**
   * Requesting mock service
   * if mockMapping.httpStatus between 200 to 299, request `sucessFile`
   * else request `errorFile`
   *
   * @private
   * @param {TGMockMapping} mockMapping
   * @param {HttpHandler} next
   * @returns
   * @memberof TGMockHttpInterceptor
   */
  private mockCall(mockMapping: TGMockMapping, next: HttpHandler) {
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


  /**
   * Generate HttpErrorResponse from HttpResponse
   *
   * @private
   * @param {HttpResponse<any>} httpResponse
   * @returns
   * @memberof TGMockHttpInterceptor
   */
  private generateHttpErrorResponse(httpResponse: HttpResponse<any>) {
    return new HttpErrorResponse({
      error: httpResponse.body,
      headers: httpResponse.headers,
      status: httpResponse.body.httpStatus,
      url: httpResponse.url ?? undefined
    });
  }


  /**
   * Find request url exist in configured TGMockMappings
   *
   * @private
   * @param {HttpRequest<any>} request
   * @returns
   * @memberof TGMockHttpInterceptor
   */
  private findMockMapping(request: HttpRequest<any>) {
    const reqUrl = request.url;
    const reqMethod = request.method;
    return this.tgConfig.mockMapping.find((mock) => {
      if (mock.method !== reqMethod) {
        return false;
      }

      if (`${this.tgConfig.baseAPI}${mock.uri}` === reqUrl
        || (mock.uriRegex && reqUrl.match(mock.uriRegex))) {
        return true;
      }

      return false;
    });
  }
}
