import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private identityService: AccountService) { }

  ngOnInit() {

  }

  handleLogIn(event) {
    event.stopPropagation();

    this.identityService.logIn(this.username, this.password)
      .subscribe(x => {
        this.router.navigate(['./']).then(() => { });
      });
  }
}
