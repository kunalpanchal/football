import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class FootballService {

    protected headers: any;
    protected options: any;
    protected url: any;
    constructor(private _http: Http) { }

    protected get_options() {
        this.headers = new Headers({ 'X-Auth-Token': '62db0cfed2fa41f68cf59c6ddfe670c0' });
        return new RequestOptions({ headers: this.headers });
    }

    getCompetitons(year: number) {
        this.url = 'http://api.football-data.org/v1/competitions/?season=' + year;
        return this._http.get(this.url, this.get_options())
            .map((res: Response) => res.json()).catch(this.handleError);;
    }

    getLeagueTable(urlExtension) {
        this.url = 'http://api.football-data.org/v1/competitions/' + urlExtension;
        return this._http.get(this.url, this.get_options())
            .map((res: Response) => res.json()).catch(this.handleError);;
    }

    get(url) {
        this.url = url;
        return this._http.get(this.url, this.get_options())
            .map((res: Response) => res.json()).catch(this.handleError);;
    }



    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
