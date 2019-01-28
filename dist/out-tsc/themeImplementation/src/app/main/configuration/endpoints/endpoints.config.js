"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EndpointsConfig = /** @class */ (function () {
    function EndpointsConfig() {
        this.API_BASE = 'http://local.sassani.com';
        this.AUTH = {
            LOGIN: '/auth/login',
            LOGOUT: '/auth/logout'
        };
        this.USER_SECURITY = {
            FORGOT_PASSWORD: '/user-security/forgot-password',
            RESET_PASSWORD: '/user-security/reset-password',
            ACTIVATE: '/user-security/activate',
            DEACTIVATE: '/user-security/deactivate',
        };
        this.USERS = {
            CREATE: '/users',
            UPDATE: '/users/:id',
            LIST: '/users',
            GET_ONE: '/users/:id',
            DELETE: '/users/:id',
            GET_PROFILE: '/users/getProfile'
        };
        this.CLIENTS = {
            CREATE: '/clients',
            UPDATE: '/clients/:id',
            LIST: '/clients',
            GET_ONE: '/clients/:id',
            DELETE: '/clients/:id',
            ACTIVATE: '/clients/activate',
            DEACTIVATE: '/clients/deactivate',
        };
        this.MOVEMENTS_CATEGORIES = {
            CREATE: '/movements-categories',
            UPDATE: '/movements-categories/:id',
            LIST: '/movements-categories',
            GET_ONE: '/movements-categories/:id',
            DELETE: '/movements-categories/:id',
        };
        this.MOVEMENTS = {
            CREATE: '/movements',
            UPDATE: '/movements/:id',
            LIST: '/movements',
            GET_ONE: '/movements/:id',
            DELETE: '/movements/:id',
        };
        this.OFFICES = {
            CREATE: '/offices',
            UPDATE: '/offices/:id',
            LIST: '/offices',
            GET_ONE: '/offices/:id',
            DELETE: '/offices/:id',
        };
    }
    EndpointsConfig = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EndpointsConfig);
    return EndpointsConfig;
}());
exports.EndpointsConfig = EndpointsConfig;
//# sourceMappingURL=endpoints.config.js.map