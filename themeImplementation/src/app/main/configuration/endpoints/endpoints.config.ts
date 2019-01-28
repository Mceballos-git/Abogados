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
        RESET_PASSWORD: '/user-security/reset-password',
        ACTIVATE: '/user-security/activate',
        DEACTIVATE: '/user-security/deactivate',
    };
    USERS = {
        CREATE: '/users',
        UPDATE: '/users/:id',
        LIST: '/users',
        GET_ONE: '/users/:id',
        DELETE: '/users/:id',
        GET_PROFILE:'/users/getProfile'
    };
    CLIENTS = {
        CREATE: '/clients',
        UPDATE: '/clients/:id',
        LIST: '/clients',
        GET_ONE: '/clients/:id',
        DELETE: '/clients/:id',
        ACTIVATE: '/clients/activate',
        DEACTIVATE: '/clients/deactivate',
    };
    MOVEMENTS_CATEGORIES = {
        CREATE: '/movements-categories',
        UPDATE: '/movements-categories/:id',
        LIST: '/movements-categories',
        GET_ONE: '/movements-categories/:id',
        DELETE: '/movements-categories/:id',
    };
    MOVEMENTS = {
        CREATE: '/movements',
        UPDATE: '/movements/:id',
        LIST: '/movements',
        GET_ONE: '/movements/:id',
        DELETE: '/movements/:id',
    };
    OFFICES = {
        CREATE: '/offices',
        UPDATE: '/offices/:id',
        LIST: '/offices',
        GET_ONE: '/offices/:id',
        DELETE: '/offices/:id',
    };
}
