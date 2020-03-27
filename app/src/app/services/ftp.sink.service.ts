import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CrudService from './abstracts/crud.service';
import {FtpSink} from '../models/entities/FtpSink';

@Injectable()
export class FtpSinkService extends CrudService<FtpSink> {

  constructor(private http: HttpClient) {
    super();
  }

  resolveHttpClient(): HttpClient {
    return this.http;
  }

  resolveRoute(): string {
    return 'ftpSink';
  }

  default(): FtpSink {
    return new FtpSink();
  }
}
