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

  constructor(private router: Router, private streamService: StreamService) {
    this.form = new FormGroup({
      name: new FormControl(this.stream.name, Validators.required),
      url: new FormControl(this.stream.url, Validators.required),
      filter: new FormControl(this.stream.filter)
    });
  }

  ngOnInit(): void {
  }

  async handleAdd($event: Event) {
    $event.preventDefault();

    if (this.form.invalid) {
      this.errorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.errorTable = [] as FormErrorTable;
    }

    const response = await this.streamService.save(this.form.value).toPromise();

    if (!!response) {
      await this.router.navigate(['./stream']);
    }
  }
}
