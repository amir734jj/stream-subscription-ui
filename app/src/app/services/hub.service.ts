import {Injectable} from '@angular/core';
import {HttpTransportType, HubConnection, IHttpConnectionOptions} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  public connection: HubConnection;

  async login(token) {
    const BASE_ADDRESS = environment.hubUrl;
    const options: IHttpConnectionOptions = {
      transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => token
    };

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_ADDRESS}`, options)
      .build();

    await this.connection.start();
  }

  async logOut() {
    await this.connection.stop();
  }
}
