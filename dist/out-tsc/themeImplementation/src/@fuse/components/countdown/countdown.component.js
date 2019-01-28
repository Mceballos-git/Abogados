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
var moment = require("moment");
var FuseCountdownComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseCountdownComponent() {
        // Set the defaults
        this.countdown = {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        };
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseCountdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currDate = moment();
        var eventDate = moment(this.eventDate);
        // Get the difference in between the current date and event date in seconds
        var diff = eventDate.diff(currDate, 'seconds');
        // Calculate the remaining time for the first time so there will be no
        // delay on the countdown
        this.countdown = this._secondsToRemaining(diff);
        // Create a subscribable interval
        var countDown = rxjs_1.interval(1000)
            .pipe(operators_1.map(function (value) {
            return diff = diff - 1;
        }), operators_1.map(function (value) {
            return _this._secondsToRemaining(value);
        }));
        // Subscribe to the countdown interval
        countDown
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            _this.countdown = value;
        });
    };
    /**
     * On destroy
     */
    FuseCountdownComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    FuseCountdownComponent.prototype._secondsToRemaining = function (seconds) {
        var timeLeft = moment.duration(seconds, 'seconds');
        return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    };
    __decorate([
        core_1.Input('eventDate'),
        __metadata("design:type", Object)
    ], FuseCountdownComponent.prototype, "eventDate", void 0);
    FuseCountdownComponent = __decorate([
        core_1.Component({
            selector: 'fuse-countdown',
            templateUrl: './countdown.component.html',
            styleUrls: ['./countdown.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], FuseCountdownComponent);
    return FuseCountdownComponent;
}());
exports.FuseCountdownComponent = FuseCountdownComponent;
//# sourceMappingURL=countdown.component.js.map