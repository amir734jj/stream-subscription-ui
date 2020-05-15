import {Component, OnInit} from '@angular/core';
import {DropboxService} from '../../../services/dropbox.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as buildUrl from 'build-url';
import {environment} from '../../../../environments/environment';

@Component({
	selector: 'app-dropbox',
	templateUrl: './dropbox.component.html',
	styleUrls: ['./dropbox.component.sass']
})
export class DropboxComponent implements OnInit {

	private clientId: string;

	constructor(private dropboxService: DropboxService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	async ngOnInit() {
		const {clientId} = await this.dropboxService.getConfig();
		this.clientId = clientId;

		this.route.params.subscribe(async params => {
			if (params.token) {
				await this.dropboxService.sendToken(params.token);
			}
		});
	}

	async integrate() {
		const dropboxOathUrl = buildUrl('https://www.dropbox.com', {
			path: 'oauth2/authorize',
			queryParams: {
				client_id: this.clientId,
				response_type: 'code',
				redirect_uri: environment.baseUrl + '/dropbox'
			}
		});
		await this.router.navigateByUrl(dropboxOathUrl);
	}
}
