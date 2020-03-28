import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {HubService} from '../../services/hub.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  public log: string[] = [];
  public count = 0;
  public isAuthenticated = false;

  constructor(private hubService: HubService, private authenticationService: AuthenticationService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authenticationService.isAuthenticated();

    if (this.isAuthenticated) {
      await this.hubService.init();

      this.hubService.connection.on('log', (...data) => {
        this.log.unshift(data.join('-'));
      });

      this.hubService.connection.on('count', count => {
        this.count = count;
      });

      await this.hubService.connection.start();
    }
  }

  async ngOnDestroy() {
    if (await this.authenticationService.isAuthenticated()) {
      await this.hubService.connection.stop();
    }
  }

}
