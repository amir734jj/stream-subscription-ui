import * as memoize from 'memoizee';
import {accessTokenDurationInMinutes, localStorageKey} from '../models/constants/BrowserConstants';
import {ProfileWithTokenType} from '../types/profile.type';
import * as moment from 'moment';
import {TupleType} from '../types/tuple.type';

/**
 * Validate where app is authenticated offline mode
 */
export const anyAuthInfo = memoize((): TupleType<boolean, ProfileWithTokenType> => {
  const profile = (JSON.parse(localStorage.getItem(localStorageKey)) || {}) as ProfileWithTokenType;
  const {token, timestamp} = profile;
  return {
    item1: !!token && moment.duration(moment().diff(moment(timestamp))).asMinutes() <= accessTokenDurationInMinutes,
    item2: profile
  };
}, {maxAge: 1000, preFetch: true});

/**
 * Clear localStorage token
 */
export const clearAuthInfo = () => localStorage.removeItem(localStorageKey);

/**
 * Set auth info into localStorage
 */
export const seAuthInfo = (info: ProfileWithTokenType) => {
  localStorage.setItem(localStorageKey, JSON.stringify(info));

  // Clear cache
  anyAuthInfo.clear();
};
