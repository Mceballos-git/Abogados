"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fuse_if_on_dom_directive_1 = require("@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive");
var fuse_inner_scroll_directive_1 = require("@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive");
var fuse_perfect_scrollbar_directive_1 = require("@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive");
var fuse_mat_sidenav_directive_1 = require("@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive");
var FuseDirectivesModule = /** @class */ (function () {
    function FuseDirectivesModule() {
    }
    FuseDirectivesModule = __decorate([
        core_1.NgModule({
            declarations: [
                fuse_if_on_dom_directive_1.FuseIfOnDomDirective,
                fuse_inner_scroll_directive_1.FuseInnerScrollDirective,
                fuse_mat_sidenav_directive_1.FuseMatSidenavHelperDirective,
                fuse_mat_sidenav_directive_1.FuseMatSidenavTogglerDirective,
                fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective
            ],
            imports: [],
            exports: [
                fuse_if_on_dom_directive_1.FuseIfOnDomDirective,
                fuse_inner_scroll_directive_1.FuseInnerScrollDirective,
                fuse_mat_sidenav_directive_1.FuseMatSidenavHelperDirective,
                fuse_mat_sidenav_directive_1.FuseMatSidenavTogglerDirective,
                fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective
            ]
        })
    ], FuseDirectivesModule);
    return FuseDirectivesModule;
}());
exports.FuseDirectivesModule = FuseDirectivesModule;
//# sourceMappingURL=directives.js.map