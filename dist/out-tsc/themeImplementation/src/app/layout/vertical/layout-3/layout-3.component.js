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
var navigation_1 = require("app/navigation/navigation");
var VerticalLayout3Component = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    function VerticalLayout3Component(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        // Set the defaults
        this.navigation = navigation_1.navigation;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    VerticalLayout3Component.prototype.ngOnInit = function () {
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
    VerticalLayout3Component.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    var _a;
    VerticalLayout3Component = __decorate([
        core_1.Component({
            selector: 'vertical-layout-3',
            templateUrl: './layout-3.component.html',
            styleUrls: ['./layout-3.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object])
    ], VerticalLayout3Component);
    return VerticalLayout3Component;
}());
exports.VerticalLayout3Component = VerticalLayout3Component;
//# sourceMappingURL=layout-3.component.js.map