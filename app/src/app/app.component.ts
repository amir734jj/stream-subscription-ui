import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Role} from './models/RoleEnum';
import {ProfileType} from './types/profile.type';
import {clearAuthInfo, anyAuthInfo} from './utilities/auth.utility';
import {Profile} from './models/entities/Profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Wizpiti';
  public navBarCollapsed = true;
  public authenticated: () => boolean;
  public profile: ProfileType;
  public roles = Role;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = () => {
      const {item1 = false, item2 = new Profile()} = anyAuthInfo();
      this.profile = item2;
      return item1;
    };
  }

  ngOnInit() {
    // If session key exist then continue
    if (this.authenticated()) {
      this.authenticationService.isAuthenticated()
        .then(async response => {
          const [authenticated, profile] = response;
          this.profile = profile;
          if (!authenticated) {
            clearAuthInfo();
            await this.router.navigate(['./login']);
          }
        });
    }
  }
}
