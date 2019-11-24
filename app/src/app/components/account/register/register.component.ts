import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {Role, roles} from '../../../models/RoleEnum';
import {EnumValueType} from 'enum-values/src/enumValues';

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
  roles: { name: string; value: EnumValueType }[];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.roles = roles;
  }

  ngOnInit() {
  }

  handleRegister(event: Event) {
    event.preventDefault();

    this.authenticationService.register(this.roleRef, {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    }).subscribe(x => {
      this.router.navigate(['./login']);
    });
  }
}
