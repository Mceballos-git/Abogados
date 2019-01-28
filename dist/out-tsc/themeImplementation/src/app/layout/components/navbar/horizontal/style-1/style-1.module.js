"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var components_1 = require("@fuse/components");
var shared_module_1 = require("@fuse/shared.module");
var style_1_component_1 = require("app/layout/components/navbar/horizontal/style-1/style-1.component");
var NavbarHorizontalStyle1Module = /** @class */ (function () {
    function NavbarHorizontalStyle1Module() {
    }
    NavbarHorizontalStyle1Module = __decorate([
        core_1.NgModule({
            declarations: [
                style_1_component_1.NavbarHorizontalStyle1Component
            ],
            imports: [
                material_1.MatButtonModule,
                material_1.MatIconModule,
                shared_module_1.FuseSharedModule,
                components_1.FuseNavigationModule
            ],
            exports: [
                style_1_component_1.NavbarHorizontalStyle1Component
            ]
        })
    ], NavbarHorizontalStyle1Module);
    return NavbarHorizontalStyle1Module;
}());
exports.NavbarHorizontalStyle1Module = NavbarHorizontalStyle1Module;
//# sourceMappingURL=style-1.module.js.map