"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var match_media_service_1 = require("@fuse/services/match-media.service");
var fuse_mat_sidenav_service_1 = require("@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service");
var FuseMatSidenavHelperDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {ObservableMedia} _observableMedia
     */
    function FuseMatSidenavHelperDirective(_fuseMatchMediaService, _fuseMatSidenavHelperService, _matSidenav, _observableMedia) {
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
        this._matSidenav = _matSidenav;
        this._observableMedia = _observableMedia;
        // Set the defaults
        this.isLockedOpen = true;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseMatSidenavHelperDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Register the sidenav to the service
        this._fuseMatSidenavHelperService.setSidenav(this.fuseMatSidenavHelper, this._matSidenav);
        if (this._observableMedia.isActive(this.matIsLockedOpen)) {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }
        this._fuseMatchMediaService.onMediaChange
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            if (_this._observableMedia.isActive(_this.matIsLockedOpen)) {
                _this.isLockedOpen = true;
                _this._matSidenav.mode = 'side';
                _this._matSidenav.toggle(true);
            }
            else {
                _this.isLockedOpen = false;
                _this._matSidenav.mode = 'over';
                _this._matSidenav.toggle(false);
            }
        });
    };
    /**
     * On destroy
     */
    FuseMatSidenavHelperDirective.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    var _a, _b;
    __decorate([
        core_1.HostBinding('class.mat-is-locked-open'),
        __metadata("design:type", Boolean)
    ], FuseMatSidenavHelperDirective.prototype, "isLockedOpen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FuseMatSidenavHelperDirective.prototype, "fuseMatSidenavHelper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FuseMatSidenavHelperDirective.prototype, "matIsLockedOpen", void 0);
    FuseMatSidenavHelperDirective = __decorate([
        core_1.Directive({
            selector: '[fuseMatSidenavHelper]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof match_media_service_1.FuseMatchMediaService !== "undefined" && match_media_service_1.FuseMatchMediaService) === "function" ? _a : Object, typeof (_b = typeof fuse_mat_sidenav_service_1.FuseMatSidenavHelperService !== "undefined" && fuse_mat_sidenav_service_1.FuseMatSidenavHelperService) === "function" ? _b : Object, material_1.MatSidenav,
            flex_layout_1.ObservableMedia])
    ], FuseMatSidenavHelperDirective);
    return FuseMatSidenavHelperDirective;
}());
exports.FuseMatSidenavHelperDirective = FuseMatSidenavHelperDirective;
var FuseMatSidenavTogglerDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     */
    function FuseMatSidenavTogglerDirective(_fuseMatSidenavHelperService) {
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On click
     */
    FuseMatSidenavTogglerDirective.prototype.onClick = function () {
        this._fuseMatSidenavHelperService.getSidenav(this.fuseMatSidenavToggler).toggle();
    };
    var _c;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FuseMatSidenavTogglerDirective.prototype, "fuseMatSidenavToggler", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FuseMatSidenavTogglerDirective.prototype, "onClick", null);
    FuseMatSidenavTogglerDirective = __decorate([
        core_1.Directive({
            selector: '[fuseMatSidenavToggler]'
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof fuse_mat_sidenav_service_1.FuseMatSidenavHelperService !== "undefined" && fuse_mat_sidenav_service_1.FuseMatSidenavHelperService) === "function" ? _c : Object])
    ], FuseMatSidenavTogglerDirective);
    return FuseMatSidenavTogglerDirective;
}());
exports.FuseMatSidenavTogglerDirective = FuseMatSidenavTogglerDirective;
//# sourceMappingURL=fuse-mat-sidenav.directive.js.map