import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.sass']
})
export class DemoComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async ngOnInit() {
    const response = await this.authenticationService.login({
      username: 'demo',
      password: 'Demo123@'
    });

    if (!!response) {
      await this.router.navigate(['./board']);
    }
  }

}
