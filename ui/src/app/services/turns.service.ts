import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  constants = {
    CLIENT_ID_DEFAULT: 0,
    GIVEN_USER_ID_DEFAULT: 0,
    ATTENTION_USER_ID_DEFAULT: 0,
    OFFICE_ID_DEFAULT: 0,
    REGISTER_DATE_DEFAULT: '',
    TURN_DATE_DEFAULT: '',
    TURN_TIME_START_DEFAULT: '',
    TURN_TIME_END_DEFAULT: '',
    PHONE_NUMBER_REF_DEFAULT:'',
    PRIORITY_DEFAULT: '',
    TITLE_DEFAULT: '',
    ACTIVE_DEFAULT: true
  };  

  constructor(private http: HttpClient) { }

  getOffices(){
    return this.http.get('http://local.sassani.com/offices');
  }

  create(data) {
    let requestBody = this.getFormRequestBody(data);
    return this.http.post('http://local.sassani.com/turns', requestBody);
  }

  updateTurn(id, data){
    let requestBody = this.getFormRequestBody(data);
    return this.http.put('http://local.sassani.com/turns/' + id, requestBody);
  }

  getOne(id){
    return this.http.get('http://local.sassani.com/turns/' + id);
  }

  getTurnsList() {
    return this.http.get('http://local.sassani.com/turns');
  }

  delete(id) {
    return this.http.delete('http://local.sassani.com/turns/' + id);
  }

  private getFormRequestBody(formData){

    return {
      client_id: formData.username,
      given_user_id: formData.email,
      attention_user_id: formData.first_name,
      office_id: formData.last_name,      
      register_date: this.getValueOrDefaultIfNull(
          formData.register_date, this.constants.REGISTER_DATE_DEFAULT
      ),
      turn_date: this.getValueOrDefaultIfNull(
          formData.turn_date, this.constants.TURN_DATE_DEFAULT
      ),
      turn_time_start: this.getValueOrDefaultIfNull(
          formData.turn_time_start, this.constants.TURN_TIME_START_DEFAULT
      ),
      turn_time_end: this.getValueOrDefaultIfNull(
          formData.turn_time_end, this.constants.TURN_TIME_END_DEFAULT
      ),
      phone_number_ref: this.getValueOrDefaultIfNull(
          formData.phone_number_ref, this.constants.PHONE_NUMBER_REF_DEFAULT
      ),
      priority: this.getValueOrDefaultIfNull(
        formData.priority, this.constants.PRIORITY_DEFAULT
      ),
      title: this.getValueOrDefaultIfNull(
        formData.title, this.constants.TITLE_DEFAULT
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
