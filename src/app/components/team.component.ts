import { Component, OnInit, Input } from '@angular/core';
import { FootballService } from '../services/football.service';
declare var jQuery: any;
@Component({
    selector: 'team',
    templateUrl: './team.template.html'
})
export class TeamComponent implements OnInit {
    @Input() url;
    team: any;
    players: any;
    closestFixtures: any;
    constructor(private footballService: FootballService) {

    }
    ngOnInit() {
        this.footballService.get(this.url).then(body => { 
            this.team = body;
            this.footballService.get(this.team._links.players.href).then(body => {
                this.players = body.players;
            },
                (error: any) => {
                    console.log('Oops a error occured', error);
                });

            this.footballService.get(this.team._links.fixtures.href).then(body => {
                let allFixtureDates: any = [];
                for (let fixture of body.fixtures) {
                    allFixtureDates.push(new Date(fixture.date));
                }
                let today: any = new Date();
                allFixtureDates.sort(function (a, b) {
                    var distancea = Math.abs(today - a);
                    var distanceb = Math.abs(today - b);
                    return distancea - distanceb;
                });
                this.closestFixtures = allFixtureDates.filter(function (d) {
                    return d - today > 0;
                });
                setTimeout(() => {
                    for (let i = 0; i < this.closestFixtures.length && i < 5; i++) {
                        jQuery('.time_' + i).countdown({ until: this.closestFixtures[i] });
                    }
                }, 1000);
            },
                (error: any) => {
                    console.log('Oops a error occured', error);
                });
   },
            (error: any) => {
                console.log('Oops a error occured', error);
            });
    }
}
