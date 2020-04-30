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
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MediaType} from '../../types/media.type';
import {Howl} from 'howler';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit, OnDestroy {

  private player: Howl = null;
  public playing = false;
  public index = -1;
  public log: string[] = [];
  public userCount = 0;
  private logLimit = 30;
  public isAuthenticated = false;
  public initialized = false;
  public streamsCount = 0;
  private streamCountSubscription: Subscription = null;
  public status = 'Disconnected';
  public displayedColumns: string[] = ['name', 'source', 'actions'];
  public tableDataSource = new MatTableDataSource<MediaType>([]);
  public dataSource: MediaType[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private hubService: HubService,
              private manageStreamService: ManageStreamService,
              private cachedAuthenticationService: CachedAuthenticationService) {
  }


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
    this.tableDataSource.paginator = this.paginator;

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
            source: stream.name,
            filename: `${artist}-${title} (${stream.name}).mp3`,
            audio: `data:audio/mp3;base64,${base64}`
          };

          this.dataSource.push(item);
          this.tableDataSource = new MatTableDataSource<MediaType>(this.dataSource);

          if (this.index === -1) {
            this.index = 0;
          }

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

  downloadSongAtIndex(i: number) {
    download(this.dataSource[i].audio, this.dataSource[i].name);
  }

  loadPlayer() {
    this.unloadPlayer();

    this.player = new Howl({
      src: [this.dataSource[this.index].audio],
      onfade: () => {
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
    this.player.stop();
  }

  toggleTrack() {
    if (this.playing) {
      this.stopTrack();
    } else {
      this.playTrack();
    }
  }

  nextTrack() {
    if (this.index + 1 < this.dataSource.length) {
      this.index++;

      this.loadPlayer();
      this.playTrackIfWasPlaying();
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
    this.index = i;
    this.playTrack();
  }
}
