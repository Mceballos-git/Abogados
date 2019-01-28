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
var TurnsService = /** @class */ (function () {
    function TurnsService(http) {
        this.http = http;
        this.constants = {
            CLIENT_ID_DEFAULT: 0,
            GIVEN_USER_ID_DEFAULT: 0,
            ATTENTION_USER_ID_DEFAULT: 0,
            OFFICE_ID_DEFAULT: 0,
            REGISTER_DATE_DEFAULT: '',
            TURN_DATE_DEFAULT: '',
            TURN_TIME_START_DEFAULT: '',
            TURN_TIME_END_DEFAULT: '',
            PHONE_NUMBER_REF_DEFAULT: '',
            PRIORITY_DEFAULT: '',
            TITLE_DEFAULT: '',
            ACTIVE_DEFAULT: true
        };
    }
    TurnsService.prototype.getOffices = function () {
        return this.http.get('http://local.sassani.com/offices');
    };
    TurnsService.prototype.create = function (data) {
        var requestBody = this.getFormRequestBody(data);
        return this.http.post('http://local.sassani.com/turns', requestBody);
    };
    TurnsService.prototype.updateTurn = function (id, data) {
        var requestBody = this.getFormRequestBody(data);
        return this.http.put('http://local.sassani.com/turns/' + id, requestBody);
    };
    TurnsService.prototype.getOne = function (id) {
        return this.http.get('http://local.sassani.com/turns/' + id);
    };
    TurnsService.prototype.getTurnsList = function () {
        return this.http.get('http://local.sassani.com/turns');
    };
    TurnsService.prototype.delete = function (id) {
        return this.http.delete('http://local.sassani.com/turns/' + id);
    };
    TurnsService.prototype.getFormRequestBody = function (formData) {
        return {
            client_id: formData.username,
            given_user_id: formData.email,
            attention_user_id: formData.first_name,
            office_id: formData.last_name,
            register_date: this.getValueOrDefaultIfNull(formData.register_date, this.constants.REGISTER_DATE_DEFAULT),
            turn_date: this.getValueOrDefaultIfNull(formData.turn_date, this.constants.TURN_DATE_DEFAULT),
            turn_time_start: this.getValueOrDefaultIfNull(formData.turn_time_start, this.constants.TURN_TIME_START_DEFAULT),
            turn_time_end: this.getValueOrDefaultIfNull(formData.turn_time_end, this.constants.TURN_TIME_END_DEFAULT),
            phone_number_ref: this.getValueOrDefaultIfNull(formData.phone_number_ref, this.constants.PHONE_NUMBER_REF_DEFAULT),
            priority: this.getValueOrDefaultIfNull(formData.priority, this.constants.PRIORITY_DEFAULT),
            title: this.getValueOrDefaultIfNull(formData.title, this.constants.TITLE_DEFAULT),
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
    TurnsService.prototype.getValueOrDefaultIfNull = function (value, defaultValue) {
        return value ? value : defaultValue;
    };
    TurnsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], TurnsService);
    return TurnsService;
}());
exports.TurnsService = TurnsService;
//# sourceMappingURL=turns.service.js.map