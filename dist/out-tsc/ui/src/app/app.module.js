"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var material_module_1 = require("./material.module");
var animations_1 = require("@angular/platform-browser/animations");
var flex_layout_1 = require("@angular/flex-layout");
var forms_1 = require("@angular/forms");
var angular_datatables_1 = require("angular-datatables");
var layout_1 = require("@angular/cdk/layout");
var http_1 = require("@angular/common/http");
var main_menu_component_1 = require("./main-menu/main-menu.component");
var material_1 = require("@angular/material");
var ng_pick_datetime_1 = require("ng-pick-datetime");
//servicios
var auth_service_1 = require("./services/auth.service");
var movements_service_1 = require("./services/movements.service");
//componentes
var login_component_1 = require("./login/login.component");
var mail_reset_pass_component_1 = require("./mail-reset-pass/mail-reset-pass.component");
var reset_pass_component_1 = require("./reset-pass/reset-pass.component");
var movement_categories_component_1 = require("./movement-categories/movement-categories.component");
var edit_movement_category_component_1 = require("./edit-movement-category/edit-movement-category.component");
var new_movement_category_component_1 = require("./new-movement-category/new-movement-category.component");
var users_component_1 = require("./users/users.component");
var new_user_component_1 = require("./new-user/new-user.component");
var edit_user_component_1 = require("./edit-user/edit-user.component");
var new_client_component_1 = require("./new-client/new-client.component");
var client_component_1 = require("./client/client.component");
var edit_client_component_1 = require("./edit-client/edit-client.component");
var new_turn_component_1 = require("./new-turn/new-turn.component");
var edit_turn_component_1 = require("./edit-turn/edit-turn.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                main_menu_component_1.MainMenuComponent,
                mail_reset_pass_component_1.MailResetPassComponent,
                reset_pass_component_1.ResetPassComponent,
                movement_categories_component_1.MovementCategoriesComponent,
                edit_movement_category_component_1.EditMovementCategoryComponent,
                new_movement_category_component_1.NewMovementCategoryComponent,
                users_component_1.UsersComponent,
                new_user_component_1.NewUserComponent,
                edit_user_component_1.EditUserComponent,
                new_client_component_1.NewClientComponent,
                client_component_1.ClientComponent,
                edit_client_component_1.EditClientComponent,
                new_turn_component_1.NewTurnComponent,
                edit_turn_component_1.EditTurnComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                material_module_1.MaterialModule,
                animations_1.BrowserAnimationsModule,
                flex_layout_1.FlexLayoutModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                layout_1.LayoutModule,
                http_1.HttpClientModule,
                angular_datatables_1.DataTablesModule,
                ng_pick_datetime_1.OwlDateTimeModule,
                ng_pick_datetime_1.OwlNativeDateTimeModule,
                material_1.MatToolbarModule,
                material_1.MatButtonModule,
                material_1.MatSidenavModule,
                material_1.MatIconModule,
                material_1.MatListModule
            ],
            providers: [
                auth_service_1.AuthService,
                movements_service_1.MovementsService,
                { provide: ng_pick_datetime_1.OWL_DATE_TIME_LOCALE, useValue: 'es' },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map