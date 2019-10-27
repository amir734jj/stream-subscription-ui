import urlJoin from 'url-join';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;
const route = (...arg: string[]) => urlJoin(apiUrl, ...arg);

export default route;
