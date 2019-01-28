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
var types_1 = require("@fuse/types");
var navigation_service_1 = require("@fuse/components/navigation/navigation.service");
var FuseNavVerticalItemComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavVerticalItemComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.classes = 'nav-item';
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to navigation item
        rxjs_1.merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalItemComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    var _a, _b;
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], FuseNavVerticalItemComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof types_1.FuseNavigationItem !== "undefined" && types_1.FuseNavigationItem) === "function" ? _a : Object)
    ], FuseNavVerticalItemComponent.prototype, "item", void 0);
    FuseNavVerticalItemComponent = __decorate([
        core_1.Component({
            selector: 'fuse-nav-vertical-item',
            templateUrl: './item.component.html',
            styleUrls: ['./item.component.scss']
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_b = typeof navigation_service_1.FuseNavigationService !== "undefined" && navigation_service_1.FuseNavigationService) === "function" ? _b : Object])
    ], FuseNavVerticalItemComponent);
    return FuseNavVerticalItemComponent;
}());
exports.FuseNavVerticalItemComponent = FuseNavVerticalItemComponent;
//# sourceMappingURL=item.component.js.map