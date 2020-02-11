import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Role} from './models/RoleEnum';
import {ProfileType, ProfileWithTokenType} from './types/common.type';
import {accessTokenDurationInMinutes, localStorageKey} from './models/constants/BrowserConstants';
import * as memoize from 'memoizee';
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'wizpiti';
  public navBarCollapsed = true;
  public authenticated: () => boolean;
  public profile: ProfileType;
  public roles = Role;
  private now = moment();

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = memoize(() => {
      const {token, role, timestamp} = (JSON.parse(localStorage.getItem(localStorageKey)) || {}) as ProfileWithTokenType;
      this.profile = {role};
      return !!token && moment.duration(this.now.diff(timestamp)).asMinutes() < accessTokenDurationInMinutes;
    }, { maxAge: 1000, preFetch: true});
  }

  ngOnInit() {
    // If session key exist then continue
    if (this.authenticated()) {
      this.authenticationService.isAuthenticated()
        .then(async response => {
          const [authenticated, profile] = response;
          this.profile = profile;
          if (!authenticated) {
            localStorage.removeItem(localStorageKey);
            await this.router.navigate(['./login']);
          }
        });
    }
  }
}
