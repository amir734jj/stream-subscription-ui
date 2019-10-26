import urlJoin from 'url-join';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;

function route(...arg: string[]) {
  return urlJoin(apiUrl, ...arg);
}

export default route;
