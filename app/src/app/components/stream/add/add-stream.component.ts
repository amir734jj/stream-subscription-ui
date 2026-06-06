import {Component, OnInit} from '@angular/core';
import {Stream} from '../../../models/entities/Stream';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {Router} from '@angular/router';
import {StreamService} from '../../../services/stream.service';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.sass']
})
export class AddStreamComponent implements OnInit {

  public stream: Stream = new Stream();

  form: FormGroup;
  errorTable: FormErrorTable = [];
  serverError = '';
  private existingUrls: string[] = [];

  constructor(private router: Router, private streamService: StreamService) {
    this.form = new FormGroup({
      name: new FormControl(this.stream.name, Validators.required),
      url: new FormControl(this.stream.url, Validators.required),
      filter: new FormControl(this.stream.filter)
    });
  }

  async ngOnInit() {
    const streams = await this.streamService.getAll().toPromise();
    this.existingUrls = streams.map(s => s.url?.toLowerCase().trim()).filter(Boolean);
  }

  async gotoShoutCastDirectory() {
    await this.router.navigate(['/stream', 'add', 'shoutcast']);
  }

  async handleAdd($event: Event) {
    $event.preventDefault();

    if (this.form.invalid) {
      this.errorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.errorTable = [] as FormErrorTable;
    }

    this.serverError = '';

    const newUrl = this.form.value.url?.toLowerCase().trim();
    if (this.existingUrls.includes(newUrl)) {
      this.serverError = 'A stream with this URL already exists';
      return;
    }

    try {
      const response = await this.streamService.save(this.form.value).toPromise();

      if (!!response) {
        await this.router.navigate(['./stream']);
      }
    } catch (err) {
      this.serverError = err?.error?.errors?.[0] || 'Failed to save stream';
    }
  }
}
