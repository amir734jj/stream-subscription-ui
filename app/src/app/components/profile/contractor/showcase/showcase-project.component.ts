import {Component, Input, OnInit} from '@angular/core';
import Contractor from '../../../../models/entities/Contractor';
import {FormGroup} from '@angular/forms';
import {FormErrorTable} from '../../../../utilities/form.utility';

@Component({
  selector: 'app-showcase-project',
  templateUrl: './showcase-project.component.html',
  styleUrls: ['./showcase-project.component.sass']
})
export class ShowcaseProjectComponent implements OnInit {

  errorTable: FormErrorTable = [];
  form: FormGroup;
  @Input() contractor: Contractor;
  constructor() { }

  ngOnInit(): void {

  }

  addShowcaseProject(event: Event) {

  }
}
