import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {ProfileType} from './types/profile.type';
import {clearAuthInfo, resolveAuthInfo} from './utilities/auth.utility';
import {Profile} from './models/entities/Profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Stream-Subscription-UI';
  public navBarCollapsed = true;
  public authenticated: () => boolean;
  public profile: ProfileType;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = () => {
      const {item1 = false, item2 = new Profile() as ProfileType} = resolveAuthInfo();
      this.profile = item2;
      return item1;
    };
  }

  ngOnInit() {
    // If session key exist then continue
    if (this.authenticated()) {
      this.authenticationService.isAuthenticated()
        .then(async response => {
          if (!response) {
            clearAuthInfo();
            await this.router.navigate(['./login']);
          }
        });
    }
  }
}
