import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class MovementsCategoriesService {

  constructor(private http: HttpClient) { }

  getMovementsCategoriesList() {
    return this.http.get('http://local.sassani.com/rubros');
  }

  delete(id){
    return this.http.delete('http://local.sassani.com/rubros/'+id);
  }

}
