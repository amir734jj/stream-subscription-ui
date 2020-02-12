// routerConfig.ts
import {Route, Routes} from '@angular/router';
import * as _ from "lodash";

import {ContractorIndexComponent} from './components/contractor/index/contractor.index.component';
import {LogoutComponent} from './components/account/logout/logout.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {BoardComponent} from './components/board/board.component';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/index/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {UsersComponent} from "./components/users/users.component";
import {ContractorBoardComponent} from "./components/contractor/board/contractor-board.component";
import {CustomCanActivate} from "./utilities/injectables/custom.can.activate";
import {RoutesExtended} from "./types/router.data.type";

export const appRoutes: Routes = _.map([
	{path: '', component: BoardComponent, data: { allowAnonymous: true }},
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
	{path: 'contractor/:id', component: ContractorIndexComponent}
] as RoutesExtended, x => ({...x, canActivate: [CustomCanActivate]} as Route));

