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
require("rxjs/Rx");
var request_helper_service_1 = require("./request-helper.service");
var UsersService = /** @class */ (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constants = {
            FIELD_DEFAULTS: {
                SHIFT_START_DEFAULT: '',
                SHIFT_END_DEFAULT: '',
                POSITION_DEFAULT: '',
                DEGREE_DEFAULT: '',
                ACTIVE_DEFAULT: true
            },
            REQUEST_MODULE: 'USERS',
            ENDPOINT_CREATE: 'CREATE',
            ENDPOINT_UPDATE: 'UPDATE',
            ENDPOINT_LIST: 'LIST',
            ENDPOINT_GET_ONE: 'GET_ONE',
            ENDPOINT_DELETE: 'DELETE',
            ENDPOINT_GET_PROFILE: 'GET_PROFILE',
        };
        return _this;
    }
    UsersService.prototype.getProfile = function () {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_GET_PROFILE);
        var headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
    };
    UsersService.prototype.getUsersList = function () {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        var headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
    };
    UsersService.prototype.getOne = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_GET_ONE);
        var headers = this.getRequestOptions(true);
        url = url.replace(':id', id);
        return this.http.get(url, headers);
    };
    UsersService.prototype.delete = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DELETE);
        console.log(url);
        url = url.replace(':id', id);
        console.log(url);
        var headers = this.getRequestOptions(true);
        return this.http.delete(url, headers);
    };
    UsersService.prototype.create = function (formData) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(formData);
        return this.http.post(url, requestBody, headers);
    };
    UsersService.prototype.update = function (id, data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(data);
        url = url.replace(':id', id);
        return this.http.put(url, requestBody, headers);
    };
    UsersService.prototype.getFormRequestBody = function (formData) {
        return {
            username: formData.username,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            role_list: this.getRolesFromFormData(formData.role),
            active: this.getValueOrDefaultIfNull(formData.active, this.constants.FIELD_DEFAULTS.ACTIVE_DEFAULT),
            degree: this.getValueOrDefaultIfNull(formData.degree, this.constants.FIELD_DEFAULTS.DEGREE_DEFAULT),
            position: this.getValueOrDefaultIfNull(formData.position, this.constants.FIELD_DEFAULTS.POSITION_DEFAULT),
            shift_start: this.getValueOrDefaultIfNull(formData.shift_start, this.constants.FIELD_DEFAULTS.SHIFT_START_DEFAULT),
            shift_end: this.getValueOrDefaultIfNull(formData.shift_end, this.constants.FIELD_DEFAULTS.SHIFT_END_DEFAULT)
        };
    };
    /**
     * Returns value if provided or default
     *
     * @param value
     * @param defaultValue
     * @returns {any}
     */
    UsersService.prototype.getValueOrDefaultIfNull = function (value, defaultValue) {
        return value ? value : defaultValue;
    };
    /**
     * Get Selected Role From form.
     *
     * @param selectedRole
     * @returns {any}
     */
    UsersService.prototype.getRolesFromFormData = function (selectedRole) {
        console.log(selectedRole);
        if (!selectedRole) {
            return [];
        }
        return [selectedRole];
    };
    UsersService.prototype.getRoleFromArray = function (roles) {
        return roles[0];
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}(request_helper_service_1.RequestHelperService));
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map