import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TGError } from '../model';

@Injectable()
export class TGErrorHandlingHttpInterceptor implements HttpInterceptor {

  constructor(
    private tgError: TGError,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.checkInternetConnection()) {
      const response = this.generateInternetNotAvaibleError();
      return observableThrowError(response);
    }

    return next
      .handle(request)
      .pipe(
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            const serviceError = this.tgError.fromHttpErrorResponse(response);
            return observableThrowError(serviceError);
          } else {
            return observableThrowError(response);
          }
        }));
  }

  private checkInternetConnection() {
    if (!navigator.onLine) {
      return false;
    }
    return true;
  }

  private generateInternetNotAvaibleError() {
    return new HttpErrorResponse({
      error: 'Internet is not available!',
      status: 510,
    });
  }
}
