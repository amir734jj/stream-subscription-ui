import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {ProfileType} from './types/profile.type';
import {CachedAuthenticationService} from './services/cached.authentication.service';

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

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private cachedAuthenticationService: CachedAuthenticationService) {
    setTheme('bs3');

    this.authenticated = () => this.cachedAuthenticationService.resolveAuthInfo().authenticated;
  }

  ngOnInit() {
    // If session key exist then continue
    if (this.authenticated()) {
      this.authenticationService.isAuthenticated()
        .then(async response => {
          if (!response) {
            this.cachedAuthenticationService.clearAuthInfo();
            await this.router.navigate(['./login']);
          }
        });
    }
  }
}
