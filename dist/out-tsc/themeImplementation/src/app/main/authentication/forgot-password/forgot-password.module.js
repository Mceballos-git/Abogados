"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var shared_module_1 = require("@fuse/shared.module");
var forgot_password_component_1 = require("app/main/authentication/forgot-password/forgot-password.component");
var material_2 = require("@angular/material");
var routes = [{
        path: 'auth/forgot-password',
        component: forgot_password_component_1.ForgotPasswordComponent
    }
];
var ForgotPasswordModule = /** @class */ (function () {
    function ForgotPasswordModule() {
    }
    ForgotPasswordModule = __decorate([
        core_1.NgModule({
            declarations: [
                forgot_password_component_1.ForgotPasswordComponent
            ],
            imports: [
                router_1.RouterModule.forChild(routes),
                material_1.MatButtonModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                shared_module_1.FuseSharedModule,
                material_2.MatDialogModule
            ]
        })
    ], ForgotPasswordModule);
    return ForgotPasswordModule;
}());
exports.ForgotPasswordModule = ForgotPasswordModule;
//# sourceMappingURL=forgot-password.module.js.map