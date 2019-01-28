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
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var forms_1 = require("@angular/forms");
var ResetPassComponent = /** @class */ (function () {
    /**
     * Class constructor definition.
     * @param {Router} router
     * @param {AuthService} authService
     */
    function ResetPassComponent(router, activatedRoute, authService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.isLoading = false;
        this.resetOk = true;
        console.log(this.activatedRoute.snapshot.paramMap.get('token'));
        this.resetForm = new forms_1.FormGroup({
            'token': new forms_1.FormControl(this.activatedRoute.snapshot.paramMap.get('token')),
            'newPassword': new forms_1.FormControl('', forms_1.Validators.required),
            'newPassConfirm': new forms_1.FormControl()
        });
        this.resetForm.controls['newPassConfirm'].setValidators([
            forms_1.Validators.required,
            this.checkPasswords.bind(this.resetForm)
        ]);
    }
    ResetPassComponent.prototype.checkPasswords = function (group) {
        var form = this;
        if (group.value !== form.controls['newPassword'].value) {
            return { notMatch: true };
        }
        return null;
    };
    ResetPassComponent.prototype.resetPassword = function () {
        var _this = this;
        this.isLoading = true;
        if (!this.resetForm.valid) {
            this.isLoading = false;
            return false;
        }
        // Do send mail Request
        this.authService.resetPassword(this.resetForm.value).subscribe(function (response) { _this.handleResetSuccess(response); }, function (response) { _this.handleResetError(response); });
    };
    ResetPassComponent.prototype.handleResetSuccess = function (response) {
        this.isLoading = false;
        this.resetForm.reset();
        console.log('reset password sucesfully, redirect to login');
        this.router.navigate(['login']);
    };
    /**
     * Handle reset request Response Failure.
     *
     * @param response
     */
    ResetPassComponent.prototype.handleResetError = function (response) {
        this.isLoading = false;
        console.log('There was an error while trying to reset pass');
        /**
       * Poner mensaje de error!!
       *
       *
       */
        this.resetForm.reset();
    };
    ResetPassComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-pass',
            templateUrl: './reset-pass.component.html',
            styleUrls: ['./reset-pass.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            auth_service_1.AuthService])
    ], ResetPassComponent);
    return ResetPassComponent;
}());
exports.ResetPassComponent = ResetPassComponent;
//# sourceMappingURL=reset-pass.component.js.map