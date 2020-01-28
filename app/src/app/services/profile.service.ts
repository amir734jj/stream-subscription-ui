import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {IProfile} from '../models/entities/Profile';
import route from '../utilities/route.utility';

@Injectable()
export class ProfileService {
  public token: string;

  constructor(private http: HttpClient) {

  }

  get() {
    return this.http.get<IProfile>(route('profile'));
  }

  save(profile: IProfile) {
    return this.http.post<IProfile>(route('profile'), profile);
  }
}
