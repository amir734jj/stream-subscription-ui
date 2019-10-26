import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

  handleLogIn(event) {
    event.stopPropagation();

    this.authenticationService.login({
      username: this.username,
      password: this.password
    })
      .subscribe(x => {
        this.router.navigate(['./']).then(() => { });
      });
  }
}
