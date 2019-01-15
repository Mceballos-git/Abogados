import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constants = {
    CLIENT_ID_DEFAULT: '',
    NATIONALITY_DEFAULT: '',
    TIN_NUMBER_DEFAULT: '',
    EMAIL_DEFAULT: '',
    FLOOR_ADDRESS_DEFAULT: '',
    DEPARTMENT_ADDRESS_DEFAULT: '',
    COUNTRY_DEFAULT: '',
    STATE_DEFAULT: '',
    CITY_DEFAULT:'',
    OBSERVATIONS_DEFAULT: '',    
    ACTIVE_DEFAULT: true
  };  

  constructor(private http: HttpClient) { }

  create(data) {
    let requestBody = this.getFormRequestBody(data);;
    return this.http.post('http://local.sassani.com/clients', requestBody);
  }

  getOne(id){
    return this.http.get('http://local.sassani.com/clients/' + id);
  }

  updateUser(id, data){
    let requestBody = this.getFormRequestBody(data);
    return this.http.put('http://local.sassani.com/clients/' + id, requestBody);
  }
   
  
  getClientsList() {
    return this.http.get('http://local.sassani.com/clients');
  }

  delete(id) {
      return this.http.delete('http://local.sassani.com/clients/' + id);
  }

  private getFormRequestBody(formData){

    return {           
      nationality: this.getValueOrDefaultIfNull(
          formData.nationality, this.constants.NATIONALITY_DEFAULT
      ),
      tin_number: this.getValueOrDefaultIfNull(
          formData.tin_number, this.constants.TIN_NUMBER_DEFAULT
      ),
      email: this.getValueOrDefaultIfNull(
          formData.email, this.constants.EMAIL_DEFAULT
      ),
      floor_address: this.getValueOrDefaultIfNull(
          formData.floor_address, this.constants.FLOOR_ADDRESS_DEFAULT
      ),
      department_address: this.getValueOrDefaultIfNull(
          formData.department_address, this.constants.DEPARTMENT_ADDRESS_DEFAULT
      ),
      country: this.getValueOrDefaultIfNull(
        formData.country, this.constants.COUNTRY_DEFAULT
      ),
      state: this.getValueOrDefaultIfNull(
        formData.state, this.constants.STATE_DEFAULT
      ),
      city: this.getValueOrDefaultIfNull(
        formData.city, this.constants.CITY_DEFAULT
      ),
      active: this.getValueOrDefaultIfNull(
        formData.active, this.constants.ACTIVE_DEFAULT
      )
    };
  }

     /**
     * Returns value if provided or default
     *
     * @param value
     * @param defaultValue
     * @returns {any}
     */
    private getValueOrDefaultIfNull(value, defaultValue) {
      return value ? value : defaultValue
  }


}
