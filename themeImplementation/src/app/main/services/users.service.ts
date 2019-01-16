import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {RequestHelperService} from "./request-helper.service";

@Injectable({
    providedIn: 'root'
})


export class UsersService extends RequestHelperService {

    constants = {
        FIELD_DEFAULTS : {
            SHIFT_START_DEFAULT: '',
            SHIFT_END_DEFAULT: '',
            POSITION_DEFAULT: '',
            DEGREE_DEFAULT: '',
            ACTIVE_DEFAULT: true
        },
        REQUEST_MODULE : 'USERS',
        ENDPOINT_CREATE : 'CREATE',
        ENDPOINT_UPDATE : 'UPDATE',
        ENDPOINT_LIST : 'LIST',
        ENDPOINT_GET_ONE : 'GET_ONE',
        ENDPOINT_DELETE : 'DELETE',
    };

    getUsersList() {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        const headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
    }

    delete(id) {
        return this.http.delete('http://local.sassani.com/users/' + id);
    }

    create(formData) {
        let requestBody = this.getFormRequestBody(formData);
        return this.http.post('http://local.sassani.com/users', requestBody);
    }


    private getFormRequestBody(formData) {
        return {
            username: formData.username,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            role_list: this.getRolesFromFormData(
                formData.role_list
            ),
            active: this.getValueOrDefaultIfNull(
                formData.active, this.constants.FIELD_DEFAULTS.ACTIVE_DEFAULT
            ),
            degree: this.getValueOrDefaultIfNull(
                formData.degree, this.constants.FIELD_DEFAULTS.DEGREE_DEFAULT
            ),
            position: this.getValueOrDefaultIfNull(
                formData.position, this.constants.FIELD_DEFAULTS.POSITION_DEFAULT
            ),
            shift_start: this.getValueOrDefaultIfNull(
                formData.shift_start, this.constants.FIELD_DEFAULTS.SHIFT_START_DEFAULT
            ),
            shift_end: this.getValueOrDefaultIfNull(
                formData.shift_ends, this.constants.FIELD_DEFAULTS.SHIFT_END_DEFAULT
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

    /**
     * Get Selected Role From form.
     *
     * @param selectedRole
     * @returns {any}
     */
    private getRolesFromFormData(selectedRole) {
        console.log(selectedRole);

        if (!selectedRole) {
            return [];
        }
        return [selectedRole];
    }

    getOne(id){
        return this.http.get('http://local.sassani.com/users/' + id);
    }

    getRoleFromArray(roles){
        return roles[0];
    }

    updateUser(id, data){
        let requestBody = this.getFormRequestBody(data);
        return this.http.put('http://local.sassani.com/users/' + id, requestBody);
    }
}
