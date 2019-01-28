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
var users_service_1 = require("../../services/users.service");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var generic_dialog_component_1 = require("../../common/generic-dialog/generic-dialog.component");
var config_service_1 = require("@fuse/services/config.service");
var user_security_service_1 = require("app/main/services/user-security.service");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(_usersService, _dialog, _fuseConfigService, _userSecurityService, _snackBar) {
        this._usersService = _usersService;
        this._dialog = _dialog;
        this._fuseConfigService = _fuseConfigService;
        this._userSecurityService = _userSecurityService;
        this._snackBar = _snackBar;
        this.displayedColumns = ['id', 'username', 'first_name', 'last_name', 'active', 'actions'];
        this.dtTrigger = new rxjs_1.Subject();
        this.loaded = false;
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
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._usersService.getUsersList().subscribe(function (response) {
            _this.users = response;
            _this.loaded = true;
            // Assign the data to the data source for the table to render
            _this.dataSource = new material_1.MatTableDataSource(_this.users);
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
    UserListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    UserListComponent.prototype.openDeleteDialog = function (index, deleteRowItem) {
        var _this = this;
        var title = 'Eliminar Operador';
        var content = 'Estas por Eliminar al Operador: {row.first_name}, Deseas continuar?';
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
    UserListComponent.prototype.delete = function (index, deleteRowItem) {
        var _this = this;
        this._usersService.delete(deleteRowItem.id).subscribe(function (response) {
            _this.handleDeletingSuccess(index);
        }, function (error) {
            _this.handleDeletingError(error);
        });
    };
    /**
     * Update DataSource so entries get deleted from view.
     */
    UserListComponent.prototype.updateDataSource = function () {
        this.dataSource.data = this.users;
    };
    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    UserListComponent.prototype.handleDeletingSuccess = function (deletedItemIndex) {
        this.users.splice(deletedItemIndex, 1);
        this.updateDataSource();
        console.log('Delete user successfuly. Todo: Mostrar mensaje delete exitoso');
        this._snackBar.open('Operador eliminado correctamente', '', {
            duration: 4000,
            panelClass: ['green']
        });
    };
    /**
     * Handle deletion process errors.
     * @param response
     */
    UserListComponent.prototype.handleDeletingError = function (response) {
        console.log('There was an error while trying to delete user. Todo: Mostrar mensaje delete no exitoso');
        this._snackBar.open('Se ha producido un error al eliminar el operador', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    };
    UserListComponent.prototype.activate = function (id, index) {
        var _this = this;
        this._userSecurityService.activate(id).subscribe(function (response) {
            console.log('user activated ok');
            _this.users[index].active = 1;
            _this.updateDataSource();
        }, function (error) {
            console.log(error);
        });
    };
    UserListComponent.prototype.deactivate = function (id, index) {
        var _this = this;
        this._userSecurityService.deactivate(id).subscribe(function (response) {
            console.log('user deactivated ok');
            _this.users[index].active = 0;
            _this.updateDataSource();
        }, function (error) {
            console.log(error);
        });
    };
    var _a, _b;
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], UserListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], UserListComponent.prototype, "sort", void 0);
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            styleUrls: ['user-list.component.scss'],
            templateUrl: 'user-list.component.html',
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            material_1.MatDialog, typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, typeof (_b = typeof user_security_service_1.UserSecurityService !== "undefined" && user_security_service_1.UserSecurityService) === "function" ? _b : Object, material_1.MatSnackBar])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map