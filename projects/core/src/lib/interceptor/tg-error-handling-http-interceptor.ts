import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TGError } from '../model';
import { isPlatformBrowser } from '@angular/common';

/**
 * Intercepts and handles an `HttpResponse` for Error Handling.
 *
 * It is tranforming `HttpErrorResponse` into TGError
 *
 * In case of `Internet is not available`, It will generate custome `HttpErrorResponse`
 *
 * @example
 *    new HttpErrorResponse({
 *                        error: 'Internet is not available!',
 *                        status: 510,
 *    });
 *
 * @export
 * @class TGErrorHandlingHttpInterceptor
 * @implement {HttpInterceptor}
 */
@Injectable()
export class TGErrorHandlingHttpInterceptor implements HttpInterceptor {

  constructor(
    private tgError: TGError,
    @Inject(PLATFORM_ID) private platform: any,
  ) { }

  /**
   * Identifies and handles a given HTTP request.
   * @param req The outgoing request object to handle.
   * @param next The next interceptor in the chain, or the backend
   * if no interceptors remain in the chain.
   * @returns An observable of the TGError stream.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.checkInternetConnection()) {
      const serviceError = this.tgError.fromHttpErrorResponse(this.generateInternetNotAvaibleError());
      return observableThrowError(serviceError);
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

  /**
   * Checking Internet connection
   * It will return false if internet is not available else true
   *
   * @private
   * @returns boolean
   * @memberof TGErrorHandlingHttpInterceptor
   */
  private checkInternetConnection() {
    if (isPlatformBrowser(this.platform)) {
      if (navigator && !navigator.onLine) {
        return false;
      }
    }
    return true;
  }

  /**
   * Generating HttpErrorResponse for Internet is not available
   *
   * @private
   * @returns
   * @memberof TGErrorHandlingHttpInterceptor
   */
  private generateInternetNotAvaibleError() {
    return new HttpErrorResponse({
      error: 'Internet is not available!',
      status: 510,
    });
  }
}
