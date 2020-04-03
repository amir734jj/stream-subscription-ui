import * as memoize from 'memoizee';
import {authStorageKey} from '../models/constants/BrowserConstants';
import {ProfileType} from '../types/profile.type';
import * as moment from 'moment';
import * as store from 'store';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachedAuthenticationService {
  /**
   * Validate where app is authenticated offline mode
   */
  resolveAuthInfo = memoize((): { authenticated: boolean, profile: ProfileType } => {
    const profile = store.get(authStorageKey, {}) as ProfileType;
    const {token, expires} = profile;
    const flag = !!token && moment(expires).isAfter(moment());
    return {
      authenticated: flag,
      profile
    };
  }, {maxAge: 1000, preFetch: true});

  /**
   * Clear localStorage token
   */
  clearAuthInfo() {
    store.remove(authStorageKey);
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
