import {Component, OnDestroy, OnInit} from '@angular/core';
import {HubService} from '../../services/hub.service';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  public log: string[] = [];
  public count = 0;
  public isAuthenticated = false;

  constructor(private hubService: HubService, private cachedAuthenticationService: CachedAuthenticationService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.cachedAuthenticationService.isAuthenticated();

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
    if (await this.cachedAuthenticationService.isAuthenticated()) {
      await this.hubService.connection.stop();
    }
  }

}
