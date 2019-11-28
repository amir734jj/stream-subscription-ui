import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import {RegisterResponse} from '../models/authentication.service/register/RegisterResponse';
import route from '../utilities/route.utility';
import {Role} from '../models/RoleEnum';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<{ token: string }>(route('account', 'login'), loginRequest)
      .pipe(map(response => {
        // login successful if there's a jwt token in the response
        if (response.token) {
          const jwtMetadata = jwtDecode(response.token);
          // store email and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify({...jwtMetadata, ...response}));
        }
      }));
  }

  register(role: Role, registerRequest: RegisterRequest) {
    return this.http.post(route('account', 'register', role.toString()), registerRequest, {responseType: 'text'})
      .pipe(
        map((response: RegisterResponse) => {
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    return this.http.post(route('account', 'logout'), null, {responseType: 'text'})
      .pipe(tap(_ => {
        // clear token remove user from local storage to log user out
      }));
  }
}
