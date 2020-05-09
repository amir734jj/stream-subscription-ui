import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpTransportType, HubConnection, HubConnectionState, IHttpConnectionOptions } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import * as store from 'store';
import { authStorageKey } from '../models/constants/store';
import { ProfileType } from '../types/profile.type';
import { resolveEnumNameTable, enumToString } from '../utilities/enum.utility';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  public connection: HubConnection;

  private statusNameTable = resolveEnumNameTable(HubConnectionState);

  async init() {
    const BASE_ADDRESS = environment.hubUrl;
    const options: IHttpConnectionOptions = {
      transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => {
        const { token } = store.get(authStorageKey, {}) as ProfileType;
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
      return enumToString(this.statusNameTable, this.connection.state);
    }
  }
}
