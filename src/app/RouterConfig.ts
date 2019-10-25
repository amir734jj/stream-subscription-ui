// routerConfig.ts

import {Routes} from '@angular/router';
import {BoardIndexComponent} from './components/board/index/board.index.component';
import {QuestionIndexComponent} from './components/question/index/question.index.component';
import {QuestionSaveComponent} from './components/question/save/question.save.component';
import {QuestionUpdateComponent} from './components/question/update/question.update.component';
import {LogoutComponent} from './components/account/logout/logout.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {ChatComponent} from './components/chat/chat.component';

export const appRoutes: Routes = [
  {path: '', component: BoardIndexComponent},
  {path: 'home', component: BoardIndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'board', component: BoardIndexComponent},
  {path: 'chat', component: ChatComponent, data: {shouldReuse: true}},
  {path: 'question/new', component: QuestionSaveComponent},
  {path: 'question/:id/edit', component: QuestionUpdateComponent},
  {path: 'question/:id', component: QuestionIndexComponent}
];
