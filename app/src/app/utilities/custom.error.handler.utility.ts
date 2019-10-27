import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  static ON_ERROR_HANDLERS: Array<(HttpErrorResponse) => void> = [];

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(() => { }, err => {
          if (err instanceof HttpErrorResponse && err.status !== 0) {
            // do error handling here
            RequestInterceptor.ON_ERROR_HANDLERS.forEach(x => x(err));
          }
        })
      );
  }

  addOnErrorHandler(handler: (HttpErrorResponse) => void) {
    RequestInterceptor.ON_ERROR_HANDLERS.push(handler);
  }
}
