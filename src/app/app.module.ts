import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {appRoutes} from './RouterConfig';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {BoardModule} from './modules/board.module';
import {HttpClientModule} from '@angular/common/http';
import {ContractorModule} from './modules/contractor.module';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {AccountModule} from './modules/account.module';
import {CommonComponentModule} from './modules/common.module';
import {ChatModule} from './modules/chat.module';
import {CustomReuseStrategy} from './utilities/custom.reuse.strategy.utility';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ButtonsModule.forRoot(),
    HttpClientModule,
    CommonComponentModule,
    AccountModule,
    BoardModule,
    ContractorModule,
    ChatModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
