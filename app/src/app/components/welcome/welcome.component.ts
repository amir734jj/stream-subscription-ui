import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  userInfo: {
    firstname: string
  } = JSON.parse(localStorage.getItem('user'));

  constructor() {
  }

  ngOnInit() {
  }

}
