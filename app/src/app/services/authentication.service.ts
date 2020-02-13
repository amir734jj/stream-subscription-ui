import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import route from '../utilities/route.utility';
import {Role} from '../models/RoleEnum';
import * as jwtDecode from 'jwt-decode';
import {ProfileType, ProfileWithTokenType} from '../types/profile.type';
import {setAuthInfo, clearAuthInfo} from '../utilities/auth.utility';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  async isAuthenticated(): Promise<[boolean, ProfileType]> {
    const response = await this.http.get<{ role: Role }>(route('account')).toPromise();

    return [!!Object.keys(response).length, response];
  }

  async login(loginRequest: LoginRequest) {
    const response = await this.http.post<ProfileWithTokenType>(route('account', 'login'), loginRequest).toPromise();

    if (response.token) {
      const jwtMetadata = jwtDecode<{}>(response.token);
      // store email and jwt token in local storage to keep userRef logged in between page refreshes
      setAuthInfo({...jwtMetadata, ...response, timestamp: new Date()});
    }

    return response;
  }

  async register(role: Role, registerRequest: RegisterRequest) {
    return await this.http.post(route('account', 'register', role.toString()), registerRequest, {responseType: 'text'}).toPromise();
  }

  async logout() {
    clearAuthInfo();
    return await this.http.post(route('account', 'logout'), null, {responseType: 'text'}).toPromise();
  }
}
