import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ])
    });
  }

  ngOnInit() {

  }

  async handleLogIn(event: Event) {
    event.preventDefault();

    if (this.form.invalid) {
      return;
    }

    const response = await this.authenticationService.login(this.form.value);

    if (!!response) {
      await this.router.navigate(['./welcome']);
    }
  }
}
