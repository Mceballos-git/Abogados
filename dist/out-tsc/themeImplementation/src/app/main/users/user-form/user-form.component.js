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
var users_service_1 = require("../../services/users.service");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var config_service_1 = require("../../../../@fuse/services/config.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var loading_dialog_component_1 = require("../../common/loading-dialog/loading-dialog.component");
var material_1 = require("@angular/material");
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(_fuseConfigService, _activatedRoute, _userService, _dialog, _snackBar, _router) {
        this._fuseConfigService = _fuseConfigService;
        this._activatedRoute = _activatedRoute;
        this._userService = _userService;
        this._dialog = _dialog;
        this._snackBar = _snackBar;
        this._router = _router;
        this.dtTrigger = new rxjs_1.Subject();
        // Constants.
        this.DEFAULT_ROLE_VALUE = 'operator';
        // Selectable Role Values
        this.roles = [
            { value: 'admin', text: 'Administrador' },
            { value: 'operator', text: 'Operador' },
        ];
        //hours
        this.hours = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
            '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
            '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', '24:30'
        ];
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
        this.loading = true;
    }
    //snackbar
    // openSnackBar(message: string, action:string) {
    //     this._snackBar.open(message,  action,{
    //       duration: 3000,
    //       panelClass: ['green-snackbar']
    //     });
    // }
    UserFormComponent.prototype.ngOnInit = function () {
        this.actionString = this._activatedRoute.snapshot.url[1].path;
        this.action = this.actionString === 'create' ? 1 : 2;
        if (this.action === 2) {
            this.res = this._activatedRoute.snapshot.paramMap.get('id');
            return this.initUpdate(this.res);
        }
        return this.initCreate();
    };
    /**
     * Initialize Form View For Create.
     */
    UserFormComponent.prototype.initCreate = function () {
        this.createForm(false);
        this.loading = false;
    };
    /**
     * Initialize form view For update.
     * @param resourceId
     */
    UserFormComponent.prototype.initUpdate = function (resourceId) {
        var _this = this;
        this.resourceId = this.resourceId;
        this._userService.getOne(resourceId).subscribe(function (response) {
            _this.resource = response;
            _this.createForm(response);
            _this.loading = false;
            _this.dtTrigger.next();
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Creates Form.
     *
     * @param data
     */
    UserFormComponent.prototype.createForm = function (data) {
        var formData = this.getInitialFormData(data);
        this.form = new forms_1.FormGroup({
            'first_name': new forms_1.FormControl(formData.first_name, forms_1.Validators.required),
            'last_name': new forms_1.FormControl(formData.last_name, forms_1.Validators.required),
            'username': new forms_1.FormControl(formData.username, forms_1.Validators.required),
            'email': new forms_1.FormControl(formData.email, [forms_1.Validators.required, forms_1.Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")]),
            'role': new forms_1.FormControl(formData.role, forms_1.Validators.required),
            'active': new forms_1.FormControl(formData.active),
            'degree': new forms_1.FormControl(formData.degree),
            'position': new forms_1.FormControl(formData.position),
            'shift_start': new forms_1.FormControl(formData.shift_start),
            'shift_end': new forms_1.FormControl(formData.shift_end)
        });
    };
    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    UserFormComponent.prototype.getInitialFormData = function (data) {
        return {
            'first_name': data ? data.first_name : '',
            'last_name': data ? data.last_name : '',
            'username': data ? data.username : '',
            'email': data ? data.email : '',
            'role': data ? this.getRole(data.role_list) : this.DEFAULT_ROLE_VALUE,
            'active': data ? data.active : '',
            'degree': data ? data.degree : '',
            'position': data ? data.position : '',
            'shift_start': data ? data.shift_start : '',
            'shift_end': data ? data.shift_end : '',
        };
    };
    /**
     * Get Role
     *
     * @param roleArray
     * @returns {any}
     */
    UserFormComponent.prototype.getRole = function (roleArray) {
        return roleArray ? roleArray[0] : this.DEFAULT_ROLE_VALUE;
    };
    /**
     * Handles Form Submit.
     *
     */
    UserFormComponent.prototype.submitForm = function () {
        var _this = this;
        this.openLoadingDialog();
        if (this.action === 1) {
            this._userService.create(this.form.value).subscribe(function (response) {
                _this.handleSubmitSuccess(response);
            }, function (error) {
                _this.handleSubmitError(error);
            });
            return;
        }
        this._userService.update(this.res, this.form.value).subscribe(function (response) {
            _this.handleSubmitSuccess(response);
        }, function (error) {
            _this.handleSubmitError(error);
            return;
        });
    };
    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    UserFormComponent.prototype.openLoadingDialog = function () {
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.loadingDialogRef = this._dialog.open(loading_dialog_component_1.LoadingDialogComponent, dialogConfig);
    };
    /**
     * Handle Login request Response Success.
     *
     * @param response
     */
    UserFormComponent.prototype.handleSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 2) {
            this._snackBar.open('Usuario editado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
        }
        if (this.action === 1) {
            this._snackBar.open('Usuario creado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
        }
        this._router.navigate(['/users/list']);
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    UserFormComponent.prototype.handleSubmitError = function (response) {
        this.loadingDialogRef.close();
        this._snackBar.open('Se ha producido un error al editar el usuario', '', {
            duration: 3000,
            panelClass: ['warn']
        });
        console.log('show error');
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.scss']
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            router_1.ActivatedRoute,
            users_service_1.UsersService,
            material_1.MatDialog,
            material_1.MatSnackBar,
            router_1.Router])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map