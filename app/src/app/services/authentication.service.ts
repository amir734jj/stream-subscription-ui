import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../models/authentication.service/login/LoginRequest';
import {RegisterRequest} from '../models/authentication.service/register/RegisterRequest';
import route from '../utilities/route.utility';
import * as jwtDecode from 'jwt-decode';
import {ProfileType} from '../types/profile.type';
import * as _ from 'lodash';
import {CachedAuthenticationService} from './cached.authentication.service';
import {HubService} from './hub.service';
import {HubConnectionState} from '@microsoft/signalr';
import {routeStore} from '../models/constants/routeStore';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private hubService: HubService,
              private cachedAuthenticationService: CachedAuthenticationService) {
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
      this.cachedAuthenticationService.setAuthInfo({...jwtMetadata, ...response, timestamp: new Date()});
    }

    return response;
  }

  async register(registerRequest: RegisterRequest) {
    return await this.http.post(route('account', 'register'), registerRequest, {responseType: 'text'}).toPromise();
  }

  async logout() {
    this.cachedAuthenticationService.clearAuthInfo();
    if (this.hubService.status() === HubConnectionState.Connected) {
      await this.hubService.connection.stop();
    }

    routeStore.clear();

    return await this.http.post(route('account', 'logout'), null, {responseType: 'text'}).toPromise();
  }
}
