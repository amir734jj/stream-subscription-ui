import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {Role, roles} from '../../../models/RoleEnum';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  roleRef: Role;
  roles: { name: string; value: string | number }[];
  private form: FormGroup;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.roles = roles;
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ])
    });
  }

  ngOnInit() {
  }

  async handleRegister(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      return;
    }

    const response = await this.authenticationService.register(this.roleRef, this.form.value);

    if (!!response) {
      await this.router.navigate(['./login']);
    }
  }
}
