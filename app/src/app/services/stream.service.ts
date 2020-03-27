import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CrudService from './abstracts/crud.service';
import {Stream} from '../models/entities/Stream';

@Injectable()
export class StreamService extends CrudService<Stream> {

  constructor(private http: HttpClient) {
    super();
  }

  resolveHttpClient(): HttpClient {
    return this.http;
  }

  resolveRoute(): string {
    return 'stream';
  }

  default(): Stream {
    return new Stream();
  }
}
