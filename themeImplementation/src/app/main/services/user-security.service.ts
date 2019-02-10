import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestHelperService} from './request-helper.service';

@Injectable({
    providedIn: 'root'
})

export class UserSecurityService extends RequestHelperService {

    constants = {
        REQUEST_MODULE : 'USER_SECURITY',
        ENDPOINT_FORGOT_PASSWORD : 'FORGOT_PASSWORD',
        ENDPOINT_RESET_PASSWORD : 'RESET_PASSWORD',
        ENDPOINT_CHANGE_PASSWORD : 'CHANGE_PASSWORD',
        ENDPOINT_ACTIVATE : 'ACTIVATE',
        ENDPOINT_DEACTIVATE : 'DEACTIVATE',
    };

    /**
     * Create Forgot Password Observable.
     * @param resetData
     * @returns {Observable<Object>}
     */
    forgotPassword(resetData): Observable<Object>  {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_FORGOT_PASSWORD);
        const headers = this.getRequestOptions(false);
        const requestBody = {
            email: resetData.email
        };
        return this.http.post(url, requestBody, headers);
    }

    /**
     * Create Reset Password Observable.
     * @param data
     * @returns {Observable<Object>}
     */
    resetPassword(data): Observable<Object> {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_RESET_PASSWORD);
        const headers = this.getRequestOptions(false);
        const requestBody = {
            reset_token: data.reset_token,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation
        };
        return this.http.post(url, requestBody, headers);
    }

    changePassword(data): Observable<Object> {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CHANGE_PASSWORD);
        const headers = this.getRequestOptions(true);
        const requestBody = {
            current_password: data.current_password,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation
        };
        return this.http.post(url, requestBody, headers);
    }



    activate(data): Observable<Object> {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_ACTIVATE);
        const headers = this.getRequestOptions(true);
        const requestBody = {
            user_id: data
        };
        return this.http.post(url, requestBody, headers);
    }

    deactivate(data): Observable<Object> {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DEACTIVATE);
        const headers = this.getRequestOptions(true);
        const requestBody = {
            user_id: data
        };
        return this.http.post(url, requestBody, headers);
    }
}
