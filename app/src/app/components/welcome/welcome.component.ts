import {Component, OnInit} from '@angular/core';
import User from "../../models/entities/User";
import * as _ from "lodash";
import {RoleToString} from "../../models/RoleEnum";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

	public roleToString = RoleToString;
	userInfo: User = _.merge(new User(), JSON.parse(localStorage.getItem('user')));

  constructor() {
  }

  ngOnInit() {
  }

}
