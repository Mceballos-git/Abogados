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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var animations_1 = require("@fuse/animations");
var config_service_1 = require("@fuse/services/config.service");
var FuseNavHorizontalCollapsableComponent = /** @class */ (function () {
    function FuseNavHorizontalCollapsableComponent(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        this.isOpen = false;
        this.classes = 'nav-collapsable nav-item';
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavHorizontalCollapsableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this.fuseConfig = config;
        });
    };
    /**
     * On destroy
     */
    FuseNavHorizontalCollapsableComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open
     */
    FuseNavHorizontalCollapsableComponent.prototype.open = function () {
        this.isOpen = true;
    };
    /**
     * Close
     */
    FuseNavHorizontalCollapsableComponent.prototype.close = function () {
        this.isOpen = false;
    };
    var _a;
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], FuseNavHorizontalCollapsableComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FuseNavHorizontalCollapsableComponent.prototype, "item", void 0);
    __decorate([
        core_1.HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FuseNavHorizontalCollapsableComponent.prototype, "open", null);
    __decorate([
        core_1.HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FuseNavHorizontalCollapsableComponent.prototype, "close", null);
    FuseNavHorizontalCollapsableComponent = __decorate([
        core_1.Component({
            selector: 'fuse-nav-horizontal-collapsable',
            templateUrl: './collapsable.component.html',
            styleUrls: ['./collapsable.component.scss'],
            animations: animations_1.fuseAnimations
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object])
    ], FuseNavHorizontalCollapsableComponent);
    return FuseNavHorizontalCollapsableComponent;
}());
exports.FuseNavHorizontalCollapsableComponent = FuseNavHorizontalCollapsableComponent;
//# sourceMappingURL=collapsable.component.js.map