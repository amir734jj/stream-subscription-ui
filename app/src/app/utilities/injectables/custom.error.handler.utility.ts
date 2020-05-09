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
import {List} from 'immutable';

type ResponseHandlerT = (response: HttpErrorResponse) => void;

const responseHandlers = List<ResponseHandlerT>().asMutable();

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  invokeErrorHandlers = (err: HttpErrorResponse) => responseHandlers.forEach(x => x(err));

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
    responseHandlers.push(handler);
  }
}
