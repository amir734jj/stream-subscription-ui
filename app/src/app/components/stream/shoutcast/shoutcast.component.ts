import { Component, OnInit } from '@angular/core';
import {ShoutcastService} from '../../../services/shoutcast.service';
import {ShoutcastStream} from '../../../models/entities/ShoutcastStream';
import * as _ from 'lodash';
import {StreamService} from '../../../services/stream.service';
import {Stream} from '../../../models/entities/Stream';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shoutcast',
  templateUrl: './shoutcast.component.html',
  styleUrls: ['./shoutcast.component.sass']
})
export class ShoutcastComponent implements OnInit {

  name = '';
  genre = '';
  streams: { [group: string]: ShoutcastStream[] } = {};
  allStreams: ShoutcastStream[] = [];
  allGenres: string[] = [];
  streamId = '';

  constructor(private shoutcastService: ShoutcastService, private streamService: StreamService, private router: Router) { }

  async ngOnInit() {
    await this.collect();
  }

  async collect() {
    this.allStreams = await this.shoutcastService.collect({ name: this.name, genre: this.genre }).toPromise();
    this.streams = _.groupBy(this.allStreams, x => x.genre);
    this.allGenres = _.map(this.allStreams, x => x.genre);
  }

  async addStream() {
    if (this.streamId) {

      const stream = this.allStreams.find(x => x.ID === this.streamId);
      await this.streamService.save({name: stream.name, url: stream.url} as Stream);

      await this.router.navigate(['./stream']);
    }
  }

}
