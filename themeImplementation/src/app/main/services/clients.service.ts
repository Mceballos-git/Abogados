import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends RequestHelperService{

  constants = {
    FIELD_DEFAULTS : {
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
    },
    REQUEST_MODULE : 'CLIENTS',
    ENDPOINT_CREATE : 'CREATE',
    ENDPOINT_UPDATE : 'UPDATE',
    ENDPOINT_LIST : 'LIST',
    ENDPOINT_GET_ONE : 'GET_ONE',
    ENDPOINT_DELETE : 'DELETE', 
  };

  

  getClientsList() {
    const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
    const headers = this.getRequestOptions(true);
    return this.http.get(url, headers);
  }


  getOne(id){
    let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_GET_ONE);
    const headers = this.getRequestOptions(true);
    url = url.replace(':id', id);
    return this.http.get(url, headers);
  }

  delete(id) {
    let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DELETE);
    console.log(url);
    url = url.replace(':id', id);
    console.log(url);    

    const headers = this.getRequestOptions(true);
    return this.http.delete(url, headers);
  }

  create(formData) {
    const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
    const headers = this.getRequestOptions(true);
    let requestBody = this.getFormRequestBody(formData);
    return this.http.post(url, requestBody, headers);
  }

  updateUser(id, data){
    let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
    const headers = this.getRequestOptions(true);
    let requestBody = this.getFormRequestBody(data);
    url = url.replace(':id', id);

    return this.http.put(url, requestBody, headers);
  }

  private getFormRequestBody(formData){

    return {           
      nationality: this.getValueOrDefaultIfNull(
          formData.nationality, this.constants.FIELD_DEFAULTS.NATIONALITY_DEFAULT
      ),
      tin_number: this.getValueOrDefaultIfNull(
          formData.tin_number, this.constants.FIELD_DEFAULTS.TIN_NUMBER_DEFAULT
      ),
      email: this.getValueOrDefaultIfNull(
          formData.email, this.constants.FIELD_DEFAULTS.EMAIL_DEFAULT
      ),
      floor_address: this.getValueOrDefaultIfNull(
          formData.floor_address, this.constants.FIELD_DEFAULTS.FLOOR_ADDRESS_DEFAULT
      ),
      department_address: this.getValueOrDefaultIfNull(
          formData.department_address, this.constants.FIELD_DEFAULTS.DEPARTMENT_ADDRESS_DEFAULT
      ),
      country: this.getValueOrDefaultIfNull(
        formData.country, this.constants.FIELD_DEFAULTS.COUNTRY_DEFAULT
      ),
      state: this.getValueOrDefaultIfNull(
        formData.state, this.constants.FIELD_DEFAULTS.STATE_DEFAULT
      ),
      city: this.getValueOrDefaultIfNull(
        formData.city, this.constants.FIELD_DEFAULTS.CITY_DEFAULT
      ),
      active: this.getValueOrDefaultIfNull(
        formData.active, this.constants.FIELD_DEFAULTS.ACTIVE_DEFAULT
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