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
// src/app/auth/auth-guard.service.ts
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("./authentication.service");
var AuthenticationGuardService = /** @class */ (function () {
    function AuthenticationGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthenticationGuardService.prototype.canActivate = function () {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    };
    AuthenticationGuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
    ], AuthenticationGuardService);
    return AuthenticationGuardService;
}());
exports.AuthenticationGuardService = AuthenticationGuardService;
//# sourceMappingURL=authentication-guard.service.js.map