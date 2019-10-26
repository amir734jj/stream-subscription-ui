import { Component } from '@angular/core';
import {setTheme} from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Contractor-Finder-UI';
  public navBarCollapsed = true;

  constructor() {
    setTheme('bs3');
  }

  isAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = currentUser && currentUser.token;
    return !!token;
  }
}
