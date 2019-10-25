import { Component} from '@angular/core';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass']
})
export class InfoComponent {

  constructor(private accountService: AccountService) {
    accountService.refreshAccountInfo();
  }
}
