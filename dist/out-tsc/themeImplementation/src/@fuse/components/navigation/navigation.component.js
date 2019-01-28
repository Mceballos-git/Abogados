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
var navigation_service_1 = require("@fuse/components/navigation/navigation.service");
var FuseNavigationComponent = /** @class */ (function () {
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavigationComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.layout = 'vertical';
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Load the navigation
            _this.navigation = _this._fuseNavigationService.getCurrentNavigation();
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
        // Subscribe to navigation item
        rxjs_1.merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    var _a;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FuseNavigationComponent.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FuseNavigationComponent.prototype, "navigation", void 0);
    FuseNavigationComponent = __decorate([
        core_1.Component({
            selector: 'fuse-navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_a = typeof navigation_service_1.FuseNavigationService !== "undefined" && navigation_service_1.FuseNavigationService) === "function" ? _a : Object])
    ], FuseNavigationComponent);
    return FuseNavigationComponent;
}());
exports.FuseNavigationComponent = FuseNavigationComponent;
//# sourceMappingURL=navigation.component.js.map