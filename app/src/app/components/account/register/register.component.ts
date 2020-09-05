import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormErrorTable, resolveFormGroupErrors} from '../../../utilities/form.utility';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorTable: FormErrorTable = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    const passwordValidationPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationPattern)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordValidationPattern)
      ])
    });
  }

  ngOnInit() {
  }

  async handleRegister(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      this.errorTable = resolveFormGroupErrors(this.form);
      return;
    } else {
      this.errorTable = [] as FormErrorTable;
    }

    const response = await this.authenticationService.register(this.form.value);

    if (!!response) {
      await this.router.navigate(['./login']);
    }
  }
}
