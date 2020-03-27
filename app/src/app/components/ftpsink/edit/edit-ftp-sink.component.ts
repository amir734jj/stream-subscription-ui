import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {FtpSinkService} from '../../../services/ftp.sink.service';
import {FtpSink} from '../../../models/entities/FtpSink';

@Component({
  selector: 'app-edit-ftp-sink',
  templateUrl: './edit-ftp-sink.component.html',
  styleUrls: ['./edit-ftp-sink.component.sass']
})
export class EditFtpSinkComponent implements OnInit {

  public ftpSink: FtpSink;

  form: FormGroup;
  errorTable: FormErrorTable = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private ftpSinkService: FtpSinkService) {
    this.ftpSink = new FtpSink();
    this.bind();
  }

  bind() {
    this.form = new FormGroup({
      name: new FormControl(this.ftpSink.name, Validators.required),
      host: new FormControl(this.ftpSink.host, Validators.required),
      username: new FormControl(this.ftpSink.username, Validators.required),
      password: new FormControl(this.ftpSink.password, Validators.required),
      path: new FormControl(this.ftpSink.path),
      port: new FormControl(this.ftpSink.port, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.ftpSink = await this.ftpSinkService.get(params.id).toPromise();
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

    const response = await this.ftpSinkService.update(this.ftpSink.id, _.assign({}, this.ftpSink, this.form.value)).toPromise();

    if (!!response) {
      await this.router.navigate(['./ftpSink']);
    }
  }

}
