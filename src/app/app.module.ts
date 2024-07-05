import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectedAnswerDirectiveDirective } from './directive/selected-answer-directive/selected-answer-directive.directive';
import { PlayQuizoComponent } from './page/play-quizo/play-quizo.component';
import { QuizoQuestionComponent } from './page/quizo-question/quizo-question.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { HomeComponent } from './page/home/home.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    AppComponent,
    SelectedAnswerDirectiveDirective,
    PlayQuizoComponent,
    QuizoQuestionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
