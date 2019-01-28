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
var confirm_dialog_component_1 = require("@fuse/components/confirm-dialog/confirm-dialog.component");
var FuseConfirmDialogModule = /** @class */ (function () {
    function FuseConfirmDialogModule() {
    }
    FuseConfirmDialogModule = __decorate([
        core_1.NgModule({
            declarations: [
                confirm_dialog_component_1.FuseConfirmDialogComponent
            ],
            imports: [
                material_1.MatDialogModule,
                material_1.MatButtonModule
            ],
            entryComponents: [
                confirm_dialog_component_1.FuseConfirmDialogComponent
            ],
        })
    ], FuseConfirmDialogModule);
    return FuseConfirmDialogModule;
}());
exports.FuseConfirmDialogModule = FuseConfirmDialogModule;
//# sourceMappingURL=confirm-dialog.module.js.map