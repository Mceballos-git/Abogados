import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})

export class MovementsService{

    constructor(private http: HttpClient) {

    }

}
