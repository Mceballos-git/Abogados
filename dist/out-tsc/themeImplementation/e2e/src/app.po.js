"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var FusePage = /** @class */ (function () {
    function FusePage() {
    }
    FusePage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    FusePage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app #main')).getText();
    };
    return FusePage;
}());
exports.FusePage = FusePage;
//# sourceMappingURL=app.po.js.map