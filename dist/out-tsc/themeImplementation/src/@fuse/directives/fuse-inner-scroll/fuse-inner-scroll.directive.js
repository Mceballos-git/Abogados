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
var match_media_service_1 = require("@fuse/services/match-media.service");
var FuseInnerScrollDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {FuseMatchMediaService} _fuseMediaMatchService
     * @param {Renderer2} _renderer
     */
    function FuseInnerScrollDirective(_elementRef, _fuseMediaMatchService, _renderer) {
        this._elementRef = _elementRef;
        this._fuseMediaMatchService = _fuseMediaMatchService;
        this._renderer = _renderer;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseInnerScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Get the parent
        this._parent = this._renderer.parentNode(this._elementRef.nativeElement);
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Get the grand parent
        this._grandParent = this._renderer.parentNode(this._parent);
        // Register to the media query changes
        this._fuseMediaMatchService.onMediaChange
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (alias) {
            if (alias === 'xs') {
                _this._removeClass();
            }
            else {
                _this._addClass();
            }
        });
    };
    /**
     * On destroy
     */
    FuseInnerScrollDirective.prototype.ngOnDestroy = function () {
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Remove the class
        this._removeClass();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Add the class name
     *
     * @private
     */
    FuseInnerScrollDirective.prototype._addClass = function () {
        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    };
    /**
     * Remove the class name
     * @private
     */
    FuseInnerScrollDirective.prototype._removeClass = function () {
        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    };
    var _a;
    FuseInnerScrollDirective = __decorate([
        core_1.Directive({
            selector: '.inner-scroll'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, typeof (_a = typeof match_media_service_1.FuseMatchMediaService !== "undefined" && match_media_service_1.FuseMatchMediaService) === "function" ? _a : Object, core_1.Renderer2])
    ], FuseInnerScrollDirective);
    return FuseInnerScrollDirective;
}());
exports.FuseInnerScrollDirective = FuseInnerScrollDirective;
//# sourceMappingURL=fuse-inner-scroll.directive.js.map