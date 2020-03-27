import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxFileDropEntry} from 'ngx-file-drop';
import {Profile} from '../../../models/entities/Profile';
import {ProfileService} from '../../../services/profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable} from '../../../utilities/form.utility';
import {NGXLogger} from 'ngx-logger';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  errorTable: FormErrorTable = [];

  public profile: Profile;
  public file: NgxFileDropEntry = null;

  constructor(private router: Router, private profileService: ProfileService,
              private logger: NGXLogger) {
    this.profile = new Profile();
    this.bind();
  }

  ngOnInit() {
    this.handleGetProfile();
  }

  bind() {
    this.form = new FormGroup({
      name: new FormControl(this.profile.name, Validators.required),
      email: new FormControl(this.profile.email, [
        Validators.required,
        Validators.email
      ])
    });
  }

  handleGetProfile() {
    this.profileService.get().subscribe(profile => {
      this.profile = profile;
      this.bind();
    });
  }

  handleSaveProfile(event: Event) {
    event.preventDefault();

    this.profileService.save(_.assign({}, this.profile, this.form.value))
      .subscribe(_ => {
        this.handleGetProfile();
      });
  }
}
