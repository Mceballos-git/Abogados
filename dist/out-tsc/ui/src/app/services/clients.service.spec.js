"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var clients_service_1 = require("./clients.service");
describe('ClientsService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(clients_service_1.ClientsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=clients.service.spec.js.map