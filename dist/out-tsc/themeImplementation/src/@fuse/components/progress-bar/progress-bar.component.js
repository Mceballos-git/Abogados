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
var progress_bar_service_1 = require("@fuse/components/progress-bar/progress-bar.service");
var FuseProgressBarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseProgressBarService} _fuseProgressBarService
     */
    function FuseProgressBarComponent(_fuseProgressBarService) {
        // Set the defaults
        this._fuseProgressBarService = _fuseProgressBarService;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseProgressBarComponent.prototype.ngOnInit = function () {
        // Subscribe to the progress bar service properties
        var _this = this;
        // Buffer value
        this._fuseProgressBarService.bufferValue
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (bufferValue) {
            _this.bufferValue = bufferValue;
        });
        // Mode
        this._fuseProgressBarService.mode
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (mode) {
            _this.mode = mode;
        });
        // Value
        this._fuseProgressBarService.value
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            _this.value = value;
        });
        // Visible
        this._fuseProgressBarService.visible
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (visible) {
            _this.visible = visible;
        });
    };
    /**
     * On destroy
     */
    FuseProgressBarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    var _a;
    FuseProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'fuse-progress-bar',
            templateUrl: './progress-bar.component.html',
            styleUrls: ['./progress-bar.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof progress_bar_service_1.FuseProgressBarService !== "undefined" && progress_bar_service_1.FuseProgressBarService) === "function" ? _a : Object])
    ], FuseProgressBarComponent);
    return FuseProgressBarComponent;
}());
exports.FuseProgressBarComponent = FuseProgressBarComponent;
//# sourceMappingURL=progress-bar.component.js.map