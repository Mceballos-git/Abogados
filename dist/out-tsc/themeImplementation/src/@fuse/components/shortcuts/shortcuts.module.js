"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var shortcuts_component_1 = require("./shortcuts.component");
var FuseShortcutsModule = /** @class */ (function () {
    function FuseShortcutsModule() {
    }
    FuseShortcutsModule = __decorate([
        core_1.NgModule({
            declarations: [
                shortcuts_component_1.FuseShortcutsComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                flex_layout_1.FlexLayoutModule,
                material_1.MatButtonModule,
                material_1.MatDividerModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatMenuModule,
                material_1.MatListModule,
                material_1.MatTooltipModule
            ],
            exports: [
                shortcuts_component_1.FuseShortcutsComponent
            ],
            providers: [
                ngx_cookie_service_1.CookieService
            ]
        })
    ], FuseShortcutsModule);
    return FuseShortcutsModule;
}());
exports.FuseShortcutsModule = FuseShortcutsModule;
//# sourceMappingURL=shortcuts.module.js.map