import { Component, OnInit } from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
export class ProgressBarComponent implements OnInit {

  constructor(public loader: LoadingBarService) { }

  ngOnInit(): void {
  }

}
