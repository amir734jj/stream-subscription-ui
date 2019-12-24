import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Contractor-Finder-UI';
  public navBarCollapsed = true;
  public authenticated: () => boolean;

  constructor(private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = (() => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const token = currentUser && currentUser.token;
      return !!token;
    });
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated()
      .then(authenticated => {
        if (!authenticated) {
          localStorage.removeItem('user');
        }
        this.authenticated();
      });
  }
}
