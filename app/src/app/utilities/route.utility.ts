import urlJoin from 'url-join';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;
const route = (...arg: any[]) => urlJoin(apiUrl, ...arg.filter(x => x).map(x => x.toString()));

export default route;
