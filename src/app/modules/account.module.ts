import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {AuthenticationUtility} from '../utilities/authentication.utility';
import {LoginComponent} from '../components/account/login/login.component';
import {RegisterComponent} from '../components/account/register/register.component';
import {LogoutComponent} from '../components/account/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AccountService, AuthenticationUtility],
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  exports: [LoginComponent, RegisterComponent, LogoutComponent]
})
export class AccountModule {

}
