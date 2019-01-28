"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic progress-spinner
 */
var ProgressSpinnerOverviewComponent = /** @class */ (function () {
    function ProgressSpinnerOverviewComponent() {
    }
    ProgressSpinnerOverviewComponent = __decorate([
        core_1.Component({
            selector: 'progress-spinner-overview-example',
            templateUrl: 'progress-spinner-overview-example.html',
            styleUrls: ['progress-spinner-overview-example.css'],
        })
    ], ProgressSpinnerOverviewComponent);
    return ProgressSpinnerOverviewComponent;
}());
exports.ProgressSpinnerOverviewComponent = ProgressSpinnerOverviewComponent;
//# sourceMappingURL=progress-spinner-overview.component.js.map