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
var forms_1 = require("@angular/forms");
var users_service_1 = require("../services/users.service");
var router_1 = require("@angular/router");
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(activatedRoute, userService) {
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.isLoading = false;
        this.id_user = this.activatedRoute.snapshot.paramMap.get('id');
        this.getUser(this.id_user);
        this.userForm = new forms_1.FormGroup({
            'first_name': new forms_1.FormControl('', forms_1.Validators.required),
            'last_name': new forms_1.FormControl('', forms_1.Validators.required),
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'email': new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")]),
            'role_list': new forms_1.FormControl('', forms_1.Validators.required),
            'active': new forms_1.FormControl(),
            'degree': new forms_1.FormControl('', forms_1.Validators.required),
            'position': new forms_1.FormControl('', forms_1.Validators.required),
            'shift_start': new forms_1.FormControl('', forms_1.Validators.required),
            'shift_end': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    EditUserComponent.prototype.ngOnInit = function () {
    };
    EditUserComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getOne(id).subscribe(function (response) {
            response.role_list = _this.userService.getRoleFromArray(response.role_list);
            _this.user = response;
            _this.userForm.patchValue(_this.user);
            console.log(_this.user);
        }, function (error) {
            console.log(error);
        });
    };
    EditUserComponent.prototype.editUser = function () {
        var _this = this;
        this.isLoading = true;
        this.userService.updateUser(this.id_user, this.userForm.value).subscribe(function (response) {
            _this.isLoading = false;
            _this.userForm.reset();
            console.log('Update user successfuly. Todo: Mostrar mensaje update exitoso');
        }, function (error) {
            _this.isLoading = false;
            console.log('There was an error while trying to update user. Todo: Mostrar mensaje update no exitoso' + error);
        });
    };
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            users_service_1.UsersService])
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map