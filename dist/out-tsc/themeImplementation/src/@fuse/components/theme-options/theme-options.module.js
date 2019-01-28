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
var forms_1 = require("@angular/forms");
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var directives_1 = require("@fuse/directives/directives");
var material_color_picker_module_1 = require("@fuse/components/material-color-picker/material-color-picker.module");
var sidebar_module_1 = require("@fuse/components/sidebar/sidebar.module");
var theme_options_component_1 = require("@fuse/components/theme-options/theme-options.component");
var FuseThemeOptionsModule = /** @class */ (function () {
    function FuseThemeOptionsModule() {
    }
    FuseThemeOptionsModule = __decorate([
        core_1.NgModule({
            declarations: [
                theme_options_component_1.FuseThemeOptionsComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatDividerModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                material_1.MatOptionModule,
                material_1.MatRadioModule,
                material_1.MatSelectModule,
                material_1.MatSlideToggleModule,
                directives_1.FuseDirectivesModule,
                material_color_picker_module_1.FuseMaterialColorPickerModule,
                sidebar_module_1.FuseSidebarModule
            ],
            exports: [
                theme_options_component_1.FuseThemeOptionsComponent
            ]
        })
    ], FuseThemeOptionsModule);
    return FuseThemeOptionsModule;
}());
exports.FuseThemeOptionsModule = FuseThemeOptionsModule;
//# sourceMappingURL=theme-options.module.js.map