import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";

@Injectable({
    providedIn: 'root'
})
export class ProceduresService extends RequestHelperService {

    constants = {
        FIELD_DEFAULTS: {
            INICIO_DEMANDA_DEFAULT: '',
            SENTENCIA_PRIMERA_INSTANCIA_DEFAULT: '',
            SENTENCIA_SEGUNDA_INSTANCIA_DEFAULT: '',
            SENTENCIA_CORTE_SUPREMA_DEFAULT: '',
            INICIO_DE_EJECUCION_DEFAULT: '',
            OBSERVACIONES_DEFAULT: '',
            CLIENT_ID_DEFAULT: 0,
            PROCEDURE_CATEGORY_ID_DEFAULT: 0,
        },
        REQUEST_MODULE: 'PROCEDURES',
        ENDPOINT_CREATE: 'CREATE',
        ENDPOINT_UPDATE: 'UPDATE',
        ENDPOINT_LIST: 'LIST',
        ENDPOINT_GET_ONE: 'GET_ONE',
        ENDPOINT_DELETE: 'DELETE',
    };


    getList() {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        const headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
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
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
        const headers = this.getRequestOptions(true);
        let requestBody = this.getFormRequestBody(formData);
        return this.http.post(url, requestBody, headers);
    }

    update(id, data) {
        let url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
        const headers = this.getRequestOptions(true);
        let requestBody = this.getFormRequestBody(data);
        url = url.replace(':id', id);

        return this.http.put(url, requestBody, headers);
    }


    private getFormRequestBody(formData) {

        return {

            client_id: this.getValueOrDefaultIfNull(
                formData.client_id, this.constants.FIELD_DEFAULTS.CLIENT_ID_DEFAULT
            ),
            procedure_category_id: this.getValueOrDefaultIfNull(
                formData.procedure_category_id, this.constants.FIELD_DEFAULTS.PROCEDURE_CATEGORY_ID_DEFAULT
            ),
            inicio_demanda: this.getValueOrDefaultIfNull(
                formData.inicio_demanda, this.constants.FIELD_DEFAULTS.INICIO_DEMANDA_DEFAULT
            ),
            sentencia_primera_instancia: this.getValueOrDefaultIfNull(
                formData.sentencia_primera_instancia, this.constants.FIELD_DEFAULTS.SENTENCIA_PRIMERA_INSTANCIA_DEFAULT
            ),
            sentencia_segunda_instancia: this.getValueOrDefaultIfNull(
                formData.sentencia_segunda_instancia, this.constants.FIELD_DEFAULTS.SENTENCIA_SEGUNDA_INSTANCIA_DEFAULT
            ),
            sentencia_corte_suprema: this.getValueOrDefaultIfNull(
                formData.sentencia_corte_suprema, this.constants.FIELD_DEFAULTS.SENTENCIA_CORTE_SUPREMA_DEFAULT
            ),
            inicio_de_ejecucion: this.getValueOrDefaultIfNull(
                formData.inicio_de_ejecucion, this.constants.FIELD_DEFAULTS.INICIO_DE_EJECUCION_DEFAULT
            ),
            observaciones: this.getValueOrDefaultIfNull(
                formData.observaciones, this.constants.FIELD_DEFAULTS.OBSERVACIONES_DEFAULT
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
