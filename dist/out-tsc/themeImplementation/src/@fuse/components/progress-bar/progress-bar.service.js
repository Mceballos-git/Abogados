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
var FuseProgressBarService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Router} _router
     */
    function FuseProgressBarService(_router) {
        this._router = _router;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseProgressBarService.prototype, "bufferValue", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Buffer value
         */
        get: function () {
            return this._bufferValue.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setBufferValue = function (value) {
        this._bufferValue.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "mode", {
        /**
         * Mode
         */
        get: function () {
            return this._mode.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setMode = function (value) {
        this._mode.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "value", {
        /**
         * Value
         */
        get: function () {
            return this._value.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setValue = function (value) {
        this._value.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "visible", {
        /**
         * Visible
         */
        get: function () {
            return this._visible.asObservable();
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
    FuseProgressBarService.prototype._init = function () {
        var _this = this;
        // Initialize the behavior subjects
        this._bufferValue = new rxjs_1.BehaviorSubject(0);
        this._mode = new rxjs_1.BehaviorSubject('indeterminate');
        this._value = new rxjs_1.BehaviorSubject(0);
        this._visible = new rxjs_1.BehaviorSubject(false);
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationStart; }))
            .subscribe(function () {
            _this.show();
        });
        this._router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd || event instanceof router_1.NavigationError || event instanceof router_1.NavigationCancel; }))
            .subscribe(function () {
            _this.hide();
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the progress bar
     */
    FuseProgressBarService.prototype.show = function () {
        this._visible.next(true);
    };
    /**
     * Hide the progress bar
     */
    FuseProgressBarService.prototype.hide = function () {
        this._visible.next(false);
    };
    FuseProgressBarService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], FuseProgressBarService);
    return FuseProgressBarService;
}());
exports.FuseProgressBarService = FuseProgressBarService;
//# sourceMappingURL=progress-bar.service.js.map