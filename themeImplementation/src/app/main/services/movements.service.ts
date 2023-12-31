import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";

@Injectable({
    providedIn: 'root'
})
export class MovementsService extends RequestHelperService {

    constants = {
        FIELD_DEFAULTS: {
            DATETIME_DEFAULT: '',
            CONCEPT_DEFAULT: '',
            AMOUNT_DEFAULT: '',
            CLIENT_ID_DEFAULT: 0,
            MOVEMENT_CATEGORY_ID_DEFAULT: 0,
        },
        REQUEST_MODULE: 'MOVEMENTS',
        ENDPOINT_CREATE: 'CREATE',
        ENDPOINT_UPDATE: 'UPDATE',
        ENDPOINT_LIST: 'LIST',
        ENDPOINT_GET_ONE: 'GET_ONE',
        ENDPOINT_DELETE: 'DELETE',
    };

    
    /**
     *
     * @param parameters
     * @returns any
     */
    getList(parameters) {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        let options = this.getRequestOptions(true);
        return this.http.post(url, parameters, options);
    }

    getTotalBalance(parameters){
        let url = this.getURL(this.constants.REQUEST_MODULE, 'GET_TOTAL_BALANCE');
        const headers = this.getRequestOptions(true);        
        return this.http.post(url, parameters, headers);
    }

    getOne(id) {
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
        let dataToSend = formData;
        dataToSend = {
          datetime:formData.datetime,
          amount:formData.amount,
          concept:formData.concept,
          movement_type_id:formData.movement_type_id,
          movement_category_id:formData.movement_category_id.id,   
          client_id:formData.client_id ? formData.client_id.id : '',
        }
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
        const headers = this.getRequestOptions(true);
        let requestBody = this.getFormRequestBody(dataToSend);
        return this.http.post(url, requestBody, headers);
    }

    update(id, data) {
        let dataToSend = data;
        dataToSend = {
          datetime:data.datetime,
          amount:data.amount,
          concept:data.concept,
          movement_type_id:data.movement_type_id,
          movement_category_id:data.movement_category_id.id,   
          client_id:data.client_id ? data.client_id.id : '',
        }
        let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
        const headers = this.getRequestOptions(true);
        let requestBody = this.getFormRequestBody(dataToSend);
        url = url.replace(':id', id);

        return this.http.put(url, requestBody, headers);
    }


    private getFormRequestBody(formData) {

        return {
            datetime: formData.datetime,
            amount: formData.amount,
            movement_type_id: formData.movement_type_id,
            movement_category_id: this.getValueOrDefaultIfNull(
                formData.movement_category_id, this.constants.FIELD_DEFAULTS.MOVEMENT_CATEGORY_ID_DEFAULT
            ),
            client_id: this.getValueOrDefaultIfNull(
                formData.client_id, this.constants.FIELD_DEFAULTS.CLIENT_ID_DEFAULT
            ),
            concept: this.getValueOrDefaultIfNull(
                formData.concept, this.constants.FIELD_DEFAULTS.CONCEPT_DEFAULT
            ),

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
