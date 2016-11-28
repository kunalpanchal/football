import { StandingComponent } from './components/standing.component';
import { TeamComponent } from './components/team.component';
import { FootballPage } from './../../e2e/app.po';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FootballService } from './services/football.service';

@NgModule({
  declarations: [
    AppComponent, TeamComponent, StandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FootballService],
  bootstrap: [AppComponent]
})
export class AppModule { }
