import {Component, OnInit} from '@angular/core';
import User from '../../models/entities/User';
import * as _ from 'lodash';
import {resolveAuthInfo} from '../../utilities/auth.utility';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  userInfo: User = _.merge(new User(), resolveAuthInfo().item2);

  constructor() {
  }

  ngOnInit() {
  }

}
