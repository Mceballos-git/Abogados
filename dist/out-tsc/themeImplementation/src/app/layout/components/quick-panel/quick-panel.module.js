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
var shared_module_1 = require("@fuse/shared.module");
var quick_panel_component_1 = require("app/layout/components/quick-panel/quick-panel.component");
var QuickPanelModule = /** @class */ (function () {
    function QuickPanelModule() {
    }
    QuickPanelModule = __decorate([
        core_1.NgModule({
            declarations: [
                quick_panel_component_1.QuickPanelComponent
            ],
            imports: [
                material_1.MatDividerModule,
                material_1.MatListModule,
                material_1.MatSlideToggleModule,
                shared_module_1.FuseSharedModule,
            ],
            exports: [
                quick_panel_component_1.QuickPanelComponent
            ]
        })
    ], QuickPanelModule);
    return QuickPanelModule;
}());
exports.QuickPanelModule = QuickPanelModule;
//# sourceMappingURL=quick-panel.module.js.map