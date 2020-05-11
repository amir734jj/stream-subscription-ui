import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {FavoriteService} from '../../services/favorite.service';
import {toAudioUrl, toAudioBlob} from '../../utilities/file.utility';
import {HubConnectionState} from '@microsoft/signalr/dist/esm/HubConnection';
import {retry} from '../../utilities/monad.utility';
import {roughSizeOfObject} from '../../utilities/memory.utility';
import {MediaSessionUtility} from 'src/app/utilities/injectables/mediaSession.utility';
import {MediaSessionPlaybackState} from 'src/app/types/mediaSession.type';
import * as WaveSurfer from 'wavesurfer.js';
import {formatTimeSpan} from '../../utilities/timespan.utility';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {
  private innerWidth = 0;

  constructor(private hubService: HubService,
              private favoriteService: FavoriteService,
              private manageStreamService: ManageStreamService,
              private mediaSessionUtility: MediaSessionUtility,
              private cachedAuthenticationService: CachedAuthenticationService) {
  }

  public reconnecting = false;
  public pageSize = 5;
  public currentPage = 1;
  public player: WaveSurfer = null;
  public playing = false;
  public index = -1;
  public log: string[] = [];
  public userCount = 0;
  private logLimit = 25;
  public isAuthenticated = false;
  public streamsCount = 0;
  private streamCountSubscription: Subscription = null;
  public dataSource: MediaType[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  async ngOnDestroy() {
    if (this) {
      await this.hubService.connection.stop();
      this.streamCountSubscription.unsubscribe();

      if (this.player !== null) {
        this.player.destroy();
      }
    }
  }

  async ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.mediaSessionUtility.setPlaybackEvents({
      onPreviousTrack: () => this.previousTrack(),
      onNextTrack: () => this.nextTrack(),
      onPause: () => this.stopTrack(),
      onPlay: () => this.playTrack()
    });

    this.isAuthenticated = this.cachedAuthenticationService.isAuthenticated();

    await this.hubService.init();

    const logHandler = _.throttle((...data) => this.appendLog(data), 350, {trailing: true});

    this.hubService.connection.on('log', logHandler);

    this.hubService.connection.on('count', userCount => this.userCount = userCount);

    this.hubService.connection.on('download', (filename: string, songMetadata: SongMetadata, base64: string, stream: Stream) => {
      if (base64 && base64.length) {
        const {artist, title} = songMetadata;
        const item = {
          ...songMetadata,
          name: `${artist}-${title}`,
          fullName: `${artist}-${title} (${stream.name})`,
          source: stream.name,
          filename: `${artist}-${title} (${stream.name}).mp3`,
          audio: base64,
          index: this.dataSource.length,
          formattedDuration: formatTimeSpan(songMetadata.duration),
          tags: _.take(songMetadata.tags, 3)
        };

        this.dataSource = [...this.dataSource, item];

        if (this.index === -1) {
          this.index = 0;
        }

        this.appendLog(`downloaded ${filename}`);
        this.appendLog(JSON.stringify(_.pick(songMetadata, ['artist', 'title', 'playCount', 'duration'])));
      }
    });

    this.streamCountSubscription = timer(0, 15000)
      .subscribe(async () => {
        if (this.cachedAuthenticationService.isAuthenticated()) {
          const status = await this.manageStreamService.status();
          this.streamsCount = _.chain(status)
            .filter((value) => value === StreamStatus.Started)
            .size()
            .value();
        }
      });

    await (this.hubService.connection.start());
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  appendLog(...arg: any) {
    this.log.unshift(arg.join('-'));
    this.log = this.log.slice(0, this.logLimit);
  }

  downloadSongAtIndex(i: number) {
    download(toAudioUrl(this.dataSource[i].audio), this.dataSource[i].filename);
  }

  async loadPlayer() {
    this.unloadPlayer();
    const item = this.dataSource[this.index];

    this.mediaSessionUtility.setMetadata(item);

    this.player = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      responsive: true,
      hideScrollbar: this.isMobile
    });

    this.player.loadBlob(toAudioBlob(item.audio));
    this.player.on('play', () => this.mediaSessionUtility.setPlaybackState(MediaSessionPlaybackState.Playing));
    this.player.on('pause', () => this.mediaSessionUtility.setPlaybackState(MediaSessionPlaybackState.Paused));
    this.player.on('finish', () => this.nextTrack());

    this.mediaSessionUtility.setPlaybackState(MediaSessionPlaybackState.None);

    await new Promise((resolve, reject) => {
      this.player.on('ready', resolve);
      this.player.on('error', reject);
    });
  }

  unloadPlayer() {
    if (this.player !== null) {
      this.player.stop();
      this.player.destroy();
    }
  }

  async playTrack() {
    this.playing = true;
    await this.loadPlayer();
    await this.player.play();
  }

  async stopTrack() {
    this.playing = false;
    if (this.player !== null) {
      await this.player.pause();
    }
  }

  async resumeTrack() {
    this.playing = true;
    if (this.player !== null) {
      await this.player.play();
    }
  }

  async toggleTrack() {
    if (this.playing) {
      await this.stopTrack();
    } else if (this.player !== null) {
      await this.resumeTrack();
    } else {
      await this.playTrack();
    }
  }

  async nextTrack() {
    if (this.index + 1 < this.dataSource.length) {
      this.index++;

      await this.loadPlayer();
      await this.playTrackIfWasPlaying();
    } else {
      await this.stopTrack();
    }
  }

  async previousTrack() {
    if (this.index - 1 >= 0) {
      this.index--;

      await this.loadPlayer();
      await this.playTrackIfWasPlaying();
    }
  }

  async playTrackIfWasPlaying() {
    if (this.playing) {
      await this.playTrack();
    }
  }

  async playTrackAtIndex(i: number) {
    if (i === this.index && !this.playing && this.player !== null) {
      await this.resumeTrack();
    } else {
      this.index = i;
      await this.playTrack();
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
    return this.hubService.connection &&
      this.hubService.connection.state !== HubConnectionState.Connected &&
      this.hubService.connection.state !== HubConnectionState.Reconnecting &&
      !!this.dataSource.length;
  }

  get status(): string {
    return this.hubService.status();
  }

  get isMobile(): boolean {
    return this.innerWidth < 768;
  }

  get memorySize(): string {
    return `${Math.round(roughSizeOfObject(this.dataSource) / 1000000)}mb`;
  }

  get progress(): number {
    switch (this.player) {
      case null:
        return 0;
      default:
        return ((this.player.getCurrentTime() || 0) / (this.player.getDuration() || 1)) * 100;
    }
  }
}
