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
var ClientsService = /** @class */ (function (_super) {
    __extends(ClientsService, _super);
    function ClientsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constants = {
            FIELD_DEFAULTS: {
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
            },
            REQUEST_MODULE: 'CLIENTS',
            ENDPOINT_CREATE: 'CREATE',
            ENDPOINT_UPDATE: 'UPDATE',
            ENDPOINT_LIST: 'LIST',
            ENDPOINT_GET_ONE: 'GET_ONE',
            ENDPOINT_DELETE: 'DELETE',
            ENDPOINT_ACTIVATE: 'ACTIVATE',
            ENDPOINT_DEACTIVATE: 'DEACTIVATE',
        };
        return _this;
    }
    ClientsService.prototype.getClientsList = function () {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        var headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
    };
    ClientsService.prototype.getOne = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_GET_ONE);
        var headers = this.getRequestOptions(true);
        url = url.replace(':id', id);
        return this.http.get(url, headers);
    };
    ClientsService.prototype.delete = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DELETE);
        console.log(url);
        url = url.replace(':id', id);
        console.log(url);
        var headers = this.getRequestOptions(true);
        return this.http.delete(url, headers);
    };
    ClientsService.prototype.create = function (formData) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(formData);
        return this.http.post(url, requestBody, headers);
    };
    ClientsService.prototype.update = function (id, data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(data);
        url = url.replace(':id', id);
        return this.http.put(url, requestBody, headers);
    };
    ClientsService.prototype.activate = function (data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_ACTIVATE);
        var headers = this.getRequestOptions(true);
        var requestBody = {
            client_id: data
        };
        return this.http.post(url, requestBody, headers);
    };
    ClientsService.prototype.deactivate = function (data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DEACTIVATE);
        var headers = this.getRequestOptions(true);
        var requestBody = {
            client_id: data
        };
        return this.http.post(url, requestBody, headers);
    };
    ClientsService.prototype.getFormRequestBody = function (formData) {
        return {
            first_name: formData.first_name,
            last_name: formData.last_name,
            identification_type: formData.identification_type,
            identification_number: formData.identification_number,
            date_of_birth: formData.date_of_birth,
            phone_number: formData.phone_number,
            street_address: formData.street_address,
            number_address: formData.number_address,
            nationality: this.getValueOrDefaultIfNull(formData.nationality, this.constants.FIELD_DEFAULTS.NATIONALITY_DEFAULT),
            tin_number: this.getValueOrDefaultIfNull(formData.tin_number, this.constants.FIELD_DEFAULTS.TIN_NUMBER_DEFAULT),
            email: this.getValueOrDefaultIfNull(formData.email, this.constants.FIELD_DEFAULTS.EMAIL_DEFAULT),
            floor_address: this.getValueOrDefaultIfNull(formData.floor_address, this.constants.FIELD_DEFAULTS.FLOOR_ADDRESS_DEFAULT),
            department_address: this.getValueOrDefaultIfNull(formData.department_address, this.constants.FIELD_DEFAULTS.DEPARTMENT_ADDRESS_DEFAULT),
            country: this.getValueOrDefaultIfNull(formData.country, this.constants.FIELD_DEFAULTS.COUNTRY_DEFAULT),
            state: this.getValueOrDefaultIfNull(formData.state, this.constants.FIELD_DEFAULTS.STATE_DEFAULT),
            city: this.getValueOrDefaultIfNull(formData.city, this.constants.FIELD_DEFAULTS.CITY_DEFAULT),
            observations: this.getValueOrDefaultIfNull(formData.observations, this.constants.FIELD_DEFAULTS.OBSERVATIONS_DEFAULT),
            active: this.getValueOrDefaultIfNull(formData.active, this.constants.FIELD_DEFAULTS.ACTIVE_DEFAULT)
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
        })
    ], ClientsService);
    return ClientsService;
}(request_helper_service_1.RequestHelperService));
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map