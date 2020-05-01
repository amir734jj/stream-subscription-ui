import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FtpSinkService} from '../../../services/ftp.sink.service';
import {FtpSink} from '../../../models/entities/FtpSink';
import {FormControl} from '@angular/forms';
import {Stream} from '../../../models/entities/Stream';
import {StreamService} from '../../../services/stream.service';
import {StreamFtpSinkRelationship} from '../../../models/entities/StreamFtpSinkRelationship';
import * as _ from 'lodash';

@Component({
  selector: 'app-manage-ftp-sink',
  templateUrl: './manage-ftp-sink.component.html',
  styleUrls: ['./manage-ftp-sink.component.sass']
})
export class ManageFtpSinkComponent implements OnInit {

  public ftpSink: FtpSink;
  public streams: Stream[] = [];
  streamsFormControl = new FormControl();

  constructor(private route: ActivatedRoute, private router: Router,
              private streamService: StreamService,
              private ftpSinkService: FtpSinkService) {
    this.ftpSink = new FtpSink();
  }

  ngOnInit() {
    this.fetchFtpSink();
  }

  fetchFtpSink() {
    this.route.params.subscribe(async params => {
      this.ftpSink = await this.ftpSinkService.get(params.id).toPromise();
      this.streams = await this.streamService.getAll().toPromise();
      this.streamsFormControl = new FormControl(this.ftpSink.streamFtpSinkRelationships.map(x => x.streamId));
    });
  }

  async update() {
    this.ftpSink.streamFtpSinkRelationships = _.chain(this.streamsFormControl.value)
      .map(x => x as string)
      .map(id => this.streams.find(stream => stream.id === id))
      .map(stream => {
        const streamFtpSinkRelationship = new StreamFtpSinkRelationship();
        streamFtpSinkRelationship.streamId = stream.id;
        streamFtpSinkRelationship.ftpSinkId = this.ftpSink.id;
        return streamFtpSinkRelationship;
      })
      .value();

    await this.ftpSinkService.update(this.ftpSink.id, this.ftpSink).toPromise();

    this.fetchFtpSink();
  }

}
