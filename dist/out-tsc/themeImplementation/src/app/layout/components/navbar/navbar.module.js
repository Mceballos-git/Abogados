"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("@fuse/shared.module");
var navbar_component_1 = require("app/layout/components/navbar/navbar.component");
var style_1_module_1 = require("app/layout/components/navbar/horizontal/style-1/style-1.module");
var style_1_module_2 = require("app/layout/components/navbar/vertical/style-1/style-1.module");
var style_2_module_1 = require("app/layout/components/navbar/vertical/style-2/style-2.module");
var NavbarModule = /** @class */ (function () {
    function NavbarModule() {
    }
    NavbarModule = __decorate([
        core_1.NgModule({
            declarations: [
                navbar_component_1.NavbarComponent
            ],
            imports: [
                shared_module_1.FuseSharedModule,
                style_1_module_1.NavbarHorizontalStyle1Module,
                style_1_module_2.NavbarVerticalStyle1Module,
                style_2_module_1.NavbarVerticalStyle2Module
            ],
            exports: [
                navbar_component_1.NavbarComponent
            ]
        })
    ], NavbarModule);
    return NavbarModule;
}());
exports.NavbarModule = NavbarModule;
//# sourceMappingURL=navbar.module.js.map