import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HubService} from '../../services/hub.service';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';
import {SongMetadata} from '../../types/song.metadata.type';
import {Track} from 'ngx-audio-player';
import * as _ from 'lodash';
import {Subscription, timer} from 'rxjs';
import {ManageStreamService} from '../../services/manage.stream.service';
import {StreamStatus} from '../../models/enums/Status';
import * as download from 'downloadjs';
import {AudioPlayerService} from 'ngx-audio-player/lib/service/audio-player-service/audio-player.service';
import {Stream} from '../../models/entities/Stream';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  public log: string[] = [];
  public msaapPlaylist: Track[] = [];
  public msaapDisplayTitle = true;
  public msaapDisplayPlayList = true;
  public msaapPageSizeOptions = [2, 4, 6, 8];
  public msaapDisplayVolumeControls = true;

  public userCount = 0;
  private logLimit = 30;
  public isAuthenticated = false;
  public initialized = false;
  public streamsCount = 0;
  private streamCountSubscription: Subscription = null;
  public status = 'Disconnected';

  @ViewChild('musicPlayer') musicPlayerRef: AudioPlayerService;

  constructor(private hubService: HubService,
              private manageStreamService: ManageStreamService,
              private cachedAuthenticationService: CachedAuthenticationService) {
  }


  async ngOnDestroy() {
    if (this.initialized) {
      await this.hubService.connection.stop();
      this.streamCountSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    if (this.initialized) {
      return;
    }

    this.isAuthenticated = await this.cachedAuthenticationService.isAuthenticated();

    if (this.isAuthenticated) {
      await this.hubService.init();

      const logHandler = _.throttle((...data) => this.appendLog(data), 350, {trailing: true});

      this.hubService.connection.on('log', logHandler);

      this.hubService.connection.on('count', userCount => this.userCount = userCount);

      this.hubService.connection.on('download', (filename: string, {artist, title}: SongMetadata, base64: string, stream: Stream) => {
        if (base64 && base64.length) {
          this.msaapPlaylist.push({
            title: `${artist}-${title} (${stream.name})`,
            link: `data:audio/mp3;base64,${base64}`
          });

          this.appendLog(`downloaded ${filename}`);
        }
      });

      this.streamCountSubscription = timer(0, 15000)
        .subscribe(async () => {
          if (await this.cachedAuthenticationService.isAuthenticated()) {
            const status = await this.manageStreamService.status();
            this.streamsCount = _.chain(status)
              .filter((value) => value === StreamStatus.Started)
              .size()
              .value();
          }
        });

      this.hubService.connection.onreconnecting(this.setStatus('Reconnecting'));
      this.hubService.connection.onreconnected(this.setStatus('Reconnected'));
      this.hubService.connection.onclose(this.setStatus('Disconnected'));

      await (this.hubService.connection.start())
        .then(this.setStatus('Connected'));

      this.initialized = true;
    } else if (!!this.streamCountSubscription) {
      this.streamCountSubscription.unsubscribe();
    }
  }

  appendLog(...arg: any) {
    this.log.unshift(arg.join('-'));
    this.log = this.log.slice(0, this.logLimit);
  }

  public setStatus(status: string) {
    return () => this.status = status;
  }

  downloadCurrentSong() {
    const refService = _.get(this.musicPlayerRef, 'playlistService') as AudioPlayerService;
    const index = refService.getIndexSong();
    download(this.msaapPlaylist[index].link, this.msaapPlaylist[index].title);
  }
}
