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
  protocols = ['ftp', 'sftp'];
  form: FormGroup;
  errorTable: FormErrorTable = [];

  constructor(private router: Router, private ftpSinkService: FtpSinkService) {
    this.form = new FormGroup({
      name: new FormControl(this.ftpSink.name, Validators.required),
      protocol: new FormControl(this.ftpSink.protocol, Validators.required),
      host: new FormControl(this.ftpSink.host, [
        Validators.required
      ]),
      username: new FormControl(this.ftpSink.user, Validators.required),
      password: new FormControl(this.ftpSink.password),
      path: new FormControl(this.ftpSink.path),
      favorite: new FormControl(this.ftpSink.favorite),
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

    const payload = this.form.value;
    payload.host = this.normalizeSinkHost(payload.protocol, payload.host);
    payload.port = payload.port || (payload.protocol === 'sftp' ? 22 : 21);

    const response = await this.ftpSinkService.save(payload).toPromise();

    if (!!response) {
      await this.router.navigate(['./ftpSink']);
    }
  }

  private normalizeSinkHost(protocol: string, host: string) {
    const cleanHost = (host || '').replace(/^\s+|\s+$/g, '').replace(/^\w+:\/\//, '');
    return `${protocol}://${cleanHost}`;
  }
}
