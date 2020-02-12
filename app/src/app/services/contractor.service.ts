import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CrudService from './abstracts/crud.service';
import Contractor from '../models/entities/Contractor';

@Injectable()
export class ContractorService extends CrudService<Contractor> {
  public token: string;

  constructor(private http: HttpClient) {
    super();
  }

  resolveHttpClient(): HttpClient {
    return this.http;
  }

  resolveRoute(): string {
    return 'contractor';
  }

  default(): Contractor {
    return new Contractor();
  }
}
