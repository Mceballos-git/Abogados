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
var material_1 = require("@angular/material");
var clients_service_1 = require("app/main/services/clients.service");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var config_service_1 = require("@fuse/services/config.service");
var generic_dialog_component_1 = require("app/main/common/generic-dialog/generic-dialog.component");
var ClientListComponent = /** @class */ (function () {
    function ClientListComponent(_clientsService, _fuseConfigService, _dialog, _snackBar) {
        this._clientsService = _clientsService;
        this._fuseConfigService = _fuseConfigService;
        this._dialog = _dialog;
        this._snackBar = _snackBar;
        this.displayedColumns = ['last_name', 'first_name', 'identification_number', 'city', 'email', 'actions'];
        this.dtTrigger = new rxjs_1.Subject();
        this.loaded = false;
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: false
                }
            }
        };
    }
    ClientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._clientsService.getClientsList().subscribe(function (response) {
            _this.clients = response;
            _this.loaded = true;
            // Assign the data to the data source for the table to render
            _this.dataSource = new material_1.MatTableDataSource(_this.clients);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
            _this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
                if (length == 0 || pageSize == 0) {
                    return "0 de " + length;
                }
                length = Math.max(length, 0);
                var startIndex = page * pageSize;
                var endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
                return startIndex + 1 + " - " + endIndex + " de " + length;
            };
            _this.dtTrigger.next();
        }, function (error) {
            console.log(error);
        });
    };
    ClientListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ClientListComponent.prototype.openDeleteDialog = function (index, deleteRowItem) {
        var _this = this;
        var title = 'Eliminar Cliente';
        var content = 'Estas por Eliminar al Cliente: {row.first_name}, Deseas continuar?';
        content = content.replace('{row.first_name}', deleteRowItem.first_name);
        var dialogRef = this._dialog.open(generic_dialog_component_1.GenericDialogComponent, {
            data: { title: title, content: content }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.delete(index, deleteRowItem);
            }
        });
    };
    ClientListComponent.prototype.delete = function (index, deleteRowItem) {
        var _this = this;
        this._clientsService.delete(deleteRowItem.id).subscribe(function (response) {
            _this.handleDeletingSuccess(index);
        }, function (error) { _this.handleDeletingError(error); });
    };
    /**
     * Update DataSource so entries get deleted from view.
     */
    ClientListComponent.prototype.updateDataSource = function () {
        this.dataSource.data = this.clients;
    };
    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    ClientListComponent.prototype.handleDeletingSuccess = function (deletedItemIndex) {
        this.clients.splice(deletedItemIndex, 1);
        this.updateDataSource();
        console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');
        this._snackBar.open('Cliente eliminado correctamente', '', {
            duration: 4000,
            panelClass: ['green']
        });
    };
    /**
     * Handle deletion process errors.
     * @param response
     */
    ClientListComponent.prototype.handleDeletingError = function (response) {
        console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
        this._snackBar.open('Se ha producido un error al eliminar el cliente', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    };
    ClientListComponent.prototype.activate = function (id, index) {
        var _this = this;
        this._clientsService.activate(id).subscribe(function (response) {
            console.log('client activated ok');
            _this.clients[index].active = 1;
            _this.updateDataSource();
        }, function (error) {
            console.log(error);
        });
    };
    ClientListComponent.prototype.deactivate = function (id, index) {
        var _this = this;
        this._clientsService.deactivate(id).subscribe(function (response) {
            console.log('client deactivated ok');
            _this.clients[index].active = 0;
            _this.updateDataSource();
        }, function (error) {
            console.log(error);
        });
    };
    var _a, _b;
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ClientListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ClientListComponent.prototype, "sort", void 0);
    ClientListComponent = __decorate([
        core_1.Component({
            selector: 'client-list',
            styleUrls: ['./client-list.component.scss'],
            templateUrl: './client-list.component.html',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _a : Object, typeof (_b = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _b : Object, material_1.MatDialog,
            material_1.MatSnackBar])
    ], ClientListComponent);
    return ClientListComponent;
}());
exports.ClientListComponent = ClientListComponent;
//# sourceMappingURL=client-list.component.js.map