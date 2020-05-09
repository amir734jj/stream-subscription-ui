import * as memoize from 'memoizee';
import {authStorageKey} from '../models/constants/store';
import {ProfileType} from '../types/profile.type';
import * as moment from 'moment';
import * as store from 'store';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CachedAuthenticationService {

  constructor(private http: HttpClient) {
  }

  /**
   * Validate where app is authenticated offline mode
   */
  resolveAuthInfo = memoize((): { authenticated: boolean, profile: ProfileType } => {
    const profile = store.get(authStorageKey, {}) as ProfileType;
    const {token, expires} = profile;
    const flag = !!token && moment(expires).isAfter(moment());

    const minutesUntilTokenExpires = moment.duration(moment(expires).diff(moment())).asMinutes();
    if (minutesUntilTokenExpires > 0 && minutesUntilTokenExpires < 5) {
      Promise.resolve(this.refreshToken()).then();
    }

    return {
      authenticated: flag,
      profile
    };
  }, {maxAge: 1000, preFetch: true});

  private refreshToken = _.throttle(async () => {
    const response = await this.http.get<ProfileType>(route('account', 'refresh')).toPromise();

    if (response.token) {
      const jwtMetadata = jwtDecode<{}>(response.token);
      // store email and jwt token in local storage to keep userRef logged in between page refreshes
      this.setAuthInfo({...jwtMetadata, ...response, timestamp: new Date()});
    }

    return response;
  }, 60 * 1000, {leading: true, trailing: false});

  /**
   * Clear localStorage token
   */
  clearAuthInfo() {
    store.remove(authStorageKey);

    // Clear cache
    this.resolveAuthInfo.clear();
  }

  /**
   * Set auth info into localStorage
   */
  setAuthInfo(info: ProfileType) {
    store.set(authStorageKey, info);

    // Clear cache
    this.resolveAuthInfo.clear();
  }

  isAuthenticated() {
    const {authenticated} = this.resolveAuthInfo();

    return authenticated;
  }
}
