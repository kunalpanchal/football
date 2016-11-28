import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FootballService } from './services/football.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'All Competitons';
  competitions: any = {};
  page: string = 'competition';
  standingBody: string;

  constructor(private footballService: FootballService) { }

  ngOnInit() {
    this.footballService.getCompetitons(2015).subscribe(body => { this.competitions[2015] = body; },
      (error: any) => {
        console.log('Oops a error occured', error);
      });
    this.footballService.getCompetitons(2016).subscribe(body => { this.competitions[2016] = body; },
      (error: any) => {
        console.log('Oops a error occured', error);
      });
  }

  selectComp(id: any) {
    this.footballService.getLeagueTable(id + '/leagueTable').subscribe(body => {
      this.page = 'standing';
      this.title = body.leagueCaption;
      this.standingBody = body;
    },
      (error: any) => {
        console.log('Oops a error occured', error);
      });
  }
  titleUpdated(title: any) {
    this.title = title;
  }
}
