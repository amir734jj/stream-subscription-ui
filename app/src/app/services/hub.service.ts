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
    const BASE_ADDRESS = environment.hubUrl;
    const options: IHttpConnectionOptions = {
      transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => {
        const {token} = store.get(authStorageKey, {}) as ProfileType;
        return token;
      }
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_ADDRESS}`, options)
      .withAutomaticReconnect()
      .build();
  }

  public status() {
    if (!this.connection) {
      return 'Disconnected';
    } else {
      switch (this.connection.state) {
        case HubConnectionState.Connected:
          return 'Connected';
        case HubConnectionState.Connecting:
          return 'Connecting';
        case HubConnectionState.Disconnected:
          return 'Disconnected';
        case HubConnectionState.Disconnecting:
          return 'Disconnecting';
        case HubConnectionState.Reconnecting:
          return 'Reconnecting';
        default:
          return 'Disconnected';
      }
    }
  }
}
