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
var material_1 = require("@angular/material");
var LoginComponent = /** @class */ (function () {
    /**
     * Class constructor definition.
     * @param {Router} router
     * @param {AuthService} loginService
     */
    function LoginComponent(router, loginService, snackBar) {
        this.router = router;
        this.loginService = loginService;
        this.snackBar = snackBar;
        this.isLoading = false;
        this.loginOk = true;
        this.loginForm = new forms_1.FormGroup({
            'user': new forms_1.FormControl('', forms_1.Validators.required),
            'pass': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    /**
     * Handle "Sign in" button callback.
     *
     */
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        // Login Form is invalid abort execution.
        if (!this.loginForm.valid) {
            this.isLoading = false;
            return false;
        }
        // Do Login Request
        this.loginService.login(this.loginForm.value).subscribe(function (response) { _this.handleLoginSuccess(response); }, function (response) { _this.handleLoginError(response); });
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    LoginComponent.prototype.handleLoginSuccess = function (response) {
        this.isLoading = false;
        this.loginOk = true;
        console.log('logged in sucesfully, redirect to main menu');
        this.router.navigate(['menuprin']);
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    LoginComponent.prototype.handleLoginError = function (response) {
        this.isLoading = false;
        this.loginForm.reset();
        console.log('There was an error while trying to login, Reset form (done) and show error message (done)');
        this.loginOk = false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            auth_service_1.AuthService,
            material_1.MatSnackBar])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map