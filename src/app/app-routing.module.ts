import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayQuizoComponent } from './page/play-quizo/play-quizo.component';
import { QuizoQuestionComponent } from './page/quizo-question/quizo-question.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [

  { path: 'play', component:PlayQuizoComponent },
  { path: 'home',component:HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
