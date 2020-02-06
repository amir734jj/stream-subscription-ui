import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Profile} from '../models/entities/Profile';
import route from '../utilities/route.utility';

@Injectable()
export class ProfileService {
  public token: string;

  constructor(private http: HttpClient) {

  }

  get() {
    return this.http.get<Profile>(route('profile'));
  }

  save(profile: Profile) {
    return this.http.post<Profile>(route('profile'), profile);
  }
}
