import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';

@Injectable()
export class ImageService {
  public token: string;

  constructor(private http: HttpClient) { }

  downloadUrl(key: string) {
	  return key ? route('image', key) : undefined;
  }

  delete(key: string) {
	  if (key) {
		  return this.http.delete(route('image', key, 'delete'), {
			  responseType: "text"
		  }).toPromise();
	  } else {
		  return Promise.resolve(false);
	  }
  }

  async upload(file: File, description: string = '') {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      return await this.http.post(route('image', 'upload'), formData, {
      	headers: {
      		'Content-Type': 'multipart/form-data'
	      },
	      params: { description },
	      responseType: "text"
      }).toPromise() as string;
    } else {
      return Promise.resolve('');
    }
  }
}
