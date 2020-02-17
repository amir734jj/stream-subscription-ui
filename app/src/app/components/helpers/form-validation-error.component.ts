import {Component, Input, OnInit} from '@angular/core';
import {FormErrorTable} from '../../utilities/form.utility';

@Component({
  selector: 'app-form-validation-error',
  templateUrl: './form-validation-error.component.html',
  styleUrls: ['./form-validation-error.component.sass']
})
export class FormValidationErrorComponent implements OnInit {

	@Input('error-table') errorTable: FormErrorTable = [];

	constructor() { }

  ngOnInit() {
  }

}
