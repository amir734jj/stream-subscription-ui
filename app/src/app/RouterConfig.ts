// routerConfig.ts

import {Routes} from '@angular/router';
import {ContractorIndexComponent} from './components/contractor/index/contractor.index.component';
import {ContractorSaveComponent} from './components/contractor/save/contractor.save.component';
import {ContractorUpdateComponent} from './components/contractor/update/contractor.update.component';
import {LogoutComponent} from './components/account/logout/logout.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {BoardComponent} from './components/board/board.component';
import {AboutComponent} from './components/about/about.component';

export const appRoutes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'home', component: BoardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'board', component: BoardComponent},
  {path: 'contractor/new', component: ContractorSaveComponent},
  {path: 'contractor/:id/edit', component: ContractorUpdateComponent},
  {path: 'contractor/:id', component: ContractorIndexComponent}
];
