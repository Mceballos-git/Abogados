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
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var config_service_1 = require("../../../../@fuse/services/config.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var loading_dialog_component_1 = require("../../common/loading-dialog/loading-dialog.component");
var material_1 = require("@angular/material");
var movement_categories_service_1 = require("app/main/services/movement-categories.service");
var MovementCategoriesFormComponent = /** @class */ (function () {
    function MovementCategoriesFormComponent(_fuseConfigService, _activatedRoute, _movCatService, _dialog, _snackBar, _router) {
        this._fuseConfigService = _fuseConfigService;
        this._activatedRoute = _activatedRoute;
        this._movCatService = _movCatService;
        this._dialog = _dialog;
        this._snackBar = _snackBar;
        this._router = _router;
        this.dtTrigger = new rxjs_1.Subject();
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
    MovementCategoriesFormComponent.prototype.ngOnInit = function () {
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
    MovementCategoriesFormComponent.prototype.initCreate = function () {
        this.createForm(false);
        this.loading = false;
    };
    /**
     * Initialize form view For update.
     * @param resourceId
     */
    MovementCategoriesFormComponent.prototype.initUpdate = function (resourceId) {
        var _this = this;
        this.resourceId = this.resourceId;
        this._movCatService.getOne(resourceId).subscribe(function (response) {
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
    MovementCategoriesFormComponent.prototype.createForm = function (data) {
        var formData = this.getInitialFormData(data);
        this.form = new forms_1.FormGroup({
            'name': new forms_1.FormControl(formData.name, forms_1.Validators.required)
        });
    };
    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    MovementCategoriesFormComponent.prototype.getInitialFormData = function (data) {
        return {
            'name': data ? data.name : ''
        };
    };
    /**
     * Handles Form Submit.
     *
     */
    MovementCategoriesFormComponent.prototype.submitForm = function () {
        var _this = this;
        this.openLoadingDialog();
        if (this.action === 1) {
            this._movCatService.create(this.form.value).subscribe(function (response) {
                _this.handleSubmitSuccess(response);
            }, function (error) {
                _this.handleSubmitError(error);
            });
            return;
        }
        this._movCatService.updateMovCategories(this.res, this.form.value).subscribe(function (response) {
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
    MovementCategoriesFormComponent.prototype.openLoadingDialog = function () {
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
    MovementCategoriesFormComponent.prototype.handleSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 2) {
            this._snackBar.open('Rubro editado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/movements-categories/list']);
        }
        if (this.action === 1) {
            this._snackBar.open('Rubro creado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/movements-categories/list']);
        }
        //console.log('show success message');
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    MovementCategoriesFormComponent.prototype.handleSubmitError = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 1) {
            this._snackBar.open('Se ha producido un error al crear el rubro', '', {
                duration: 3000,
                panelClass: ['warn']
            });
        }
        if (this.action === 2) {
            this._snackBar.open('Se ha producido un error al editar el rubro', '', {
                duration: 3000,
                panelClass: ['warn']
            });
        }
        //console.log('show error');
    };
    var _a;
    MovementCategoriesFormComponent = __decorate([
        core_1.Component({
            selector: 'movement-categories-form',
            templateUrl: './movement-categories-form.component.html',
            styleUrls: ['./movement-categories-form.component.scss']
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            router_1.ActivatedRoute, typeof (_a = typeof movement_categories_service_1.MovementCategoriesService !== "undefined" && movement_categories_service_1.MovementCategoriesService) === "function" ? _a : Object, material_1.MatDialog,
            material_1.MatSnackBar,
            router_1.Router])
    ], MovementCategoriesFormComponent);
    return MovementCategoriesFormComponent;
}());
exports.MovementCategoriesFormComponent = MovementCategoriesFormComponent;
//# sourceMappingURL=movement-categories-form.component.js.map