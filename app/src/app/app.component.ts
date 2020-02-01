import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'wizpiti';
  public navBarCollapsed = true;
  public authenticated: () => boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    setTheme('bs3');

    this.authenticated = (() => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const token = currentUser && currentUser.token;
      return !!token;
    });
  }

  ngOnInit() {
    this.authenticationService.isAuthenticated()
      .then(async authenticated => {
        if (!authenticated) {
          localStorage.removeItem('user');
	        await this.router.navigate(['./login']);
        }
      });
  }
}
