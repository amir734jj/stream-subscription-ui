// routerConfig.ts
import {Route, Routes} from '@angular/router';
import * as _ from 'lodash';

import {LogoutComponent} from './components/account/logout/logout.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {BoardComponent} from './components/board/board.component';
import {AboutComponent} from './components/about/about.component';
import {ProfileComponent} from './components/profile/index/profile.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {UsersComponent} from './components/users/users.component';
import {CustomCanActivate} from './utilities/injectables/custom.can.activate';
import {RoutesDataType} from './types/router.data.type';
import {StreamComponent} from './components/stream/index/stream.component';
import {AddStreamComponent} from './components/stream/add/add-stream.component';
import {ManageStreamComponent} from './components/stream/manage/manage-stream.component';
import {EditStreamComponent} from './components/stream/edit/edit-stream.component';
import {FtpSinkComponent} from './components/ftpsink/index/ftp-sink.component';
import {AddFtpSinkComponent} from './components/ftpsink/add/add-ftp-sink.component';
import {EditFtpSinkComponent} from './components/ftpsink/edit/edit-ftp-sink.component';
import {ManageFtpSinkComponent} from './components/ftpsink/manage/manage-ftp-sink.component';

let appRoutes: Routes = _.map([
  {path: '', component: BoardComponent, data: {allowAnonymous: true, shouldReuse: true}},
  {path: 'home', component: BoardComponent, data: {allowAnonymous: true, shouldReuse: true}},
  {path: 'about', component: AboutComponent, data: {allowAnonymous: true}},
  {path: 'login', component: LoginComponent, data: {disallowAuthenticated: true}},
  {path: 'register', component: RegisterComponent, data: {disallowAuthenticated: true}},
  {path: 'logout', component: LogoutComponent, data: {allowAnonymous: false}},
  {path: 'welcome', component: WelcomeComponent, data: {allowAnonymous: false}},
  {path: 'board', component: BoardComponent, data: {allowAnonymous: false, shouldReuse: true}},
  {path: 'stream', component: StreamComponent, data: {allowAnonymous: false}},
  {path: 'stream/add', component: AddStreamComponent, data: {allowAnonymous: false}},
  {path: 'stream/:id', component: ManageStreamComponent, data: {allowAnonymous: false}},
  {path: 'stream/:id/edit', component: EditStreamComponent, data: {allowAnonymous: false}},
  {path: 'ftpSink', component: FtpSinkComponent, data: {allowAnonymous: false}},
  {path: 'ftpSink/add', component: AddFtpSinkComponent, data: {allowAnonymous: false}},
  {path: 'ftpSink/:id', component: ManageFtpSinkComponent, data: {allowAnonymous: false}},
  {path: 'ftpSink/:id/edit', component: EditFtpSinkComponent, data: {allowAnonymous: false}},
  {path: 'user', component: UsersComponent, data: {allowAnonymous: false}},
  {path: 'profile', component: ProfileComponent, data: {allowAnonymous: false}},
] as Route | { data: RoutesDataType }, x => ({...x, canActivate: [CustomCanActivate]} as Route));

appRoutes = appRoutes.map(x => ({
  ...x,
  canActivate: [CustomCanActivate]
}));

export {appRoutes};
