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
var UserSecurityService = /** @class */ (function (_super) {
    __extends(UserSecurityService, _super);
    function UserSecurityService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constants = {
            REQUEST_MODULE: 'USER_SECURITY',
            ENDPOINT_FORGOT_PASSWORD: 'FORGOT_PASSWORD',
            ENDPOINT_RESET_PASSWORD: 'RESET_PASSWORD',
            ENDPOINT_ACTIVATE: 'ACTIVATE',
            ENDPOINT_DEACTIVATE: 'DEACTIVATE',
        };
        return _this;
    }
    /**
     * Create Forgot Password Observable.
     * @param resetData
     * @returns {Observable<Object>}
     */
    UserSecurityService.prototype.forgotPassword = function (resetData) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_FORGOT_PASSWORD);
        var headers = this.getRequestOptions(false);
        var requestBody = {
            email: resetData.email
        };
        return this.http.post(url, requestBody, headers);
    };
    /**
     * Create Reset Password Observable.
     * @param data
     * @returns {Observable<Object>}
     */
    UserSecurityService.prototype.resetPassword = function (data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_RESET_PASSWORD);
        var headers = this.getRequestOptions(false);
        var requestBody = {
            reset_token: data.reset_token,
            new_password: data.new_password,
            new_password_confirmation: data.new_password_confirmation
        };
        return this.http.post(url, requestBody, headers);
    };
    UserSecurityService.prototype.activate = function (data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_ACTIVATE);
        var headers = this.getRequestOptions(true);
        var requestBody = {
            user_id: data
        };
        return this.http.post(url, requestBody, headers);
    };
    UserSecurityService.prototype.deactivate = function (data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DEACTIVATE);
        var headers = this.getRequestOptions(true);
        var requestBody = {
            user_id: data
        };
        return this.http.post(url, requestBody, headers);
    };
    UserSecurityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserSecurityService);
    return UserSecurityService;
}(request_helper_service_1.RequestHelperService));
exports.UserSecurityService = UserSecurityService;
//# sourceMappingURL=user-security.service.js.map