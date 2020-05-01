import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Favorite} from '../models/entities/Favorite';
import route from '../utilities/route.utility';

@Injectable()
export class FavoriteService {

  constructor(private http: HttpClient) {

  }

  async upload(favorite: Favorite) {
    await this.http.post(route('favorite'), favorite, {
      responseType: 'text'
    }).toPromise();
  }
}
