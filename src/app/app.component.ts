import { Component } from '@angular/core';
import {AuthenticationUtility} from './utilities/authentication.utility';
import {setTheme} from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'dotnet-intermediate-workshop';
  public navBarCollapsed = true;

  constructor(private authenticationUtility: AuthenticationUtility) {
    setTheme('bs3');
  }

  isAuthenticated() {
    return !!this.authenticationUtility.getAccount();
  }
}
