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
var MovementsService = /** @class */ (function (_super) {
    __extends(MovementsService, _super);
    function MovementsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.constants = {
            FIELD_DEFAULTS: {
                DATETIME_DEFAULT: '',
                CONCEPT_DEFAULT: '',
                AMOUNT_DEFAULT: '',
            },
            REQUEST_MODULE: 'MOVEMENTS',
            ENDPOINT_CREATE: 'CREATE',
            ENDPOINT_UPDATE: 'UPDATE',
            ENDPOINT_LIST: 'LIST',
            ENDPOINT_GET_ONE: 'GET_ONE',
            ENDPOINT_DELETE: 'DELETE',
        };
        return _this;
    }
    MovementsService.prototype.getList = function () {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_LIST);
        var headers = this.getRequestOptions(true);
        return this.http.get(url, headers);
    };
    MovementsService.prototype.getOne = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_GET_ONE);
        var headers = this.getRequestOptions(true);
        url = url.replace(':id', id);
        return this.http.get(url, headers);
    };
    MovementsService.prototype.delete = function (id) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_DELETE);
        console.log(url);
        url = url.replace(':id', id);
        console.log(url);
        var headers = this.getRequestOptions(true);
        return this.http.delete(url, headers);
    };
    MovementsService.prototype.create = function (formData) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_CREATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(formData);
        return this.http.post(url, requestBody, headers);
    };
    MovementsService.prototype.update = function (id, data) {
        var url = this.getURL(this.constants.REQUEST_MODULE, this.constants.ENDPOINT_UPDATE);
        var headers = this.getRequestOptions(true);
        var requestBody = this.getFormRequestBody(data);
        url = url.replace(':id', id);
        return this.http.put(url, requestBody, headers);
    };
    MovementsService.prototype.getFormRequestBody = function (formData) {
        return {
            datetime: formData.datetime,
            amount: formData.amount,
            movement_type_id: formData.movement_type_id,
            movement_category_id: formData.movement_category_id,
            client_id: formData.client_id,
            concept: this.getValueOrDefaultIfNull(formData.concept, this.constants.FIELD_DEFAULTS.CONCEPT_DEFAULT),
        };
    };
    /**
       * Returns value if provided or default
       *
       * @param value
       * @param defaultValue
       * @returns {any}
       */
    MovementsService.prototype.getValueOrDefaultIfNull = function (value, defaultValue) {
        return value ? value : defaultValue;
    };
    MovementsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MovementsService);
    return MovementsService;
}(request_helper_service_1.RequestHelperService));
exports.MovementsService = MovementsService;
//# sourceMappingURL=movements.service.js.map