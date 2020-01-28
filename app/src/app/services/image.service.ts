import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';


@Injectable()
export class ImageService {
  public token: string;

  constructor(private http: HttpClient) {

  }

  upload(file: File) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<string>(route('image', 'upload'), formData).toPromise();
    } else {
      return Promise.reject('');
    }
  }
}
