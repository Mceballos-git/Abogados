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
var user_form_component_1 = require("./user-form.component");
var material_1 = require("@angular/material");
var shared_module_1 = require("@fuse/shared.module");
var loading_dialog_component_1 = require("../../common/loading-dialog/loading-dialog.component");
// import {Mat}
var UserFormModule = /** @class */ (function () {
    function UserFormModule() {
    }
    UserFormModule = __decorate([
        core_1.NgModule({
            declarations: [
                user_form_component_1.UserFormComponent,
            ],
            imports: [
                router_1.RouterModule,
                material_1.MatCardModule,
                material_1.MatButtonModule,
                material_1.MatGridListModule,
                material_1.MatCheckboxModule,
                material_1.MatFormFieldModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                shared_module_1.FuseSharedModule,
                material_1.MatSelectModule, material_1.MatSnackBarModule
            ],
            exports: [
                user_form_component_1.UserFormComponent
            ],
            entryComponents: [
                loading_dialog_component_1.LoadingDialogComponent
            ]
        })
    ], UserFormModule);
    return UserFormModule;
}());
exports.UserFormModule = UserFormModule;
//# sourceMappingURL=user-form.module.js.map