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
var material_1 = require("@angular/material");
var core_2 = require("@ngx-translate/core");
var navigation_component_1 = require("./navigation.component");
var item_component_1 = require("./vertical/item/item.component");
var collapsable_component_1 = require("./vertical/collapsable/collapsable.component");
var group_component_1 = require("./vertical/group/group.component");
var item_component_2 = require("./horizontal/item/item.component");
var collapsable_component_2 = require("./horizontal/collapsable/collapsable.component");
var FuseNavigationModule = /** @class */ (function () {
    function FuseNavigationModule() {
    }
    FuseNavigationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                material_1.MatIconModule,
                material_1.MatRippleModule,
                core_2.TranslateModule.forChild()
            ],
            exports: [
                navigation_component_1.FuseNavigationComponent
            ],
            declarations: [
                navigation_component_1.FuseNavigationComponent,
                group_component_1.FuseNavVerticalGroupComponent,
                item_component_1.FuseNavVerticalItemComponent,
                collapsable_component_1.FuseNavVerticalCollapsableComponent,
                item_component_2.FuseNavHorizontalItemComponent,
                collapsable_component_2.FuseNavHorizontalCollapsableComponent
            ]
        })
    ], FuseNavigationModule);
    return FuseNavigationModule;
}());
exports.FuseNavigationModule = FuseNavigationModule;
//# sourceMappingURL=navigation.module.js.map