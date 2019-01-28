"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/common/http");
var endpoints_config_1 = require("../configuration/endpoints/endpoints.config");
var angular_jwt_1 = require("@auth0/angular-jwt");
var RequestHelperService = /** @class */ (function () {
    function RequestHelperService(http, endpoints) {
        this.http = http;
        this.endpoints = endpoints;
        this.LOCAL_STORAGE_TOKEN_KEY = 'token';
        this.jwtHelper = new angular_jwt_1.JwtHelperService();
    }
    /**
     * Return a URL From Project Configuration.
     * @param endpointModule
     * @param endpointRoute
     * @returns {string}
     */
    RequestHelperService.prototype.getURL = function (endpointModule, endpointRoute) {
        if (!this.endpoints[endpointModule]) {
            throw new Error('Invalid Configuration: Provided endpoint Module do not exist');
        }
        if (!this.endpoints[endpointModule][endpointRoute]) {
            throw new Error('Invalid Configuration: Provided endpoint Route do not exist');
        }
        return this.endpoints.API_BASE + this.endpoints[endpointModule][endpointRoute];
    };
    /**
     * Create an array of Request headers
     * @returns any
     */
    RequestHelperService.prototype.getRequestOptions = function (authenticated) {
        var headers = {
            'Content-Type': 'application/json',
        };
        if (authenticated) {
            headers['Authorization'] = this.getAuthenticationHeaderValue();
        }
        return {
            headers: new http_2.HttpHeaders(headers)
        };
    };
    /**
     * Get Token From local Storage.
     * @returns {string}
     */
    RequestHelperService.prototype.getToken = function () {
        return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
    };
    /**
     *
     * @returns {string}
     */
    RequestHelperService.prototype.getAuthenticationHeaderValue = function () {
        return 'Bearer ' + this.getToken();
    };
    /**
     * Set Token From local Storage.
     * @param {string} token
     * @returns {boolean}
     */
    RequestHelperService.prototype.setToken = function (token) {
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, token);
        return true;
    };
    RequestHelperService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            endpoints_config_1.EndpointsConfig])
    ], RequestHelperService);
    return RequestHelperService;
}());
exports.RequestHelperService = RequestHelperService;
//# sourceMappingURL=request-helper.service.js.map