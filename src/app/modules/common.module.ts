import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AlertModule, BsModalService, ModalModule} from 'ngx-bootstrap';
import {RequestInterceptor} from '../utilities/custom.error.handler.utility';
import {HttpInterceptComponent} from '../components/common/http-intercept/http-intercept.component';
import {CommonComponent} from '../components/common/wrapper/common.component';
import {InfoComponent} from '../components/common/info/info.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [BsModalService, RequestInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  exports: [CommonComponent],
  declarations: [
    CommonComponent, HttpInterceptComponent, InfoComponent,
  ]
})
export class CommonComponentModule {
}
