import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements AfterViewChecked {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngAfterViewChecked() {
    this.logOut();
  }

  async logOut() {
    const response = await this.authenticationService.logout();

    if (!!response) {
      this.router.navigate(['./home']).then();
    }
  }
}
