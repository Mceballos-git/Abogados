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
require("rxjs/Rx");
var UsersService = /** @class */ (function () {
    function UsersService(http) {
        this.http = http;
        this.constants = {
            SHIFT_START_DEFAULT: '',
            SHIFT_END_DEFAULT: '',
            POSITION_DEFAULT: '',
            DEGREE_DEFAULT: '',
            ACTIVE_DEFAULT: true
        };
    }
    UsersService.prototype.getUsersList = function () {
        return this.http.get('http://local.sassani.com/users');
    };
    UsersService.prototype.delete = function (id) {
        return this.http.delete('http://local.sassani.com/users/' + id);
    };
    UsersService.prototype.create = function (formData) {
        var requestBody = this.getFormRequestBody(formData);
        return this.http.post('http://local.sassani.com/users', requestBody);
    };
    UsersService.prototype.getFormRequestBody = function (formData) {
        return {
            username: formData.username,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            role_list: this.getRolesFromFormData(formData.role_list),
            active: this.getValueOrDefaultIfNull(formData.active, this.constants.ACTIVE_DEFAULT),
            degree: this.getValueOrDefaultIfNull(formData.degree, this.constants.DEGREE_DEFAULT),
            position: this.getValueOrDefaultIfNull(formData.position, this.constants.POSITION_DEFAULT),
            shift_start: this.getValueOrDefaultIfNull(formData.shift_start, this.constants.SHIFT_START_DEFAULT),
            shift_end: this.getValueOrDefaultIfNull(formData.shift_ends, this.constants.SHIFT_END_DEFAULT)
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
    UsersService.prototype.getOne = function (id) {
        return this.http.get('http://local.sassani.com/users/' + id);
    };
    UsersService.prototype.getRoleFromArray = function (roles) {
        return roles[0];
    };
    UsersService.prototype.updateUser = function (id, data) {
        var requestBody = this.getFormRequestBody(data);
        return this.http.put('http://local.sassani.com/users/' + id, requestBody);
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map