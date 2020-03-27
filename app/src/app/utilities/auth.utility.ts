import * as memoize from 'memoizee';
import {accessTokenDurationInMinutes, authStorageKey} from '../models/constants/BrowserConstants';
import {ProfileType} from '../types/profile.type';
import * as moment from 'moment';
import {TupleType} from '../types/tuple.type';
import * as store from 'store';

/**
 * Validate where app is authenticated offline mode
 */
export const resolveAuthInfo = memoize((): TupleType<boolean, ProfileType> => {
  const profile = store.get(authStorageKey, {}) as ProfileType;
  const {token, timestamp} = profile;
  const flag = !!token && moment.duration(moment().diff(moment(timestamp))).asMinutes() <= accessTokenDurationInMinutes;
  return {
    item1: flag,
    item2: profile
  };
}, {maxAge: 1000, preFetch: true});

/**
 * Clear localStorage token
 */
export const clearAuthInfo = () => store.remove(authStorageKey);

/**
 * Set auth info into localStorage
 */
export const setAuthInfo = (info: ProfileType) => {
  store.set(authStorageKey, info);

  // Clear cache
  resolveAuthInfo.clear();
};
