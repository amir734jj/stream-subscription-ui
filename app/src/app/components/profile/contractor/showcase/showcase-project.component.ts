import { Component, OnInit } from '@angular/core';
import Contractor from '../../../../models/entities/Contractor';

@Component({
  selector: 'app-showcase-project',
  templateUrl: './showcase-project.component.html',
  styleUrls: ['./showcase-project.component.sass']
})
export class ShowcaseProjectComponent implements OnInit {

  contractor: Contractor;
  constructor() { }

  ngOnInit(): void {
  }

}
