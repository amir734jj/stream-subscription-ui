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
import {ProfileComponent} from './components/profile/index/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {UsersComponent} from "./components/users/users.component";
import {ContractorBoardComponent} from "./components/contractor/board/contractor-board.component";

export const appRoutes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'home', component: BoardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'board', component: BoardComponent},
	{path: 'user', component: UsersComponent},
	{path: 'contractor', component: ContractorBoardComponent},
	{path: 'contractor/new', component: ContractorSaveComponent},
  {path: 'contractor/:id/edit', component: ContractorUpdateComponent},
  {path: 'contractor/:id', component: ContractorIndexComponent}
];
