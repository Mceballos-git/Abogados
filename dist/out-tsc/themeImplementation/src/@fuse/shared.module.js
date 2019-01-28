"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var flex_layout_1 = require("@angular/flex-layout");
var directives_1 = require("@fuse/directives/directives");
var pipes_module_1 = require("@fuse/pipes/pipes.module");
var FuseSharedModule = /** @class */ (function () {
    function FuseSharedModule() {
    }
    FuseSharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                directives_1.FuseDirectivesModule,
                pipes_module_1.FusePipesModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                directives_1.FuseDirectivesModule,
                pipes_module_1.FusePipesModule
            ]
        })
    ], FuseSharedModule);
    return FuseSharedModule;
}());
exports.FuseSharedModule = FuseSharedModule;
//# sourceMappingURL=shared.module.js.map