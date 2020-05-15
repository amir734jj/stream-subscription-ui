import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DropboxService {
	constructor(private http: HttpClient) {

	}

	public getConfig() {
		return this.http.get<{ clientId: string }>('dropbox/config').toPromise();
	}

	public sendToken(token: string) {
		return this.http.post('dropbox/token', { token }).toPromise();
	}
}
