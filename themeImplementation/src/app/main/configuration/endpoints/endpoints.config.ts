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
        CHANGE_PASSWORD: '/user-security/change-password',
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
        GET_LIST_ACTIVE:'/clients/getListActive'
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
        LIST: '/movements/getList',
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
    TURNS = {
        CREATE: '/turns',
        UPDATE: '/turns/:id',
        LIST: '/turns',
        GET_ONE: '/turns/:id',
        DELETE: '/turns/:id',
    };
    PROCEDURES_CATEGORIES = {
        CREATE: '/procedures-categories',
        UPDATE: '/procedures-categories/:id',
        LIST: '/procedures-categories',
        GET_ONE: '/procedures-categories/:id',
        DELETE: '/procedures-categories/:id',
    };
    PROCEDURES = {
        CREATE: '/procedures',
        UPDATE: '/procedures/:id',
        LIST: '/procedures',
        GET_ONE: '/procedures/:id',
        DELETE: '/procedures/:id',
    };
}
