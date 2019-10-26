import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {LoginResponse} from '../models/authentication.service/login/LoginResponse';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import {RegisterResponse} from '../models/authentication.service/register/RegisterResponse';

@Injectable()
export class AuthenticationService {
  public token: string;
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
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

  register(registerRequest: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, registerRequest)
      .pipe(
        map((response: RegisterResponse) => {
          return response;
        })
      );
  }

  logout() {
    const uri = `${this.apiUrl}/logout`;
    return this.http.get(uri)
      .pipe(tap(_ => {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('user');
      }));
  }
}
