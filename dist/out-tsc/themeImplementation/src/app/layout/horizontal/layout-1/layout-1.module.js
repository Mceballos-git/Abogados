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
var content_module_1 = require("app/layout/components/content/content.module");
var footer_module_1 = require("app/layout/components/footer/footer.module");
var navbar_module_1 = require("app/layout/components/navbar/navbar.module");
var quick_panel_module_1 = require("app/layout/components/quick-panel/quick-panel.module");
var toolbar_module_1 = require("app/layout/components/toolbar/toolbar.module");
var layout_1_component_1 = require("app/layout/horizontal/layout-1/layout-1.component");
var HorizontalLayout1Module = /** @class */ (function () {
    function HorizontalLayout1Module() {
    }
    HorizontalLayout1Module = __decorate([
        core_1.NgModule({
            declarations: [
                layout_1_component_1.HorizontalLayout1Component
            ],
            imports: [
                material_1.MatSidenavModule,
                shared_module_1.FuseSharedModule,
                components_1.FuseSidebarModule,
                components_1.FuseThemeOptionsModule,
                content_module_1.ContentModule,
                footer_module_1.FooterModule,
                navbar_module_1.NavbarModule,
                quick_panel_module_1.QuickPanelModule,
                toolbar_module_1.ToolbarModule
            ],
            exports: [
                layout_1_component_1.HorizontalLayout1Component
            ]
        })
    ], HorizontalLayout1Module);
    return HorizontalLayout1Module;
}());
exports.HorizontalLayout1Module = HorizontalLayout1Module;
//# sourceMappingURL=layout-1.module.js.map