import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';
import {Router} from '@angular/router';
import {FtpSinkService} from '../../../services/ftp.sink.service';
import {FtpSink} from '../../../models/entities/FtpSink';

@Component({
  selector: 'app-add-ftp-sink',
  templateUrl: './add-ftp-sink.component.html',
  styleUrls: ['./add-ftp-sink.component.sass']
})
export class AddFtpSinkComponent implements OnInit {

  ftpSink: FtpSink = new FtpSink();
  form: FormGroup;
  errorTable: FormErrorTable = [];

  constructor(private router: Router, private ftpSinkService: FtpSinkService) {
    this.form = new FormGroup({
      name: new FormControl(this.ftpSink.name, Validators.required),
      host: new FormControl(this.ftpSink.host, Validators.required),
      username: new FormControl(this.ftpSink.user, Validators.required),
      password: new FormControl(this.ftpSink.password, Validators.required),
      path: new FormControl(this.ftpSink.path),
      port: new FormControl(this.ftpSink.port, [Validators.required, Validators.min(1)])
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

    const response = await this.ftpSinkService.save(this.form.value).toPromise();

    if (!!response) {
      await this.router.navigate(['./ftpSink']);
    }
  }
}
