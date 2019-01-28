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
var core_2 = require("@ngx-translate/core");
var _ = require("lodash");
var config_service_1 = require("@fuse/services/config.service");
var sidebar_service_1 = require("@fuse/components/sidebar/sidebar.service");
var navigation_1 = require("app/navigation/navigation");
var users_service_1 = require("app/main/services/users.service");
var authentication_service_1 = require("app/main/services/authentication.service");
var router_1 = require("@angular/router");
var ToolbarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    function ToolbarComponent(_fuseConfigService, _fuseSidebarService, _translateService, _userService, _authService, _router) {
        this._fuseConfigService = _fuseConfigService;
        this._fuseSidebarService = _fuseSidebarService;
        this._translateService = _translateService;
        this._userService = _userService;
        this._authService = _authService;
        this._router = _router;
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];
        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];
        this.navigation = navigation_1.navigation;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    ToolbarComponent.prototype.getProfile = function () {
        var _this = this;
        this._userService.getProfile().subscribe(function (response) {
            _this.loggedUser = response;
            _this.username = _this.loggedUser.username;
        }, function (error) {
            console.log(error);
        });
    };
    ToolbarComponent.prototype.logout = function () {
        var _this = this;
        this._authService.logout().subscribe(function (response) {
            console.log(response);
            _this._authService.setToken('');
            _this._router.navigate(['/login']);
        }, function (error) {
            console.log(error);
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProfile();
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (settings) {
            _this.horizontalNavbar = settings.layout.navbar.position === 'top';
            _this.rightNavbar = settings.layout.navbar.position === 'right';
            _this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });
        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
    };
    /**
     * On destroy
     */
    ToolbarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    ToolbarComponent.prototype.toggleSidebarOpen = function (key) {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    };
    /**
     * Search
     *
     * @param value
     */
    ToolbarComponent.prototype.search = function (value) {
        // Do your search here...
        console.log(value);
    };
    /**
     * Set the language
     *
     * @param lang
     */
    ToolbarComponent.prototype.setLanguage = function (lang) {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;
        // Use the selected language for translations
        this._translateService.use(lang.id);
    };
    var _a, _b, _c, _d;
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, typeof (_b = typeof sidebar_service_1.FuseSidebarService !== "undefined" && sidebar_service_1.FuseSidebarService) === "function" ? _b : Object, core_2.TranslateService, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object, typeof (_d = typeof authentication_service_1.AuthenticationService !== "undefined" && authentication_service_1.AuthenticationService) === "function" ? _d : Object, router_1.Router])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map