import {Component, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpTransportType, IHttpConnectionOptions} from '@microsoft/signalr';
import * as store from 'store';
import {authStorageKey} from '../../models/constants/BrowserConstants';
import * as _ from 'lodash';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  public log: string[] = [];
  public count = 0;
  public isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authenticationService.isAuthenticated();
    const BASE_ADDRESS = environment.hubUrl;

    if (this.isAuthenticated) {
      const options: IHttpConnectionOptions = {
        transport: HttpTransportType.LongPolling,

        accessTokenFactory: () => {
          return _.get(store.get(authStorageKey), 'token');
        }
      };

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_ADDRESS}`, options)
        .build();

      connection.on('log', (...data) => {
        this.log.unshift(data.join('-'));
      });

      connection.on('count', count => {
        this.count = count;
      });

      await connection.start();
    }
  }

}
