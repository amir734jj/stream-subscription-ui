import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {LoginResponse} from '../models/authentication.service/login/LoginResponse';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import {RegisterResponse} from '../models/authentication.service/register/RegisterResponse';
import route from '../utilities/route.utility';
import {Role} from '../models/RoleEnum';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(route('account', 'login'), loginRequest)
      .pipe(
        map((response: LoginResponse) => {
          // login successful if there's a jwt token in the response
          this.token = response.token;
          const email = response.email;
          if (this.token) {
            // store email and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify({ email, token: this.token }));
          }
          return response;
        })
      );
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
        this.token = null;
        localStorage.removeItem('user');
      }));
  }
}
