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
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (loginData) {
        var requestBody = { username: loginData.user, password: loginData.pass };
        return this.http.post('http://local.sassani.com/auth/login', requestBody);
    };
    AuthService.prototype.logut = function () {
    };
    AuthService.prototype.forgotPassword = function (resetData) {
        var requestBody = { email: resetData.email };
        return this.http.post('http://local.sassani.com/user-security/forgot-password', requestBody);
    };
    AuthService.prototype.resetPassword = function (data) {
        var requestBody = { reset_token: data.token, new_password: data.newPassword, new_password_confirmation: data.newPassConfirm };
        return this.http.post('http://local.sassani.com/user-security/reset-password', requestBody);
    };
    AuthService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map