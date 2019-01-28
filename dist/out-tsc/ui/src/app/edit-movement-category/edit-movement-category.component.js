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
var EditMovementCategoryComponent = /** @class */ (function () {
    function EditMovementCategoryComponent(movCategoryService, routes, activatedRoute) {
        this.movCategoryService = movCategoryService;
        this.routes = routes;
        this.activatedRoute = activatedRoute;
        this.isLoading = false;
        this.movementForm = new forms_1.FormGroup({
            'name_mov_category': new forms_1.FormControl(this.activatedRoute.snapshot.paramMap.get('name'), forms_1.Validators.required)
        });
        this.id_mov_category = this.activatedRoute.snapshot.paramMap.get('id');
    }
    EditMovementCategoryComponent.prototype.editMovementCategory = function () {
        var _this = this;
        this.isLoading = true;
        if (!this.movementForm.valid) {
            this.isLoading = false;
            return false;
        }
        // Do send mail Request
        console.log(this.movementForm.value);
        this.movCategoryService.edit(this.movementForm.value, this.id_mov_category).subscribe(function (response) {
            console.log(response);
            //poner mensaje de ok
            _this.routes.navigate(['movements-categories']);
        }, function (error) {
            //poner mensaje de error
            console.log(error);
        });
    };
    EditMovementCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-movement-category',
            templateUrl: './edit-movement-category.component.html',
            styleUrls: ['./edit-movement-category.component.css']
        }),
        __metadata("design:paramtypes", [movements_categories_service_1.MovementsCategoriesService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], EditMovementCategoryComponent);
    return EditMovementCategoryComponent;
}());
exports.EditMovementCategoryComponent = EditMovementCategoryComponent;
//# sourceMappingURL=edit-movement-category.component.js.map