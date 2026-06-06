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
  streamIds: string[] = [];
  serverError = '';
  bulkResult = '';
  isBulkSaving = false;

  constructor(private shoutcastService: ShoutcastService, private streamService: StreamService,
              private manageStreamService: ManageStreamService, private router: Router) {
  }

  async ngOnInit() {
    this.genres = ['all', ...(await this.shoutcastService.genres().toPromise()).sort()];
    this.genre = _.first(this.genres) || 'all';
    await this.refresh();
  }

  async refresh() {
    this.streams = await this.shoutcastService.collect({
      name: this.name.length >= 3 ? this.name : '',
      genre: this.genre !== 'all' ? this.genre : ''
    }).toPromise();

    this.streamsTable = _.groupBy(this.streams, x => x.genre);
    this.streamIds = [];
  }

  async addStream() {
    if (!this.streamIds.length || this.isBulkSaving) {
      return;
    }

    this.serverError = '';
    this.bulkResult = '';
    this.isBulkSaving = true;

    const selectedIds = this.streamIds.map(x => parseInt(x, 0));
    const selectedStreams = this.streams.filter(x => selectedIds.includes(x.ID));
    const {added, failed, skipped} = await this.addListedStreams(selectedStreams);

    this.isBulkSaving = false;
    this.bulkResult = `Add selected complete. Added ${added}, failed ${failed}, skipped ${skipped} duplicate(s).`;

    if (!added && failed) {
      this.serverError = 'Failed to add selected streams';
    }
  }

  async addAllStreams() {
    if (!this.streams.length || this.isBulkSaving) {
      return;
    }

    this.serverError = '';
    this.bulkResult = '';
    this.isBulkSaving = true;

    const firstTenStreams = this.streams.slice(0, 10);
    const {added, failed, skipped} = await this.addListedStreams(firstTenStreams);

    this.isBulkSaving = false;
    this.bulkResult = `Bulk include complete (first 10 listed). Added ${added}, failed ${failed}, skipped ${skipped} duplicate(s).`;

    if (!added && failed) {
      this.serverError = 'Failed to add listed streams';
    }
  }

  private async addListedStreams(listedStreams: ShoutcastStream[]) {
    let added = 0;
    let failed = 0;
    let skipped = 0;

    const existing = await this.streamService.getAll().toPromise();
    const existingUrls = new Set(existing.map(s => s.url?.toLowerCase().trim()).filter(Boolean));

    for (const shoutcastStream of listedStreams) {
      const stream = new Stream();
      stream.name = shoutcastStream.name;

      try {
        stream.url = await this.shoutcastService.url(shoutcastStream.ID).toPromise();

        if (existingUrls.has(stream.url?.toLowerCase().trim())) {
          skipped++;
          continue;
        }

        const {id} = await this.streamService.save(stream).toPromise();
        await this.manageStreamService.start(id);
        existingUrls.add(stream.url?.toLowerCase().trim());
        added++;
      } catch (err) {
        failed++;
      }
    }

    return {added, failed, skipped};
  }

  get isNameInValidForSearch() {
    return this.name.length > 0 && this.name.length < 3;
  }

}
