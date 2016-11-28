import { environment } from './../../environments/environment';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FootballService } from '../services/football.service';

@Component({
    selector: 'standing',
    templateUrl: './standing.template.html'
})
export class StandingComponent {
    @Input() body;
    @Output() title = new EventEmitter();
    page: string = 'standing';
    url: string;
    constructor(private footballService: FootballService) { }
    teamSelc(index: any, teamName: any) {

        this.url = this.body.standing[index]._links.team.href;
        if (environment.production)
            this.url = this.url.replace(/^http:\/\//i, 'https://');
        this.page = 'team';
        this.title.emit(teamName);
    }
}
