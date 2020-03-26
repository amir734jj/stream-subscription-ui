import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../components/account/login/login.component';
import {RegisterComponent} from '../components/account/register/register.component';
import {LogoutComponent} from '../components/account/logout/logout.component';
import {AuthenticationService} from '../services/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [AuthenticationService],
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  exports: [LoginComponent, RegisterComponent, LogoutComponent]
})
export class AccountModule {

}
