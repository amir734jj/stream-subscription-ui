import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import route from '../utilities/route.utility';
import * as jwtDecode from 'jwt-decode';
import {ProfileType} from '../types/profile.type';
import {setAuthInfo, clearAuthInfo} from '../utilities/auth.utility';
import * as _ from 'lodash';
import {HubService} from './hub.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private hubService: HubService) {
  }

  async isAuthenticated(): Promise<boolean> {
    const response = await this.http.get<{}>(route('account')).toPromise();

    return _.size(response) !== 0;
  }

  async login(loginRequest: LoginRequest) {
    const response = await this.http.post<ProfileType>(route('account', 'login'), loginRequest).toPromise();

    if (response.token) {
      const jwtMetadata = jwtDecode<{}>(response.token);
      // store email and jwt token in local storage to keep userRef logged in between page refreshes
      setAuthInfo({...jwtMetadata, ...response, timestamp: new Date()});

      await this.hubService.login(response.token);
    }

    return response;
  }

  async register(registerRequest: RegisterRequest) {
    return await this.http.post(route('account', 'register'), registerRequest, {responseType: 'text'}).toPromise();
  }

  async logout() {
    clearAuthInfo();

    await this.hubService.logOut();

    return await this.http.post(route('account', 'logout'), null, {responseType: 'text'}).toPromise();
  }
}
