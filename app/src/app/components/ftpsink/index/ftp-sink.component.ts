import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {statusToString as StatusToString, StreamStatus} from '../../../models/enums/Status';
import {resolveBootstrapClass as ResolveBootstrapClass} from '../../../utilities/bootstrap.class.utility';
import {Stream} from '../../../models/entities/Stream';
import {StreamService} from '../../../services/stream.service';
import {Router} from '@angular/router';
import {FtpSink} from '../../../models/entities/FtpSink';
import {FtpSinkService} from '../../../services/ftp.sink.service';

@Component({
  selector: 'app-ftp-sink',
  templateUrl: './ftp-sink.component.html',
  styleUrls: ['./ftp-sink.component.sass']
})
export class FtpSinkComponent implements OnInit {


  public ftpSinks: FtpSink[] = [];
  public statusTable: {[index: string]: StreamStatus} = {};
  public statusToString = StatusToString;
  public resolveBootstrapClass = ResolveBootstrapClass;
  public StreamStatus = StreamStatus;

  constructor(private streamService: StreamService, private router: Router,
              private ftpSinkService: FtpSinkService) {
  }

  async ngOnInit() {
    await this.fetchFtpSinks();
  }

  async addFtpSink() {
    await this.router.navigate(['/ftpSink', 'add']);
  }

  async fetchFtpSinks() {
    this.ftpSinks = await this.ftpSinkService.getAll().toPromise();
  }

  async deleteFtpSink($event: MouseEvent, id: string) {
    $event.preventDefault();
    await this.ftpSinkService.delete(id).toPromise();
    await this.fetchFtpSinks();
  }
}
