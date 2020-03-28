import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CachedAuthenticationService} from '../services/cached.authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cachedAuthenticationService: CachedAuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.getToken()}`)
        .append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept')
    });
    return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (response: HttpErrorResponse) => {
    }));
  }

  getToken() {
    const {token = ''} = this.cachedAuthenticationService.resolveAuthInfo().profile;
    return token;
  }
}
