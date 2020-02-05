import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Role} from './models/RoleEnum';
import {ProfileType, ProfileWithTokenType} from './types/common.type';
import {localStorageKey} from './models/constants/BrowserConstants';

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

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = (() => {
      const {token, role} = (JSON.parse(localStorage.getItem(localStorageKey)) || {}) as ProfileWithTokenType;
      this.profile = {role};
      return !!token;
    });
  }

  ngOnInit() {
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
