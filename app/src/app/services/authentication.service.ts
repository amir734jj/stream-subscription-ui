import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import {RegisterResponse} from '../models/authentication.service/register/RegisterResponse';
import route from '../utilities/route.utility';
import {Role} from '../models/RoleEnum';
// @ts-ignore
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post(route('account', 'login'), loginRequest, { responseType: 'text' })
      .pipe(tap(token => {
        // login successful if there's a jwt token in the response
        if (token) {
          const metadata = jwtDecode(token);
          // store email and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify({ ...metadata, token }));
        }
      }));
  }

  register(role: Role, registerRequest: RegisterRequest) {
    return this.http.post(route('account', 'register', role.toString()), registerRequest)
      .pipe(
        map((response: RegisterResponse) => {
          return response;
        })
      );
  }

  logout() {
    return this.http.post(route('account', 'logout'), { responseType: 'text' })
      .pipe(tap(_ => {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('user');
      }));
  }
}
