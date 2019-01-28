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
var config_service_1 = require("@fuse/services/config.service");
var navigation_service_1 = require("@fuse/components/navigation/navigation.service");
var sidebar_service_1 = require("@fuse/components/sidebar/sidebar.service");
var NavbarHorizontalStyle1Component = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    function NavbarHorizontalStyle1Component(_fuseConfigService, _fuseNavigationService, _fuseSidebarService) {
        this._fuseConfigService = _fuseConfigService;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseSidebarService = _fuseSidebarService;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    NavbarHorizontalStyle1Component.prototype.ngOnInit = function () {
        var _this = this;
        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(operators_1.filter(function (value) { return value !== null; }), operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            _this.navigation = _this._fuseNavigationService.getCurrentNavigation();
        });
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this.fuseConfig = config;
        });
    };
    /**
     * On destroy
     */
    NavbarHorizontalStyle1Component.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    var _a, _b, _c;
    NavbarHorizontalStyle1Component = __decorate([
        core_1.Component({
            selector: 'navbar-horizontal-style-1',
            templateUrl: './style-1.component.html',
            styleUrls: ['./style-1.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, typeof (_b = typeof navigation_service_1.FuseNavigationService !== "undefined" && navigation_service_1.FuseNavigationService) === "function" ? _b : Object, typeof (_c = typeof sidebar_service_1.FuseSidebarService !== "undefined" && sidebar_service_1.FuseSidebarService) === "function" ? _c : Object])
    ], NavbarHorizontalStyle1Component);
    return NavbarHorizontalStyle1Component;
}());
exports.NavbarHorizontalStyle1Component = NavbarHorizontalStyle1Component;
//# sourceMappingURL=style-1.component.js.map