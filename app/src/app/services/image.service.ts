import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';
import {toBase64} from '../utilities/file.utility';

@Injectable()
export class ImageService {
  public token: string;

  constructor(private http: HttpClient) {
  }

  downloadUrl(key: string) {
    return key ? route('image', key) : undefined;
  }

  delete(key: string) {
    if (key) {
      return this.http.delete(route('image', key, 'delete'), {
        responseType: 'text'
      }).toPromise();
    } else {
      return Promise.resolve(false);
    }
  }

  async upload(file: File, description: string = '') {
    if (file) {
      const payload = {
        description,
        base64: await toBase64(file),
        name: file.name,
        size: file.size
      };
      const key = await this.http.post(route('image', 'upload', 'base64'), payload, {responseType: 'text'}).toPromise();
      return key.replace(/"/g, '');
    } else {
      return Promise.resolve('');
    }
  }
}
