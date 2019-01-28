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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var movements_categories_service_1 = require("../services/movements-categories.service");
movements_categories_service_1.MovementsCategoriesService;
var NewMovementCategoryComponent = /** @class */ (function () {
    function NewMovementCategoryComponent(movCategoryService, routes) {
        this.movCategoryService = movCategoryService;
        this.routes = routes;
        this.isLoading = false;
        this.movementForm = new forms_1.FormGroup({
            'new_mov_category': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    NewMovementCategoryComponent.prototype.newMovementCategory = function () {
        var _this = this;
        this.isLoading = true;
        if (!this.movementForm.valid) {
            this.isLoading = false;
            return false;
        }
        // Do send mail Request
        console.log(this.movementForm.value);
        this.movCategoryService.create(this.movementForm.value).subscribe(function (response) {
            console.log(response);
            _this.routes.navigate(['movements-categories']);
        }, function (error) { console.log(error); });
    };
    NewMovementCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-new-movement-category',
            templateUrl: './new-movement-category.component.html',
            styleUrls: ['./new-movement-category.component.css']
        }),
        __metadata("design:paramtypes", [movements_categories_service_1.MovementsCategoriesService, router_1.Router])
    ], NewMovementCategoryComponent);
    return NewMovementCategoryComponent;
}());
exports.NewMovementCategoryComponent = NewMovementCategoryComponent;
//# sourceMappingURL=new-movement-category.component.js.map