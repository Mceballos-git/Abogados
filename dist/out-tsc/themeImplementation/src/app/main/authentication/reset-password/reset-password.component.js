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
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(_fuseConfigService, _formBuilder, _userSecurityService, _dialog, _router, _activatedRoute) {
        this._fuseConfigService = _fuseConfigService;
        this._formBuilder = _formBuilder;
        this._userSecurityService = _userSecurityService;
        this._dialog = _dialog;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
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
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.resetPasswordForm = new forms_1.FormGroup({
            'reset_token': new forms_1.FormControl(this._activatedRoute.snapshot.paramMap.get('token')),
            'new_password': new forms_1.FormControl('', forms_1.Validators.required),
            'new_password_confirmation': new forms_1.FormControl()
        });
        this.resetPasswordForm.controls['new_password_confirmation'].setValidators([
            forms_1.Validators.required,
            this.checkPasswords.bind(this.resetPasswordForm)
        ]);
    };
    ResetPasswordComponent.prototype.checkPasswords = function (group) {
        var form = this;
        var newPass = form.controls.new_password.value;
        var newPassConfirm = form.controls.new_password_confirmation.value;
        return newPass === newPassConfirm ? null : { notMatch: true };
    };
    /**
     *
     * @returns {boolean}
     */
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        // Login Form is invalid abort execution.
        if (!this.resetPasswordForm.valid) {
            return false;
        }
        this.openDialog();
        // Do Login Request
        this._userSecurityService.resetPassword(this.resetPasswordForm.value).subscribe(function (response) { _this.handlePostSubmitSuccess(response); }, function (response) { _this.handlePostSubmitError(response); });
        return true;
    };
    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    ResetPasswordComponent.prototype.openDialog = function () {
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
    ResetPasswordComponent.prototype.handlePostSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        this._router.navigate(['login']);
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    ResetPasswordComponent.prototype.handlePostSubmitError = function (response) {
        this.loadingDialogRef.close();
        this.resetPasswordForm.reset();
        this.resetPasswordFailed = true;
    };
    var _a;
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: index_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, forms_1.FormBuilder,
            user_security_service_1.UserSecurityService,
            material_1.MatDialog,
            router_1.Router,
            router_1.ActivatedRoute])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map