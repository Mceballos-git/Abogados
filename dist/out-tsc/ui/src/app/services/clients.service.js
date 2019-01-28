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
var ClientsService = /** @class */ (function () {
    function ClientsService(http) {
        this.http = http;
        this.constants = {
            CLIENT_ID_DEFAULT: '',
            NATIONALITY_DEFAULT: '',
            TIN_NUMBER_DEFAULT: '',
            EMAIL_DEFAULT: '',
            FLOOR_ADDRESS_DEFAULT: '',
            DEPARTMENT_ADDRESS_DEFAULT: '',
            COUNTRY_DEFAULT: '',
            STATE_DEFAULT: '',
            CITY_DEFAULT: '',
            OBSERVATIONS_DEFAULT: '',
            ACTIVE_DEFAULT: true
        };
    }
    ClientsService.prototype.create = function (data) {
        var requestBody = this.getFormRequestBody(data);
        ;
        return this.http.post('http://local.sassani.com/clients', requestBody);
    };
    ClientsService.prototype.getOne = function (id) {
        return this.http.get('http://local.sassani.com/clients/' + id);
    };
    ClientsService.prototype.updateUser = function (id, data) {
        var requestBody = this.getFormRequestBody(data);
        return this.http.put('http://local.sassani.com/clients/' + id, requestBody);
    };
    ClientsService.prototype.getClientsList = function () {
        return this.http.get('http://local.sassani.com/clients');
    };
    ClientsService.prototype.delete = function (id) {
        return this.http.delete('http://local.sassani.com/clients/' + id);
    };
    ClientsService.prototype.getFormRequestBody = function (formData) {
        return {
            nationality: this.getValueOrDefaultIfNull(formData.nationality, this.constants.NATIONALITY_DEFAULT),
            tin_number: this.getValueOrDefaultIfNull(formData.tin_number, this.constants.TIN_NUMBER_DEFAULT),
            email: this.getValueOrDefaultIfNull(formData.email, this.constants.EMAIL_DEFAULT),
            floor_address: this.getValueOrDefaultIfNull(formData.floor_address, this.constants.FLOOR_ADDRESS_DEFAULT),
            department_address: this.getValueOrDefaultIfNull(formData.department_address, this.constants.DEPARTMENT_ADDRESS_DEFAULT),
            country: this.getValueOrDefaultIfNull(formData.country, this.constants.COUNTRY_DEFAULT),
            state: this.getValueOrDefaultIfNull(formData.state, this.constants.STATE_DEFAULT),
            city: this.getValueOrDefaultIfNull(formData.city, this.constants.CITY_DEFAULT),
            active: this.getValueOrDefaultIfNull(formData.active, this.constants.ACTIVE_DEFAULT)
        };
    };
    /**
    * Returns value if provided or default
    *
    * @param value
    * @param defaultValue
    * @returns {any}
    */
    ClientsService.prototype.getValueOrDefaultIfNull = function (value, defaultValue) {
        return value ? value : defaultValue;
    };
    ClientsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ClientsService);
    return ClientsService;
}());
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map