import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";


@Injectable({
  providedIn: 'root'
})
export class ProcedureCategoriesService extends RequestHelperService{

  constants = {
    FIELD_DEFAULTS : {
        NAME_DEFAULT: ''
    },
    REQUEST_MODULE : 'PROCEDURES_CATEGORIES',
    ENDPOINT_CREATE : 'CREATE',
    ENDPOINT_UPDATE : 'UPDATE',
    ENDPOINT_LIST : 'LIST',
    ENDPOINT_GET_ONE : 'GET_ONE',
    ENDPOINT_DELETE : 'DELETE',
  };

  getCategoriesList() {
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

  updateCategories(id, data){
    let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
    const headers = this.getRequestOptions(true);
    let requestBody = this.getFormRequestBody(data);
    url = url.replace(':id', id);

    return this.http.put(url, requestBody, headers);
  }

  private getFormRequestBody(formData) {
    return {
        name: formData.name,       
        
    };
  }

  /**
   * Returns value if provided or default
   *
   * @param value
   * @param defaultValue
   * @returns {any}
   */
  

}
