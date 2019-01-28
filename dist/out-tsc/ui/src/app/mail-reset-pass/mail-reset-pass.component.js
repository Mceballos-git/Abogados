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
var MailResetPassComponent = /** @class */ (function () {
    function MailResetPassComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.isLoading = false;
        this.mailOk = false;
        this.mailNotOk = false;
        this.resetForm = new forms_1.FormGroup({
            'email': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")])
        });
    }
    MailResetPassComponent.prototype.forgotPassword = function () {
        var _this = this;
        this.isLoading = true;
        if (!this.resetForm.valid) {
            this.isLoading = false;
            return false;
        }
        // Do send mail Request
        this.authService.forgotPassword(this.resetForm.value).subscribe(function (response) { _this.handleResetSuccess(response); }, function (response) { _this.handleResetError(response); });
    };
    /**
       * Handle reset request Response Failure.
       *
       * @param response
       */
    MailResetPassComponent.prototype.handleResetSuccess = function (response) {
        this.isLoading = false;
        this.resetForm.reset();
        this.mailOk = true;
        this.mailNotOk = false;
        console.log('send mail sucesfully, redirect to login');
        //this.router.navigate(['login']);
    };
    /**
     * Handle reset request Response Failure.
     *
     * @param response
     */
    MailResetPassComponent.prototype.handleResetError = function (response) {
        this.isLoading = false;
        console.log('There was an error while trying to send email to reset pass');
        this.mailOk = false;
        this.mailNotOk = true;
        this.resetForm.reset();
    };
    MailResetPassComponent.prototype.resetError = function () {
        this.mailNotOk = false;
        this.mailOk = false;
        console.log("reserterror");
    };
    MailResetPassComponent = __decorate([
        core_1.Component({
            selector: 'app-mail-reset-pass',
            templateUrl: './mail-reset-pass.component.html',
            styleUrls: ['./mail-reset-pass.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            auth_service_1.AuthService])
    ], MailResetPassComponent);
    return MailResetPassComponent;
}());
exports.MailResetPassComponent = MailResetPassComponent;
//# sourceMappingURL=mail-reset-pass.component.js.map