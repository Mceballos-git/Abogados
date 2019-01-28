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
var users_service_1 = require("../services/users.service");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(http, userService) {
        this.http = http;
        this.userService = userService;
        this.users = [];
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.loaded = false;
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsersList().subscribe(function (response) {
            _this.users = response;
            console.log(response);
            _this.buildDtOptions(response);
            _this.loaded = true;
            _this.dtTrigger.next();
        }, function (error) {
            console.log(error);
        });
    };
    UsersComponent.prototype.buildDtOptions = function (data) {
        this.dtOptions = {
            language: {
                processing: 'Procesando...',
                lengthMenu: "Mostrar _MENU_ registros",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "Ningún dato disponible en esta tabla",
                info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                infoFiltered: "(filtrado de un total de _MAX_ registros)",
                infoPostFix: "",
                search: "Buscar:",
                url: "",
                thousands: ",",
                loadingRecords: "Cargando...",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                },
                aria: {
                    sortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            },
            pagingType: 'full_numbers',
        };
    };
    UsersComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    UsersComponent.prototype.setItemToDelete = function (index, id) {
        this.itemToDeleteData = {
            id: id,
            index: index
        };
    };
    UsersComponent.prototype.delete = function () {
        var _this = this;
        this.userService.delete(this.itemToDeleteData.id).subscribe(function (response) {
            _this.handleDeletingSuccess(_this.itemToDeleteData);
        }, function (error) { _this.handleDeletingError(error); });
    };
    UsersComponent.prototype.handleDeletingSuccess = function (deletedItem) {
        console.log(deletedItem);
        this.users.splice(deletedItem.index, 1);
        console.log('Delete user successfuly. Todo: Mostrar mensaje delete exitoso');
    };
    UsersComponent.prototype.handleDeletingError = function (response) {
        console.log('There was an error while trying to delete user. Todo: Mostrar mensaje delete no exitoso');
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, users_service_1.UsersService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map