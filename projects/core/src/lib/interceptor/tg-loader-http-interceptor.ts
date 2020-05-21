import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TG_KEYS } from '../constant';
import { TGLoaderService } from '../service';

@Injectable()
export class TGLoaderHttpInterceptor implements HttpInterceptor {

  constructor(
    private tgLoaderService: TGLoaderService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludeLoader = request.headers.get(TG_KEYS.EXCLUDE_LOADER) ? true : false;
    if (!excludeLoader) {
      // if (!(next instanceof HttpXhrBackend)) {

      // }
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
