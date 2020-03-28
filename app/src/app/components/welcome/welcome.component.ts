import {Component, OnInit} from '@angular/core';
import User from '../../models/entities/User';
import * as _ from 'lodash';
import {CachedAuthenticationService} from '../../services/cached.authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  userInfo: User;

  constructor(private cachedAuthenticationService: CachedAuthenticationService) {
    this.userInfo = _.merge(new User(), cachedAuthenticationService.resolveAuthInfo().profile);
  }

  ngOnInit() {
  }

}
