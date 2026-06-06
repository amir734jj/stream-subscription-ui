import {Component, Input, OnInit} from '@angular/core';
import {FormErrorTable} from '../../utilities/form.utility';

@Component({
  selector: 'app-form-validation-error',
  templateUrl: './form-validation-error.component.html',
  styleUrls: ['./form-validation-error.component.sass']
})
export class FormValidationErrorComponent implements OnInit {

  @Input('error-table')
  errorTable: FormErrorTable = [];

  constructor() {
  }

  ngOnInit() {
  }

  getErrorMessage(error: { key: string, keyError: string }): string {
    const fieldName = this.formatFieldName(error.key);

    switch (error.keyError) {
      case 'required':
        return `${fieldName} is required.`;
      case 'pattern':
        if (error.key === 'password' || error.key === 'confirmPassword') {
          return `${fieldName} must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-).`;
        }
        return `${fieldName} format is invalid.`;
      case 'minlength':
        return `${fieldName} is too short.`;
      case 'maxlength':
        return `${fieldName} is too long.`;
      case 'email':
        return `Please enter a valid email address.`;
      default:
        return `${fieldName} is invalid.`;
    }
  }

  private formatFieldName(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  }

}
