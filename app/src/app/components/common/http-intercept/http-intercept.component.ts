import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestInterceptor } from '../../../utilities/injectables/custom.error.handler.utility';
import * as _ from 'lodash';

@Component({
  selector: 'app-http-intercept',
  templateUrl: './http-intercept.component.html',
  styleUrls: ['./http-intercept.component.sass']
})
export class HttpInterceptComponent implements OnInit {

  exceptionMessage = '';
  errorMessage = '';
  private isOpen = false;

  @ViewChild('templateRef') public templateRef: BsModalRef;
  private modalRef: BsModalRef;
  private readonly isJSON: (str) => boolean;

  constructor(private modalService: BsModalService, private requestInterceptor: RequestInterceptor) {
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

    if (this.isJSON(errorResponse.error)) {
      errorResponse = { ...errorResponse, error: JSON.parse(errorResponse.error) };
    }

    // If error has a message
    if (_.get(errorResponse.error, ['errors'])) {
      errorMessage = _.get(errorResponse.error, ['errors']).join('\n');
    } else if (errorResponse.error instanceof Event) {
      errorMessage = `Event type: ${(typeof errorResponse.error).toString()}`;
    } else {
      errorMessage = _.toString(errorResponse.error);
    }

    this.errorMessage = errorMessage;

    if (!this.isOpen) {
      this.showModal();
    }
  }

  showModal() {
    this.modalRef = this.modalService.show(this.templateRef, {
      class: 'modal-lg'
    });

    this.modalService.onHide.subscribe(() => {
      this.isOpen = false;
    });

    this.isOpen = true;
  }

  hideModal() {
    this.modalService.hide(1);

    this.isOpen = false;
  }
}
