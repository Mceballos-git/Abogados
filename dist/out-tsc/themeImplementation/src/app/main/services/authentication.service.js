"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var request_helper_service_1 = require("./request-helper.service");
var AuthenticationService = /** @class */ (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constants = {
            REQUEST_MODULE: 'AUTH',
            ENDPOINT_LOGIN: 'LOGIN',
            ENDPOINT_LOGOUT: 'LOGOUT',
        };
        return _this;
    }
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        if (!token) {
            return false;
        }
        return !this.jwtHelper.isTokenExpired(token);
    };
    /**
     * Execute a login Request
     * @param {{}} loginData
     * @returns {Observable<Object>}
     */
    AuthenticationService.prototype.login = function (loginData) {
        var requestBody = {
            username: loginData.username,
            password: loginData.password
        };
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LOGIN);
        var headers = this.getRequestOptions(false);
        return this.http.post(url, requestBody, headers);
    };
    /**
     * Create a logout Request.
     * @returns {Observable<Object>}
     */
    AuthenticationService.prototype.logout = function () {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LOGOUT);
        var headers = this.getRequestOptions(true);
        return this.http.post(url, {}, headers);
    };
    AuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthenticationService);
    return AuthenticationService;
}(request_helper_service_1.RequestHelperService));
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map