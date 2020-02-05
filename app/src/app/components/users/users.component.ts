import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import User from '../../models/entities/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(response => {
      this.users = response;
    });
  }

}
