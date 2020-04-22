import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RequestInterceptor } from '../utilities/injectables/custom.error.handler.utility';
import { HttpInterceptComponent } from '../components/common/http-intercept/http-intercept.component';
import { ProgressBarComponent } from '../components/common/progress-bar/progress-bar.component';
import { CommonComponent } from '../components/common/wrapper/common.component';
import { CommonModule } from '@angular/common';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core use:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormValidationErrorComponent } from '../components/helpers/form-validation-error.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
	imports: [
		CommonModule,
		ModalModule.forRoot(),
		AlertModule.forRoot(),
		// for HttpClient use:
		LoadingBarHttpClientModule,
		// for Router use:
		LoadingBarRouterModule,
		// for Core use:
		LoadingBarModule,
		MatProgressBarModule,
		AlertModule
	],
	providers: [BsModalService, RequestInterceptor, {
		provide: HTTP_INTERCEPTORS,
		useClass: RequestInterceptor,
		multi: true,
	}],
	exports: [CommonComponent, FormValidationErrorComponent],
	declarations: [
		CommonComponent, HttpInterceptComponent, ProgressBarComponent, FormValidationErrorComponent
	]
})
export class CommonComponentModule {
}
