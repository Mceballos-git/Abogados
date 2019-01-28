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
var clients_service_1 = require("../services/clients.service");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var ClientComponent = /** @class */ (function () {
    function ClientComponent(http, clientService) {
        this.http = http;
        this.clientService = clientService;
        this.clients = [];
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
        this.loaded = false;
    }
    ClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientService.getClientsList().subscribe(function (response) {
            _this.clients = response;
            console.log(response);
            _this.buildDtOptions(response);
            _this.loaded = true;
            _this.dtTrigger.next();
        }, function (error) {
            console.log(error);
        });
    };
    ClientComponent.prototype.buildDtOptions = function (data) {
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
    ClientComponent.prototype.ngOnDestroy = function () {
        this.dtTrigger.unsubscribe();
    };
    ClientComponent.prototype.setItemToDelete = function (index, id) {
        this.itemToDeleteData = {
            id: id,
            index: index
        };
    };
    ClientComponent.prototype.delete = function () {
        var _this = this;
        this.clientService.delete(this.itemToDeleteData.id).subscribe(function (response) {
            _this.handleDeletingSuccess(_this.itemToDeleteData);
        }, function (error) { _this.handleDeletingError(error); });
    };
    ClientComponent.prototype.handleDeletingSuccess = function (deletedItem) {
        console.log(deletedItem);
        this.clients.splice(deletedItem.index, 1);
        console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');
    };
    ClientComponent.prototype.handleDeletingError = function (response) {
        console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
    };
    ClientComponent = __decorate([
        core_1.Component({
            selector: 'app-client',
            templateUrl: './client.component.html',
            styleUrls: ['./client.component.css']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, clients_service_1.ClientsService])
    ], ClientComponent);
    return ClientComponent;
}());
exports.ClientComponent = ClientComponent;
//# sourceMappingURL=client.component.js.map