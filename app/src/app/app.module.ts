import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {appRoutes} from './RouterConfig';
import {RouterModule} from '@angular/router';
import {BoardModule} from './modules/board.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ContractorModule} from './modules/contractor.module';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {AccountModule} from './modules/account.module';
import {CommonComponentModule} from './modules/common.module';
import {JwtInterceptor} from './intercepters/jwt.intercepter';
import {AboutComponent} from './components/about/about.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {FormsModule} from '@angular/forms';
import {ProfileModule} from './modules/profile.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {UserModule} from './modules/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ButtonsModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      disableConsoleLogging: false
    }),
    HttpClientModule,
    CommonComponentModule,
    AccountModule,
    BoardModule,
    ProfileModule,
    UserModule,
    ContractorModule,
    NgxFileDropModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
