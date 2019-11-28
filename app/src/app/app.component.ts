import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Contractor-Finder-UI';
  public navBarCollapsed = true;

  constructor(private authenticationService: AuthenticationService) {
    setTheme('bs3');
  }

  isAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = currentUser && currentUser.token;
    return !!token;
  }

  async ngOnInit()  {
    if (!await this.authenticationService.isAuthenticated()) {
      localStorage.removeItem('user');
    }
  }
}
