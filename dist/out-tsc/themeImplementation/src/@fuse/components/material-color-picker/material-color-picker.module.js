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
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var pipes_module_1 = require("@fuse/pipes/pipes.module");
var material_color_picker_component_1 = require("@fuse/components/material-color-picker/material-color-picker.component");
var FuseMaterialColorPickerModule = /** @class */ (function () {
    function FuseMaterialColorPickerModule() {
    }
    FuseMaterialColorPickerModule = __decorate([
        core_1.NgModule({
            declarations: [
                material_color_picker_component_1.FuseMaterialColorPickerComponent
            ],
            imports: [
                common_1.CommonModule,
                flex_layout_1.FlexLayoutModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatMenuModule,
                material_1.MatTooltipModule,
                pipes_module_1.FusePipesModule
            ],
            exports: [
                material_color_picker_component_1.FuseMaterialColorPickerComponent
            ],
        })
    ], FuseMaterialColorPickerModule);
    return FuseMaterialColorPickerModule;
}());
exports.FuseMaterialColorPickerModule = FuseMaterialColorPickerModule;
//# sourceMappingURL=material-color-picker.module.js.map