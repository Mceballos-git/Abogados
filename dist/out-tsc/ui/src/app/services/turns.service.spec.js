"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var turns_service_1 = require("./turns.service");
describe('TurnsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(turns_service_1.TurnsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=turns.service.spec.js.map