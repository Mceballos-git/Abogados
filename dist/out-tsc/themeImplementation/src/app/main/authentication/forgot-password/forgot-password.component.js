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
var forms_1 = require("@angular/forms");
var config_service_1 = require("@fuse/services/config.service");
var index_1 = require("@fuse/animations/index");
var user_security_service_1 = require("../../services/user-security.service");
var material_1 = require("@angular/material");
var loading_dialog_component_1 = require("../../common/loading-dialog/loading-dialog.component");
var router_1 = require("@angular/router");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(_fuseConfigService, _formBuilder, _userSecurityService, _dialog, _router) {
        this._fuseConfigService = _fuseConfigService;
        this._formBuilder = _formBuilder;
        this._userSecurityService = _userSecurityService;
        this._dialog = _dialog;
        this._router = _router;
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
    /**
     * On init
     */
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]]
        });
    };
    /**
     *
     * @returns {boolean}
     */
    ForgotPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        // Login Form is invalid abort execution.
        if (!this.forgotPasswordForm.valid) {
            return false;
        }
        this.openDialog();
        // Do Login Request
        this._userSecurityService.forgotPassword(this.forgotPasswordForm.value).subscribe(function (response) { _this.handlePostSubmitSuccess(response); }, function (response) { _this.handlePostSubmitError(response); });
        return true;
    };
    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    ForgotPasswordComponent.prototype.openDialog = function () {
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.loadingDialogRef = this._dialog.open(loading_dialog_component_1.LoadingDialogComponent, dialogConfig);
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    ForgotPasswordComponent.prototype.handlePostSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        this._router.navigate(['forgot-password-sent']);
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    ForgotPasswordComponent.prototype.handlePostSubmitError = function (response) {
        this.loadingDialogRef.close();
        this.forgotPasswordForm.reset();
        this.forgotPasswordFailed = true;
    };
    var _a;
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: index_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, forms_1.FormBuilder,
            user_security_service_1.UserSecurityService,
            material_1.MatDialog,
            router_1.Router])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map