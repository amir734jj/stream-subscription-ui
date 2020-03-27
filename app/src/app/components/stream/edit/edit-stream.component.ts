import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Stream} from '../../../models/entities/Stream';
import {StreamService} from '../../../services/stream.service';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.sass']
})
export class EditStreamComponent implements OnInit {

  public stream: Stream;

  form: FormGroup;
  errorTable: FormErrorTable = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private streamService: StreamService) {
    this.stream = new Stream();
    this.bind();
  }

  bind() {
    this.form = new FormGroup({
      name: new FormControl(this.stream.name, Validators.required),
      url: new FormControl(this.stream.url, Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.stream = await this.streamService.get(params.id).toPromise();
      this.bind();
    });
  }

  async handleEdit($event: Event) {
    $event.preventDefault();

    if (this.form.invalid) {
      this.errorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.errorTable = [] as FormErrorTable;
    }

    const response = await this.streamService.update(this.stream.id, _.assign({}, this.stream, this.form.value)).toPromise();

    if (!!response) {
      await this.router.navigate(['./stream']);
    }
  }

}
