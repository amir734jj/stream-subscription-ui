import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

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

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  handleRegister(event: Event) {
    event.preventDefault();

    this.authenticationService.register({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    })
      .subscribe(x => {
        this.router.navigate(['./login']);
      });
  }
}
