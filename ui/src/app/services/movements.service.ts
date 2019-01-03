import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import { analyzeAndValidateNgModules } from '@angular/compiler';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private http: HttpClient) { 

  }

  getMovementsCategoriesList(){
    return this.http.get<DataTablesResponse>('http://local.sassani.com/rubros');  
  }




}
