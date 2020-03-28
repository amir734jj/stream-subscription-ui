import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HttpTransportType, HubConnection, HubConnectionState, IHttpConnectionOptions} from '@microsoft/signalr';
import {environment} from '../../environments/environment';
import * as store from 'store';
import {authStorageKey} from '../models/constants/BrowserConstants';
import {ProfileType} from '../types/profile.type';

@Injectable()
export class HubService {

  public connection: HubConnection;

  async init() {
    const {token} = store.get(authStorageKey, {}) as ProfileType;
    const BASE_ADDRESS = environment.hubUrl;
    const options: IHttpConnectionOptions = {
      transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => token
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_ADDRESS}`, options)
      .build();
  }
}
