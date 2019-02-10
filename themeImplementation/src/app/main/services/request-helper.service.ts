import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {EndpointsConfig} from '../configuration/endpoints/endpoints.config';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})


export class RequestHelperService {

    jwtHelper : JwtHelperService;
    LOCAL_STORAGE_TOKEN_KEY = 'token';

    constructor(
        protected http: HttpClient,
        private endpoints: EndpointsConfig
    ) {
        this.jwtHelper = new JwtHelperService();
    }

    /**
     * Return a URL From Project Configuration.
     * @param endpointModule
     * @param endpointRoute
     * @returns {string}
     */
    getURL(endpointModule, endpointRoute): string {
        if (!this.endpoints[endpointModule]) {
            throw new Error('Invalid Configuration: Provided endpoint Module do not exist');
        }

        if (!this.endpoints[endpointModule][endpointRoute]) {
            throw new Error('Invalid Configuration: Provided endpoint Route do not exist');
        }

        return this.endpoints.API_BASE + this.endpoints[endpointModule][endpointRoute];
    }

    /**
     * Create an array of Request headers
     * @returns any
     */
    getRequestOptions(authenticated): any {

        const headers = {
            'Content-Type': 'application/json',
        };

        if (authenticated) {
            headers['Authorization'] = this.getAuthenticationHeaderValue();
        }

        return {
            headers: new HttpHeaders(headers)
        };
    }

    /**
     * Get Token From local Storage.
     * @returns {string}
     */
    getToken(): string {
        return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
    }

    /**
     *
     * @returns {string}
     */
    private getAuthenticationHeaderValue(): string {
        return 'Bearer ' + this.getToken();
    }

    /**
     * Set Token From local Storage.
     * @param {string} token
     * @returns {boolean}
     */
    setToken(token: string): boolean {
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, token);
        return true;
    }
}
