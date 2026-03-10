import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TG_KEYS } from '../constant';
import { TGLoaderService } from '../service';

/**
 * Intercepts and handles an `HttpRequest` and `HttpResponse` for Service Loader
 *
 * Intercepter using TGLoaderService service, it has two methods `start()` and `end()`
 *
 * Before every request, it will call `start()` method
 *
 * After every response, it will call `stop()` method
 *
 * In case of excluding loader, You can pass header with key `TG_KEYS.EXCLUDE_LOADER`.
 *
 * @example
 *    const headers = new HttpHeaders().append(TG_KEYS.EXCLUDE_LOADER, true);
 *
 * @export
 * @class TGLoaderHttpInterceptor
 * @implement {HttpInterceptor}
 */
@Injectable()
export class TGLoaderHttpInterceptor implements HttpInterceptor {
  private tgLoaderService = inject(TGLoaderService)
  constructor() {
    
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /** Check header - if loader exluded */
    const excludeLoader = request.headers.get(TG_KEYS.EXCLUDE_LOADER) ? true : false;
    if (!excludeLoader) {
      this.tgLoaderService.start();
    }

    return next
      .handle(request)
      .pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            if (!excludeLoader) {
              this.tgLoaderService.end();
            }
          }
        }),
        catchError(response => {
          if (!excludeLoader) {
            this.tgLoaderService.end();
          }
          return observableThrowError(response);
        }));
  }
}
