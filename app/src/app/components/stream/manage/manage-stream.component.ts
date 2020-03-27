import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageStreamService} from '../../../services/manage.stream.service';
import {Stream} from '../../../models/entities/Stream';
import {StreamService} from '../../../services/stream.service';
import * as _ from 'lodash';
import {statusToString as StatusToString, StreamStatus} from '../../../models/enums/Status';
import {resolveBootstrapClass as ResolveBootstrapClass} from '../../../utilities/bootstrap.class.utility';

@Component({
  selector: 'app-manage-stream',
  templateUrl: './manage-stream.component.html',
  styleUrls: ['./manage-stream.component.sass']
})
export class ManageStreamComponent implements OnInit {
  public stream: Stream;
  public status: StreamStatus = StreamStatus.Fail;
  public StreamStatus = StreamStatus;
  public statusToString = StatusToString;
  public resolveBootstrapClass = ResolveBootstrapClass;

  constructor(private route: ActivatedRoute, private router: Router,
              private streamService: StreamService,
              private manageStreamService: ManageStreamService) {
    this.stream = new Stream();
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.stream = await this.streamService.get(params.id).toPromise();
      this.status = _.get(await this.manageStreamService.status(), this.stream.id, StreamStatus.Stopped);
    });
  }

  async toggle() {
    if (this.status !== StreamStatus.Started) {
      this.status = _.get(await this.manageStreamService.start(this.stream.id), this.stream.id, StreamStatus.Stopped);
    } else {
      this.status = _.get(await this.manageStreamService.stop(this.stream.id), this.stream.id, StreamStatus.Stopped);
    }
  }
}
