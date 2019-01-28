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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_1 = require("@angular/cdk/platform");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var _ = require("lodash");
// Create the injection token for the custom settings
exports.FUSE_CONFIG = new core_1.InjectionToken('fuseCustomConfig');
var FuseConfigService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    function FuseConfigService(_platform, _router, _config) {
        this._platform = _platform;
        this._router = _router;
        this._config = _config;
        // Set the default config from the user provided config (from forRoot)
        this._defaultConfig = _config;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseConfigService.prototype, "config", {
        get: function () {
            return this._configSubject.asObservable();
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Set and get the config
         */
        set: function (value) {
            // Get the value from the behavior subject
            var config = this._configSubject.getValue();
            // Merge the new config
            config = _.merge({}, config, value);
            // Notify the observers
            this._configSubject.next(config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseConfigService.prototype, "defaultConfig", {
        /**
         * Get default config
         *
         * @returns {any}
         */
        get: function () {
            return this._defaultConfig;
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseConfigService.prototype._init = function () {
        var _this = this;
        /**
         * Disable custom scrollbars if browser is mobile
         */
        if (this._platform.ANDROID || this._platform.IOS) {
            this._defaultConfig.customScrollbars = false;
        }
        // Set the config from the default config
        this._configSubject = new rxjs_1.BehaviorSubject(_.cloneDeep(this._defaultConfig));
        // Reload the default layout config on every RoutesRecognized event
        // if the current layout config is different from the default one
        this._router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.RoutesRecognized; }))
            .subscribe(function () {
            if (!_.isEqual(_this._configSubject.getValue().layout, _this._defaultConfig.layout)) {
                // Clone the current config
                var config = _.cloneDeep(_this._configSubject.getValue());
                // Reset the layout from the default config
                config.layout = _.cloneDeep(_this._defaultConfig.layout);
                // Set the config
                _this._configSubject.next(config);
            }
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    FuseConfigService.prototype.setConfig = function (value, opts) {
        if (opts === void 0) { opts = { emitEvent: true }; }
        // Get the value from the behavior subject
        var config = this._configSubject.getValue();
        // Merge the new config
        config = _.merge({}, config, value);
        // If emitEvent option is true...
        if (opts.emitEvent === true) {
            // Notify the observers
            this._configSubject.next(config);
        }
    };
    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    FuseConfigService.prototype.getConfig = function () {
        return this._configSubject.asObservable();
    };
    /**
     * Reset to the default config
     */
    FuseConfigService.prototype.resetToDefaults = function () {
        // Set the config from the default config
        this._configSubject.next(_.cloneDeep(this._defaultConfig));
    };
    FuseConfigService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(2, core_1.Inject(exports.FUSE_CONFIG)),
        __metadata("design:paramtypes", [platform_1.Platform,
            router_1.Router, Object])
    ], FuseConfigService);
    return FuseConfigService;
}());
exports.FuseConfigService = FuseConfigService;
//# sourceMappingURL=config.service.js.map