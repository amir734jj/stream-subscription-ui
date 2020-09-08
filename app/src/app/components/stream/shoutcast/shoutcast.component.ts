import {Component, OnInit} from '@angular/core';
import {ShoutcastService} from '../../../services/shoutcast.service';
import {ShoutcastStream} from '../../../models/entities/ShoutcastStream';
import * as _ from 'lodash';
import {StreamService} from '../../../services/stream.service';
import {Stream} from '../../../models/entities/Stream';
import {Router} from '@angular/router';
import {ManageStreamService} from '../../../services/manage.stream.service';

@Component({
  selector: 'app-shoutcast',
  templateUrl: './shoutcast.component.html',
  styleUrls: ['./shoutcast.component.sass']
})
export class ShoutcastComponent implements OnInit {

  name = '';
  genre = '';
  streams: ShoutcastStream[] = [];
  streamsTable: { [group: string]: ShoutcastStream[] } = {};
  genres: string[] = [];
  streamId = '';

  constructor(private shoutcastService: ShoutcastService, private streamService: StreamService,
              private manageStreamService: ManageStreamService, private router: Router) {
  }

  async ngOnInit() {
    this.genres = ['all', ...(await this.shoutcastService.genres().toPromise()).sort()];
    this.genre = _.first(this.genres);
    await this.refresh();
  }

  async refresh() {
    this.streams = await this.shoutcastService.collect({
      name: this.name.length >= 3 ? this.name : '',
      genre: this.genre !== 'all' ? this.genre : ''
    }).toPromise();

    this.streamsTable = _.groupBy(this.streams, x => x.genre);
  }

  async addStream() {
    if (this.streamId) {
      const shoutcastStream = this.streams.find(x => x.ID === parseInt(this.streamId, 0));

      const stream = new Stream();
      stream.url = await this.shoutcastService.url(shoutcastStream.ID).toPromise();
      stream.name = shoutcastStream.name;

      const {id} = await this.streamService.save(stream).toPromise();
      await this.manageStreamService.start(id);

      await this.router.navigate(['./stream']);
    }
  }

  get isNameInValidForSearch() {
    return this.name.length > 0 && this.name.length < 3;
  }

}
