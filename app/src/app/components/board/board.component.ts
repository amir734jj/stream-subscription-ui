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
  public initialized = false;

  constructor(private hubService: HubService, private cachedAuthenticationService: CachedAuthenticationService) {
  }


  async ngOnDestroy() {
    if (this.initialized) {
      await this.hubService.connection.stop();
    }
  }

  async ngOnInit() {
    if (this.initialized) {
      return;
    }

    this.isAuthenticated = await this.cachedAuthenticationService.isAuthenticated();

    if (this.isAuthenticated) {
      await this.hubService.init();

      this.hubService.connection.on('log', (...data) => {
        this.appendLog(data);
      });

      this.hubService.connection.on('count', count => {
        this.count = count;
      });

      this.hubService.connection.on('download', (...data) => {
        this.appendLog(data);
      });

      await this.hubService.connection.start();

      this.initialized = true;
    }
  }

  appendLog(...arg: any) {
    this.log.unshift(arg.join('-'));
    this.log = this.log.slice(0, 100);
  }

}
