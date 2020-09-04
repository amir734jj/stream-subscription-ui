import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';
import {ShoutcastStream} from '../models/entities/ShoutcastStream';
import {Injectable} from '@angular/core';

@Injectable()
export class ShoutcastService {
  constructor(private http: HttpClient) {

  }

  collect(params: { [key: string]: string }) {
    return this.http.get<ShoutcastStream[]>(route('ShoutcastDirectory'), {params});
  }

  url(id: number) {
    return this.http.get(route('ShoutcastDirectory', 'url', id), { responseType: 'text' });
  }

  genres() {
    return this.http.get<string[]>(route('ShoutcastDirectory', 'genres'));
  }
}
