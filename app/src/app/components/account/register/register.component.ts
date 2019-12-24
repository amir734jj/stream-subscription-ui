import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {Role, roles} from '../../../models/RoleEnum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  roleRef: Role;
  roles: { name: string; value: string | number }[];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.roles = roles;
  }

  ngOnInit() {
  }

  async handleRegister(event: Event) {
    event.preventDefault();

    const response = await this.authenticationService.register(this.roleRef, {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    });

    if (!!response) {
      await this.router.navigate(['./login']);
    }
  }
}
