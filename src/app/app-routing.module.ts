import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayQuizoComponent } from './page/play-quizo/play-quizo.component';
import { QuizoQuestionComponent } from './page/quizo-question/quizo-question.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { AuthedGuard } from './guard/authed/authed.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent,canActivate: [AuthedGuard]  },
  { path: 'play', component:PlayQuizoComponent },
  { path: 'home',component:HomeComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
