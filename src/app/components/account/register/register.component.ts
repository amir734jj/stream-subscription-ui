import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  fullname: string;
  email: string;
  username: string;
  password: string;

  constructor(private identityService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  handleRegister(event) {
    event.stopPropagation();

    this.identityService.register(this.fullname, this.email, this.username, this.password)
      .subscribe(x => {
        this.router.navigate(['./login']);
      });
  }
}
