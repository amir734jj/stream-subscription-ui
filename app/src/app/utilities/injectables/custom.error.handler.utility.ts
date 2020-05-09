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
import {ErrorHandlerStoreUtility, ResponseHandlerT} from './store/error.handler.store.utility';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private errorHandlerStoreUtility: ErrorHandlerStoreUtility) {
  }

  invokeErrorHandlers = (err: HttpErrorResponse) => this.errorHandlerStoreUtility.store.forEach(x => x(err));

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(() => { }, err => {
          if (err instanceof HttpErrorResponse) {
            // do error handling here
            this.invokeErrorHandlers(err);
          }
        })
      );
  }

  addOnErrorHandler(handler: ResponseHandlerT) {
    this.errorHandlerStoreUtility.store = this.errorHandlerStoreUtility.store.push(handler);
  }
}
