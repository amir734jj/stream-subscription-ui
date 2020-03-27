import {Component, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpTransportType, IHttpConnectionOptions} from '@microsoft/signalr';
import * as store from 'store';
import {authStorageKey} from '../../models/constants/BrowserConstants';
import * as _ from 'lodash';
import {HubService} from '../../services/hub.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  public log: string[] = [];
  public count = 0;
  public isAuthenticated = false;

  constructor(private hubService: HubService) {
  }

  async ngOnInit() {

    this.hubService.connection.on('log', (...data) => {
      this.log.unshift(data.join('-'));
    });

    this.hubService.connection.on('count', count => {
      this.count = count;
    });
  }

}
