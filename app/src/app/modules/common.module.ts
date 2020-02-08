import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AlertModule, BsModalService, ModalModule} from 'ngx-bootstrap';
import {RequestInterceptor} from '../utilities/custom.error.handler.utility';
import {HttpInterceptComponent} from '../components/common/http-intercept/http-intercept.component';
import {CommonComponent} from '../components/common/wrapper/common.component';
import {CommonModule} from '@angular/common';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
  ],
  providers: [BsModalService, RequestInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  }],
  exports: [CommonComponent],
  declarations: [
    CommonComponent, HttpInterceptComponent,
  ]
})
export class CommonComponentModule {
}
