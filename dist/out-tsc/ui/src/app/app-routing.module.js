"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var main_menu_component_1 = require("./main-menu/main-menu.component");
var mail_reset_pass_component_1 = require("./mail-reset-pass/mail-reset-pass.component");
var reset_pass_component_1 = require("./reset-pass/reset-pass.component");
var movement_categories_component_1 = require("./movement-categories/movement-categories.component");
var new_movement_category_component_1 = require("./new-movement-category/new-movement-category.component");
var edit_movement_category_component_1 = require("./edit-movement-category/edit-movement-category.component");
var users_component_1 = require("./users/users.component");
var edit_user_component_1 = require("./edit-user/edit-user.component");
var new_user_component_1 = require("./new-user/new-user.component");
var client_component_1 = require("./client/client.component");
var new_client_component_1 = require("./new-client/new-client.component");
var edit_client_component_1 = require("./edit-client/edit-client.component");
var new_turn_component_1 = require("./new-turn/new-turn.component");
var edit_turn_component_1 = require("./edit-turn/edit-turn.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'main', component: main_menu_component_1.MainMenuComponent },
    { path: 'forgot-password', component: mail_reset_pass_component_1.MailResetPassComponent },
    { path: 'reset-password/:token', component: reset_pass_component_1.ResetPassComponent },
    { path: 'movements-categories', component: movement_categories_component_1.MovementCategoriesComponent },
    { path: 'new-movement-category', component: new_movement_category_component_1.NewMovementCategoryComponent },
    { path: 'edit-movement-category/:id/:name', component: edit_movement_category_component_1.EditMovementCategoryComponent },
    { path: 'users', component: users_component_1.UsersComponent },
    { path: 'edit-user/:id', component: edit_user_component_1.EditUserComponent },
    { path: 'new-user', component: new_user_component_1.NewUserComponent },
    { path: 'edit-client/:id', component: edit_client_component_1.EditClientComponent },
    { path: 'new-client', component: new_client_component_1.NewClientComponent },
    { path: 'clients', component: client_component_1.ClientComponent },
    { path: 'new-turn', component: new_turn_component_1.NewTurnComponent },
    { path: 'edit-turn', component: edit_turn_component_1.EditTurnComponent },
    { path: '', pathMatch: 'full', redirectTo: 'main' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map