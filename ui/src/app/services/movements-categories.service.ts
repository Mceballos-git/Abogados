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

  create(name){
    let requestBody = {name: name.new_mov_category};
    return this.http.post('http://local.sassani.com/rubros', requestBody);
  }

  edit(id){
    //no esta listo
    return this.http.put('http://local.sassani.com/rubros/', id);
  }
}
