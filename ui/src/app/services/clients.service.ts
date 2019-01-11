import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  create(data) {
    let requestBody = {
      active: data.active,     
      first_name: data.first_name,
      last_name: data.last_name,
      nationality: data.nationality,
      identification_type: data.identification_type,
      identification_number: data.identification_number,
      tin_number: data.tin_number,
      date_of_birth: data.date_of_birth,
      phone_number: data.phone_number,
      email: data.email,
      street_address:data.street_address,
      number_address: data.number_address,
      floor_address: data.floor_address,
      department_address:data.department_address,
      country: data.country,
      state: data.state,
      city:data.city,
      observations: data.observations      
    };
    return this.http.post('http://local.sassani.com/clients', requestBody);
  }

}
