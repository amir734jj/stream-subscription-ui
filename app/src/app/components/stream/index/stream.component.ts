import {Component, OnInit} from '@angular/core';
import {Stream} from '../../../models/entities/Stream';
import {StreamService} from '../../../services/stream.service';
import {Router} from '@angular/router';
import {ManageStreamService} from '../../../services/manage.stream.service';
import * as _ from 'lodash';
import {statusToString as StatusToString, StreamStatus} from '../../../models/enums/Status';
import {resolveBootstrapClass as ResolveBootstrapClass} from '../../../utilities/bootstrap.class.utility';
import {urlHost} from '../../../utilities/url.utility';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.sass']
})
export class StreamComponent implements OnInit {

  public urlHost = urlHost;
  public streams: Stream[] = [];
  public statusTable: {[index: string]: StreamStatus} = {};
  public statusToString = StatusToString;
  public resolveBootstrapClass = ResolveBootstrapClass;
  public StreamStatus = StreamStatus;
  public showFilterUpTo = 10;

  constructor(private streamService: StreamService, private router: Router,
              private manageStreamService: ManageStreamService) {
  }

  async ngOnInit() {
    await this.fetchStreams();
  }

  async addStream() {
    await this.router.navigate(['/stream', 'add']);
  }

  async fetchStreams() {
    this.streams = await this.streamService.getAll().toPromise();
    const status = await this.manageStreamService.status();
    this.statusTable = _.fromPairs(this.streams.map(x => [x.id, _.get(status, x.id, StreamStatus.Stopped)]));
  }

  async deleteStream(id: string) {
    await this.streamService.delete(id).toPromise();
    await this.fetchStreams();
  }

  async startAll() {
    await Promise.all(_.chain(this.statusTable)
      .map((status, id) => ({id, status}))
      .filter(({status}) => status !== StreamStatus.Started)
      .map(({id}) => this.manageStreamService.start(id))
      .value());

    await this.fetchStreams();
  }

  async stopAll() {
    await Promise.all(_.chain(this.statusTable)
      .map((status, id) => ({id, status}))
      .filter(({status}) => status === StreamStatus.Started)
      .map(({id}) => this.manageStreamService.stop(id))
      .value());

    await this.fetchStreams();
  }

  all(...status: StreamStatus[]) {
    return _.chain(this.statusTable)
      .values()
      .map(x => _.some(status, y => x === y))
      .every()
      .value();
  }
}
