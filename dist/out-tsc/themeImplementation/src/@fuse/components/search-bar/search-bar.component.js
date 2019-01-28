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
var FuseSearchBarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    function FuseSearchBarComponent(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        // Set the defaults
        this.input = new core_1.EventEmitter();
        this.collapsed = true;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseSearchBarComponent.prototype.ngOnInit = function () {
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
    FuseSearchBarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Collapse
     */
    FuseSearchBarComponent.prototype.collapse = function () {
        this.collapsed = true;
    };
    /**
     * Expand
     */
    FuseSearchBarComponent.prototype.expand = function () {
        this.collapsed = false;
    };
    /**
     * Search
     *
     * @param event
     */
    FuseSearchBarComponent.prototype.search = function (event) {
        this.input.emit(event.target.value);
    };
    var _a;
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FuseSearchBarComponent.prototype, "input", void 0);
    FuseSearchBarComponent = __decorate([
        core_1.Component({
            selector: 'fuse-search-bar',
            templateUrl: './search-bar.component.html',
            styleUrls: ['./search-bar.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object])
    ], FuseSearchBarComponent);
    return FuseSearchBarComponent;
}());
exports.FuseSearchBarComponent = FuseSearchBarComponent;
//# sourceMappingURL=search-bar.component.js.map