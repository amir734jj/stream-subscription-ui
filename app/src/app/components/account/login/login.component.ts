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
  role: Role;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

  }

  handleLogIn(event: Event) {
    event.preventDefault();

    this.authenticationService.login(this.role, {
      username: this.username,
      password: this.password
    }).subscribe(x => {
      this.router.navigate(['./']).then(() => {
      });
    });
  }
}
