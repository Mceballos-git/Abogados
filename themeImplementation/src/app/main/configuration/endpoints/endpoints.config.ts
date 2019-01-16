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
    USERS = {
        CREATE: '/users',
        UPDATE: '/users/:id',
        LIST: '/users',
        GET_ONE: '/users/:id',
        DELETE: '/users/:id',
    };
    CLIENTS = {
        CREATE: '/clients',
        UPDATE: '/clients/:id',
        LIST: '/clients',
        GET_ONE: '/clients/:id',
        DELETE: '/clients/:id',
    }
}
