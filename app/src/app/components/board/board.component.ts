import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HubService} from '../../services/hub.service';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';
import {SongMetadata} from '../../types/song.metadata.type';
import * as _ from 'lodash';
import {Subscription, timer} from 'rxjs';
import {ManageStreamService} from '../../services/manage.stream.service';
import {StreamStatus} from '../../models/enums/Status';
import * as download from 'downloadjs';
import {Stream} from '../../models/entities/Stream';
import {MatPaginator} from '@angular/material/paginator';
import {MediaType} from '../../types/media.type';
import {Howl} from 'howler';
import {FavoriteService} from '../../services/favorite.service';
import {toAudioUrl} from '../../utilities/file.utility';
import {HubConnectionState} from '@microsoft/signalr/dist/esm/HubConnection';
import {retry} from '../../utilities/monad.utility';
import {roughSizeOfObject} from '../../utilities/memory.utility';
import * as moment from 'moment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(private hubService: HubService,
              private favoriteService: FavoriteService,
              private manageStreamService: ManageStreamService,
              private cachedAuthenticationService: CachedAuthenticationService) {
    this.duration = _.throttle(() => {
      switch (this.player) {
        case null:
          return '';
        default:
          return moment().startOf('day')
            .seconds(this.player.duration())
            .format('mm:ss');
      }
    }, 1000, { trailing: true });
  }

  public duration: () => string;
  public reconnecting = false;
  public pageSize = 5;
  public currentPage = 1;
  public player: Howl = null;
  public playing = false;
  public index = -1;
  public log: string[] = [];
  public userCount = 0;
  private logLimit = 25;
  public isAuthenticated = false;
  public initialized = false;
  public streamsCount = 0;
  private streamCountSubscription: Subscription = null;
  public dataSource: MediaType[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  async ngOnDestroy() {
    if (this.initialized) {
      await this.hubService.connection.stop();
      this.streamCountSubscription.unsubscribe();

      if (this.player !== null) {
        this.player.off();
      }
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
          const item = {
            name: `${artist}-${title}`,
            fullName: `${artist}-${title} (${stream.name})`,
            source: stream.name,
            filename: `${artist}-${title} (${stream.name}).mp3`,
            audio: base64,
            index: this.dataSource.length
          };

          this.dataSource = [...this.dataSource, item];

          if (this.index === -1) { this.index = 0; }

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

      await (this.hubService.connection.start());

      this.initialized = true;
    } else if (!!this.streamCountSubscription) {
      this.streamCountSubscription.unsubscribe();
    }
  }

  appendLog(...arg: any) {
    this.log.unshift(arg.join('-'));
    this.log = this.log.slice(0, this.logLimit);
  }

  downloadSongAtIndex(i: number) {
    download(toAudioUrl(this.dataSource[i].audio), this.dataSource[i].filename);
  }

  loadPlayer() {
    this.unloadPlayer();

    this.player = new Howl({
      src: [toAudioUrl(this.dataSource[this.index].audio)],
      onend: () => {
        this.nextTrack();
      }
    });
  }

  unloadPlayer() {
    if (this.player !== null) {
      this.player.stop();
      this.player.off();
      this.player.unload();
    }
  }

  playTrack() {
    this.playing = true;
    this.loadPlayer();
    this.player.play();
  }

  stopTrack() {
    this.playing = false;
    if (this.player !== null) {
      this.player.pause();
    }
  }

  resumeTrack() {
    this.playing = true;
    if (this.player !== null) {
      this.player.play();
    }
  }

  toggleTrack() {
    if (this.playing) {
      this.stopTrack();
    } else if (this.player !== null) {
      this.resumeTrack();
    } else {
      this.playTrack();
    }
  }

  nextTrack() {
    if (this.index + 1 < this.dataSource.length) {
      this.index++;

      this.loadPlayer();
      this.playTrackIfWasPlaying();
    } else {
      this.stopTrack();
    }
  }

  previousTrack() {
    if (this.index - 1 >= 0) {
      this.index--;

      this.loadPlayer();
      this.playTrackIfWasPlaying();
    }
  }

  playTrackIfWasPlaying() {
    if (this.playing) {
      this.playTrack();
    }
  }

  playTrackAtIndex(i: number) {
    if (i === this.index && !this.playing && this.player !== null) {
      this.resumeTrack();
    } else {
      this.index = i;
      this.playTrack();
    }
  }

  async sendToFavorite(i: number) {
    await this.favoriteService.upload({
      filename: this.dataSource[i].filename,
      stream: this.dataSource[i].audio
    });
  }

  async reconnect() {
    this.reconnecting = true;
    await retry(() => this.hubService.connection.start())(5)
      .finally(() => this.reconnecting = false);
  }

  clearCache() {
    this.currentPage = 1;
    this.index = 0;
    this.dataSource = [{
      ...this.dataSource[this.index],
      index: 0
    }];
  }

  get pages() {
    return Math.ceil(this.dataSource.length / this.pageSize);
  }

  get pageScope() {
    return _.range(1, this.pages + 1, 1);
  }

  get currentWindow(): MediaType[] {
    const startAt = (this.currentPage - 1) * this.pageSize;
    const endOn = startAt + this.pageSize;
    return this.dataSource.slice(startAt, endOn);
  }

  get reconnectingMode(): boolean {
    return this.hubService.connection && this.hubService.connection.state !== HubConnectionState.Connected && !!this.dataSource.length;
  }

  get status(): string {
    return this.hubService.status();
  }

  get memorySize(): string {
    return `${Math.round(roughSizeOfObject(this.dataSource) / 1000000)}mb`;
  }

  get progress(): number {
    switch (this.player) {
      case null:
        return 0;
      default:
        return ((this.player.seek() as number || 0) / (this.player.duration() || 1)) * 100;
    }
  }
}
