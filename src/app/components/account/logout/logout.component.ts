import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements AfterViewChecked {

  constructor(private identityService: AccountService, private router: Router) { }

  ngAfterViewChecked() {
    this.logOut();
  }

  logOut() {
    this.identityService.logOut()
      .subscribe(x => {
        this.router.navigate(['./home']);
      });
  }
}
