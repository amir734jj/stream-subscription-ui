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
  private readonly isJSON: (str) => boolean;

  constructor(private modalService: BsModalService, private requestInterceptor: RequestInterceptor,
              private alertConfig: AlertConfig) {
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
    this.onErrorHandler = _.throttle(this.onErrorHandler);
    requestInterceptor.addOnErrorHandler(error => this.onErrorHandler(error));

    this.isJSON = str => {
      if (!str) {
        return false;
      }
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };
  }

  ngOnInit() {
  }

  onErrorHandler(errorResponse: HttpErrorResponse) {
    this.exceptionMessage = errorResponse.message;
    let errorMessage: string;

    // If error has a message
    if (this.isJSON(errorResponse.error)) {
      errorMessage = _.get(JSON.parse(errorResponse.error), ['errors']).join('\n');
    } else if (errorResponse.error instanceof Event) {
      errorMessage = `Event type: ${(typeof errorResponse.error).toString()}`;
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
