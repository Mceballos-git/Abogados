import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class EndpointsConfig {
    API_BASE = 'http://local.sassani.com';
    AUTH = {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout'
    };
    USER_SECURITY = {
        FORGOT_PASSWORD: '/user-security/forgot-password',
        RESET_PASSWORD: '/user-security/reset-password'
    };
}
