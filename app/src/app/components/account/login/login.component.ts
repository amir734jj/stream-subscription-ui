import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {Role} from '../../../models/RoleEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

  }

  async handleLogIn(event: Event) {
    event.preventDefault();

    const response = await this.authenticationService.login({
      username: this.username,
      password: this.password
    });

    if (!!response) {
      await this.router.navigate(['./welcome']);
    }
  }
}
