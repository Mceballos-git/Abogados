import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestHelperService} from './request-helper.service';


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService extends RequestHelperService {

    constants = {
        REQUEST_MODULE: 'AUTH',
        ENDPOINT_LOGIN: 'LOGIN',
        ENDPOINT_LOGOUT: 'LOGOUT',
    };

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(token);
    }

    /**
     * Execute a login Request
     * @param {{}} loginData
     * @returns {Observable<Object>}
     */
    login(loginData): Observable<Object> {
        const requestBody = {
            username: loginData.username,
            password: loginData.password
        };
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LOGIN);
        const headers = this.getRequestOptions(false);
        return this.http.post(url, requestBody, headers);
    }

    /**
     * Create a logout Request.
     * @returns {Observable<Object>}
     */
    logout(): Observable<Object> {
        const url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LOGOUT);
        const headers = this.getRequestOptions(true);
        return this.http.post(url, {}, headers);
    }
}
