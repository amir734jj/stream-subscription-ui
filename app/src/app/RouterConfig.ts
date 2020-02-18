// routerConfig.ts
import {Route, Routes} from '@angular/router';
import * as _ from 'lodash';

import {ContractorIndexComponent} from './components/contractor/index/contractor.index.component';
import {LogoutComponent} from './components/account/logout/logout.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {BoardComponent} from './components/board/board.component';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/index/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {UsersComponent} from './components/users/users.component';
import {ContractorBoardComponent} from './components/contractor/board/contractor-board.component';
import {CustomCanActivate} from './utilities/injectables/custom.can.activate';
import {RoutesDataType} from './types/router.data.type';
import {ShowcaseProjectAddComponent} from "./components/profile/contractor/showcase/showcase-project-add.component";

let appRoutes: Routes = _.map([
	{path: '', component: BoardComponent, data: {allowAnonymous: true}},
	{path: 'home', component: BoardComponent, data: {allowAnonymous: true}},
	{path: 'about', component: AboutComponent, data: {allowAnonymous: true}},
	{path: 'login', component: LoginComponent, data: {disallowAuthenticated: true}},
	{path: 'register', component: RegisterComponent, data: {disallowAuthenticated: true}},
	{path: 'logout', component: LogoutComponent, data: {allowAnonymous: false}},
	{path: 'welcome', component: WelcomeComponent, data: {allowAnonymous: false}},
	{path: 'board', component: BoardComponent, data: {allowAnonymous: false}},
	{path: 'user', component: UsersComponent, data: {allowAnonymous: false}},
	{
		path: 'contractor', data: {allowAnonymous: false}, component: ContractorBoardComponent, children: [
			{path: ':id', component: ContractorIndexComponent}
		]
	},
	{
		path: 'profile', component: ProfileComponent, data: {allowAnonymous: false}, children: [
			{path: 'contractor/showcase/add', component: ShowcaseProjectAddComponent}
		]
	},
] as Route | { data: RoutesDataType }, x => ({...x, canActivate: [CustomCanActivate]} as Route));

appRoutes = appRoutes.map(x => ({
	...x,
	canActivate: [CustomCanActivate]
}));

export {appRoutes};
