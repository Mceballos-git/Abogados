import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";
import {Observable, of} from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Response } from '@angular/http';

interface Person {
  id: string;
  isActive: boolean;    
  name: string;
  last_name:string
}


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
      DATE_OF_BIRTH_DEFAULT:'',
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
    ENDPOINT_ACTIVATE : 'ACTIVATE',
    ENDPOINT_DEACTIVATE : 'DEACTIVATE',
    ENDPOINT_LIST_ACTIVE : 'GET_LIST_ACTIVE',
  };

  getClientsList(parameters) {
    const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
    const headers = this.getRequestOptions(true);
    return this.http.post(url, parameters, headers);
  }

  getClientListForExport() {
      const url = this.getURL(this.constants.REQUEST_MODULE, 'GET_LIST_EXCEL');
      const headers = this.getRequestOptions(true);
      return this.http.get(url, headers);
  }

  getClientsActiveList() {
    const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST_ACTIVE);
    const headers = this.getRequestOptions(true);
    return this.http.get(url, headers);
  }

  getClientsActiveListSelectSearch(term){
    const url = this.getURL(this.constants.REQUEST_MODULE, 'GET_LIST_ACTIVE_SELECT_SEARCH');
    const headers = this.getRequestOptions(true);
    let requestBody = this.getFilter(term);
    return this.http.post(url, requestBody, headers);    
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

  update(id, data){
    let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
    const headers = this.getRequestOptions(true);
    let requestBody = this.getFormRequestBody(data);
    url = url.replace(':id', id);

    return this.http.put(url, requestBody, headers);
  }

  activate(data): Observable<Object> {
    const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_ACTIVATE);
    const headers = this.getRequestOptions(true);
    const requestBody = {
        client_id: data
    };
    return this.http.post(url, requestBody, headers);
  }

  deactivate(data): Observable<Object> {
      const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DEACTIVATE);
      const headers = this.getRequestOptions(true);
      const requestBody = {
          client_id: data
      };
      return this.http.post(url, requestBody, headers);
  }

  private getFormRequestBody(formData){

    return {   
      first_name: formData.first_name,
      last_name: formData.last_name, 
      identification_type: formData.identification_type, 
      identification_number: formData.identification_number,
      date_of_birth: this.getValueOrDefaultIfNull(
        formData.date_of_birth, this.constants.FIELD_DEFAULTS.DATE_OF_BIRTH_DEFAULT
      ),     
      phone_number:formData.phone_number,       
      street_address:formData.street_address,       
      number_address:formData.number_address,       
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
      observations: this.getValueOrDefaultIfNull(
        formData.observations, this.constants.FIELD_DEFAULTS.OBSERVATIONS_DEFAULT
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

  private getFilter(term) {
    return {   
      filter: term
    };
} 


}

function getMockPeople() {
  return [
      {
          'id': '5a15b13c36e7a7f00cf0d7cb',
          'index': 2,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 23,
          'name': 'Karyn Wright',
          'gender': 'female',
          'company': 'ZOLAR',
          'email': 'karynwright@zolar.com',
          'phone': '+1 (851) 583-2547'
      },
      {
          'id': '5a15b13c2340978ec3d2c0ea',
          'index': 3,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 35,
          'name': 'Rochelle Estes',
          'disabled': true,
          'gender': 'female',
          'company': 'EXTRAWEAR',
          'email': 'rochelleestes@extrawear.com',
          'phone': '+1 (849) 408-2029'
      },
      {
          'id': '5a15b13c663ea0af9ad0dae8',
          'index': 4,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 25,
          'name': 'Mendoza Ruiz',
          'gender': 'male',
          'company': 'ZYTRAX',
          'email': 'mendozaruiz@zytrax.com',
          'phone': '+1 (904) 536-2020'
      },
      {
          'id': '5a15b13cc9eeb36511d65acf',
          'index': 5,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 39,
          'name': 'Rosales Russell',
          'gender': 'male',
          'company': 'ELEMANTRA',
          'email': 'rosalesrussell@elemantra.com',
          'phone': '+1 (868) 473-3073'
      },
      {
          'id': '5a15b13c728cd3f43cc0fe8a',
          'index': 6,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 32,
          'name': 'Marquez Nolan',
          'gender': 'male',
          'company': 'MIRACLIS',
          'disabled': true,
          'email': 'marqueznolan@miraclis.com',
          'phone': '+1 (853) 571-3921'
      },
      {
          'id': '5a15b13ca51b0aaf8a99c05a',
          'index': 7,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 28,
          'name': 'Franklin James',
          'gender': 'male',
          'company': 'CAXT',
          'email': 'franklinjames@caxt.com',
          'phone': '+1 (868) 539-2984'
      },
      {
          'id': '5a15b13cc3b9381ffcb1d6f7',
          'index': 8,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 24,
          'name': 'Elsa Bradley',
          'gender': 'female',
          'company': 'MATRIXITY',
          'email': 'elsabradley@matrixity.com',
          'phone': '+1 (994) 583-3850'
      },
      {
          'id': '5a15b13ce58cb6ff62c65164',
          'index': 9,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 40,
          'name': 'Pearson Thompson',
          'gender': 'male',
          'company': 'EZENT',
          'email': 'pearsonthompson@ezent.com',
          'phone': '+1 (917) 537-2178'
      },
      {
          'id': '5a15b13c90b95eb68010c86e',
          'index': 10,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 32,
          'name': 'Ina Pugh',
          'gender': 'female',
          'company': 'MANTRIX',
          'email': 'inapugh@mantrix.com',
          'phone': '+1 (917) 450-2372'
      },
      {
          'id': '5a15b13c2b1746e12788711f',
          'index': 11,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 25,
          'name': 'Nguyen Elliott',
          'gender': 'male',
          'company': 'PORTALINE',
          'email': 'nguyenelliott@portaline.com',
          'phone': '+1 (905) 491-3377'
      },
      {
          'id': '5a15b13c605403381eec5019',
          'index': 12,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 31,
          'name': 'Mills Barnett',
          'gender': 'male',
          'company': 'FARMEX',
          'email': 'millsbarnett@farmex.com',
          'phone': '+1 (882) 462-3986'
      },
      {
          'id': '5a15b13c67e2e6d1a3cd6ca5',
          'index': 13,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 36,
          'name': 'Margaret Reynolds',
          'gender': 'female',
          'company': 'ROOFORIA',
          'email': 'margaretreynolds@rooforia.com',
          'phone': '+1 (935) 435-2345'
      },
      {
          'id': '5a15b13c947c836d177aa85c',
          'index': 14,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 29,
          'name': 'Yvette Navarro',
          'gender': 'female',
          'company': 'KINETICA',
          'email': 'yvettenavarro@kinetica.com',
          'phone': '+1 (807) 485-3824'
      },
      {
          'id': '5a15b13c5dbbe61245c1fb73',
          'index': 15,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 20,
          'name': 'Elisa Guzman',
          'gender': 'female',
          'company': 'KAGE',
          'email': 'elisaguzman@kage.com',
          'phone': '+1 (868) 594-2919'
      },
      {
          'id': '5a15b13c38fd49fefea8db80',
          'index': 16,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 33,
          'name': 'Jodie Bowman',
          'gender': 'female',
          'company': 'EMTRAC',
          'email': 'jodiebowman@emtrac.com',
          'phone': '+1 (891) 565-2560'
      },
      {
          'id': '5a15b13c9680913c470eb8fd',
          'index': 17,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 24,
          'name': 'Diann Booker',
          'gender': 'female',
          'company': 'LYRIA',
          'email': 'diannbooker@lyria.com',
          'phone': '+1 (830) 555-3209'
      }
  ]
}