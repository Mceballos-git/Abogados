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
var MovementsCategoriesService = /** @class */ (function () {
    function MovementsCategoriesService(http) {
        this.http = http;
    }
    MovementsCategoriesService.prototype.getMovementsCategoriesList = function () {
        return this.http.get('http://local.sassani.com/rubros');
    };
    MovementsCategoriesService.prototype.delete = function (id) {
        return this.http.delete('http://local.sassani.com/rubros/' + id);
    };
    MovementsCategoriesService.prototype.create = function (name) {
        var requestBody = { name: name.new_mov_category };
        return this.http.post('http://local.sassani.com/rubros', requestBody);
    };
    MovementsCategoriesService.prototype.edit = function (data, id) {
        var requestBody = { name: data.name_mov_category };
        console.log(id, requestBody);
        return this.http.put('http://local.sassani.com/rubros/' + id, requestBody);
    };
    MovementsCategoriesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MovementsCategoriesService);
    return MovementsCategoriesService;
}());
exports.MovementsCategoriesService = MovementsCategoriesService;
//# sourceMappingURL=movements-categories.service.js.map