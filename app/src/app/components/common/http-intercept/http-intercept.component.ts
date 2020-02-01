import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AlertConfig, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {RequestInterceptor} from '../../../utilities/custom.error.handler.utility';
import * as _ from 'lodash';

@Component({
  selector: 'app-http-intercept',
  templateUrl: './http-intercept.component.html',
  styleUrls: ['./http-intercept.component.sass'],
  providers: [AlertConfig]
})
export class HttpInterceptComponent implements OnInit {

  exceptionMessage = '';
  errorMessage = '';

  @ViewChild('templateRef', { static: true, read: false }) public templateRef: BsModalRef;
  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private requestInterceptor: RequestInterceptor,
              private alertConfig: AlertConfig) {
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
    requestInterceptor.addOnErrorHandler(error => this.onErrorHandler(error));
  }

  ngOnInit() {
  }

  onErrorHandler(errorResponse: HttpErrorResponse) {
    this.exceptionMessage = errorResponse.message;
    this.errorMessage = _.get(errorResponse, ['error', 'error_description'], ((errorResponse.error && errorResponse.error.toString()) || '\n').split('\n', 1)[0]);
    this.showModal();
  }

  showModal() {
    this.modalRef = this.modalService.show(this.templateRef, {
      class: 'modal-lg'
    });
  }

  hideModal() {
    this.modalService.hide(1);
  }
}
