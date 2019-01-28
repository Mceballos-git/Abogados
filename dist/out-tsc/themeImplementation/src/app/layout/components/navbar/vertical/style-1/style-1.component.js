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
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_service_1 = require("@fuse/services/config.service");
var navigation_service_1 = require("@fuse/components/navigation/navigation.service");
var fuse_perfect_scrollbar_directive_1 = require("@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive");
var sidebar_service_1 = require("@fuse/components/sidebar/sidebar.service");
var users_service_1 = require("app/main/services/users.service");
var NavbarVerticalStyle1Component = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    function NavbarVerticalStyle1Component(_fuseConfigService, _fuseNavigationService, _fuseSidebarService, _router, _userService) {
        this._fuseConfigService = _fuseConfigService;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseSidebarService = _fuseSidebarService;
        this._router = _router;
        this._userService = _userService;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    NavbarVerticalStyle1Component.prototype.getProfile = function () {
        var _this = this;
        this._userService.getProfile().subscribe(function (response) {
            _this.loggedUser = response;
            _this.username = _this.loggedUser.username;
        }, function (error) {
            console.log(error);
        });
    };
    Object.defineProperty(NavbarVerticalStyle1Component.prototype, "directive", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        // Directive
        set: function (theDirective) {
            var _this = this;
            if (!theDirective) {
                return;
            }
            this._fusePerfectScrollbar = theDirective;
            // Update the scrollbar on collapsable item toggle
            this._fuseNavigationService.onItemCollapseToggled
                .pipe(operators_1.delay(500), operators_1.takeUntil(this._unsubscribeAll))
                .subscribe(function () {
                _this._fusePerfectScrollbar.update();
            });
            // Scroll to the active item position
            this._router.events
                .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }), operators_1.take(1))
                .subscribe(function () {
                setTimeout(function () {
                    var activeNavItem = document.querySelector('navbar .nav-link.active');
                    if (activeNavItem) {
                        var activeItemOffsetTop = activeNavItem.offsetTop, activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop, scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;
                        _this._fusePerfectScrollbar.scrollToTop(scrollDistance);
                    }
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    NavbarVerticalStyle1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.getProfile();
        this._router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }), operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            if (_this._fuseSidebarService.getSidebar('navbar')) {
                _this._fuseSidebarService.getSidebar('navbar').close();
            }
        });
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this.fuseConfig = config;
        });
        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(operators_1.filter(function (value) { return value !== null; }), operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            _this.navigation = _this._fuseNavigationService.getCurrentNavigation();
        });
    };
    /**
     * On destroy
     */
    NavbarVerticalStyle1Component.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar opened status
     */
    NavbarVerticalStyle1Component.prototype.toggleSidebarOpened = function () {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    };
    /**
     * Toggle sidebar folded status
     */
    NavbarVerticalStyle1Component.prototype.toggleSidebarFolded = function () {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    };
    var _a, _b, _c, _d, _e, _f;
    __decorate([
        core_1.ViewChild(fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective),
        __metadata("design:type", typeof (_a = typeof fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective !== "undefined" && fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective) === "function" ? _a : Object),
        __metadata("design:paramtypes", [typeof (_b = typeof fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective !== "undefined" && fuse_perfect_scrollbar_directive_1.FusePerfectScrollbarDirective) === "function" ? _b : Object])
    ], NavbarVerticalStyle1Component.prototype, "directive", null);
    NavbarVerticalStyle1Component = __decorate([
        core_1.Component({
            selector: 'navbar-vertical-style-1',
            templateUrl: './style-1.component.html',
            styleUrls: ['./style-1.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _c : Object, typeof (_d = typeof navigation_service_1.FuseNavigationService !== "undefined" && navigation_service_1.FuseNavigationService) === "function" ? _d : Object, typeof (_e = typeof sidebar_service_1.FuseSidebarService !== "undefined" && sidebar_service_1.FuseSidebarService) === "function" ? _e : Object, router_1.Router, typeof (_f = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _f : Object])
    ], NavbarVerticalStyle1Component);
    return NavbarVerticalStyle1Component;
}());
exports.NavbarVerticalStyle1Component = NavbarVerticalStyle1Component;
//# sourceMappingURL=style-1.component.js.map