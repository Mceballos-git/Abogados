"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var movements_categories_service_1 = require("./movements-categories.service");
describe('MovementsCategoriesService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(movements_categories_service_1.MovementsCategoriesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=movements-categories.service.spec.js.map