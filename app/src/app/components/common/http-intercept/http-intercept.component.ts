import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertConfig, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {RequestInterceptor} from '../../../utilities/injectables/custom.error.handler.utility';
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

  @ViewChild('templateRef', {static: true, read: false}) public templateRef: BsModalRef;
  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private requestInterceptor: RequestInterceptor,
              private alertConfig: AlertConfig) {
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
    this.onErrorHandler = _.throttle(this.onErrorHandler);
    requestInterceptor.addOnErrorHandler(error => this.onErrorHandler(error));
  }

  ngOnInit() {
  }

  onErrorHandler(errorResponse: HttpErrorResponse) {
    this.exceptionMessage = errorResponse.message;
    let errorMessage: string = this.exceptionMessage || _.get(errorResponse, ['error', 'error_description']);

    // If error has a message
    if (errorMessage) {
      errorMessage = _.head(((errorMessage.toString()) || '\n').split('\n', 1));
    } else if (errorResponse.error instanceof Event) {
      errorMessage = `Event type: ${_.get(errorResponse, ['error', 'constructor', 'name']) || (typeof errorResponse.error).toString()}`;
    } else if (_.get(errorResponse, ['errors']) && _.isArray(_.get(errorResponse, ['errors']))) {
      errorMessage = _.get(errorResponse, ['errors']).join('\n');
    } else {
      errorMessage = _.toString(errorResponse.error);
    }

    this.errorMessage = errorMessage;
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
