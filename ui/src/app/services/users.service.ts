import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsersList() {
    return this.http.get('http://local.sassani.com/users');
  }

  delete(id){
    return this.http.delete('http://local.sassani.com/users/'+id);
  }

  create(data){
    let requestBody = {
      username: data.username,
      email :data.email,
      role_list: data.role_list,
      active : data.active,
      first_name :data.first_name,
      last_name :data.last_name,
      degree :data.degree,
      position: data.position,
      shift_start: data.shift_start,
      shift_ends: data.shift_ends
    };
    return this.http.post('http://local.sassani.com/users/', requestBody)
  }



}
