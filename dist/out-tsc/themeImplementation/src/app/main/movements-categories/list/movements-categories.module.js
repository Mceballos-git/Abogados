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
var movements_categories_component_1 = require("./movements-categories.component");
var material_1 = require("@angular/material");
var shared_module_1 = require("@fuse/shared.module");
// import {Mat}
var MovementsCategoriesModule = /** @class */ (function () {
    function MovementsCategoriesModule() {
    }
    MovementsCategoriesModule = __decorate([
        core_1.NgModule({
            declarations: [
                movements_categories_component_1.MovementsCategoriesComponent,
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
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                shared_module_1.FuseSharedModule,
                material_1.MatDialogModule
            ],
            exports: [
                movements_categories_component_1.MovementsCategoriesComponent
            ],
            entryComponents: []
        })
    ], MovementsCategoriesModule);
    return MovementsCategoriesModule;
}());
exports.MovementsCategoriesModule = MovementsCategoriesModule;
//# sourceMappingURL=movements-categories.module.js.map