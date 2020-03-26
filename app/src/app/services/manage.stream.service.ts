import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';
import {StreamStatus} from '../models/enums/Status';

type statusType = Map<string, StreamStatus>;

@Injectable()
export class ManageStreamService {

  constructor(private http: HttpClient) {

  }

  start(id: string) {
    return this.http.post<statusType>(route('StreamRipperManager', id, 'start'), null).toPromise();
  }

  stop(id: string) {
    return this.http.post<statusType>(route('StreamRipperManager', id, 'stop'), null).toPromise();
  }

  status() {
    return this.http.get<statusType>(route('StreamRipperManager')).toPromise();
  }
}
