"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var material_1 = require("@angular/material");
var core_2 = require("@ngx-translate/core");
require("hammerjs");
var fuse_module_1 = require("@fuse/fuse.module");
var shared_module_1 = require("@fuse/shared.module");
var components_1 = require("@fuse/components");
var fuse_config_1 = require("app/fuse-config");
var app_component_1 = require("app/app.component");
var layout_module_1 = require("app/layout/layout.module");
// Route Guards
var authentication_guard_service_1 = require("./main/services/authentication-guard.service");
var role_guard_service_1 = require("./main/services/role-guard.service");
// Auth Modules
var login_module_1 = require("./main/authentication/login/login.module");
var login_component_1 = require("./main/authentication/login/login.component");
var forgot_password_module_1 = require("./main/authentication/forgot-password/forgot-password.module");
var forgot_password_component_1 = require("./main/authentication/forgot-password/forgot-password.component");
var forgot_password_sent_module_1 = require("./main/authentication/forgot-password-sent/forgot-password-sent.module");
var forgot_password_sent_component_1 = require("./main/authentication/forgot-password-sent/forgot-password-sent.component");
var reset_password_module_1 = require("./main/authentication/reset-password/reset-password.module");
var reset_password_component_1 = require("./main/authentication/reset-password/reset-password.component");
// Users related
var user_list_component_1 = require("./main/users/list/user-list.component");
var user_list_module_1 = require("./main/users/list/user-list.module");
var user_form_component_1 = require("./main/users/user-form/user-form.component");
var user_form_module_1 = require("./main/users/user-form/user-form.module");
// Dashboard
var dashboard_module_1 = require("./main/dashboard/dashboard.module");
var dashboard_component_1 = require("./main/dashboard/dashboard.component");
//clients
var client_list_component_1 = require("./main/clients/list/client-list.component");
var client_list_module_1 = require("./main/clients/list/client-list.module");
//mov categories
var movements_categories_component_1 = require("./main/movements-categories/list/movements-categories.component");
var movements_categories_module_1 = require("./main/movements-categories/list/movements-categories.module");
var movement_categories_form_component_1 = require("./main/movements-categories/form/movement-categories-form.component");
var movement_categories_form_module_1 = require("./main/movements-categories/form/movement-categories-form.module");
var client_form_module_1 = require("./main/clients/client-form/client-form.module");
var client_form_component_1 = require("./main/clients/client-form/client-form.component");
var movements_list_module_1 = require("./main/movements/list/movements-list.module");
var movements_list_component_1 = require("./main/movements/list/movements-list.component");
var movement_form_module_1 = require("./main/movements/movement-form/movement-form.module");
var movement_form_component_1 = require("./main/movements/movement-form/movement-form.component");
var appRoutes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
    { path: 'forgot-password-sent', component: forgot_password_sent_component_1.ForgotPasswordSentComponent },
    { path: 'reset-password/:token', component: reset_password_component_1.ResetPasswordComponent },
    {
        // User must be logged in to see this route.
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService]
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/list',
        component: user_list_component_1.UserListComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/create',
        component: user_form_component_1.UserFormComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/update/:id',
        component: user_form_component_1.UserFormComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        // User must be logged in to see this route.
        path: 'clients/list',
        component: client_list_component_1.ClientListComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in to see this route.
        path: 'clients/create',
        component: client_form_component_1.ClientFormComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in to see this route.
        path: 'clients/update/:id',
        component: client_form_component_1.ClientFormComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in to see this route.
        path: 'movements-categories/list',
        component: movements_categories_component_1.MovementsCategoriesComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in to see this route.
        path: 'movements-categories/create',
        component: movement_categories_form_component_1.MovementCategoriesFormComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in to see this route.
        path: 'movements-categories/update/:id',
        component: movement_categories_form_component_1.MovementCategoriesFormComponent,
        canActivate: [authentication_guard_service_1.AuthenticationGuardService],
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'movements/list',
        component: movements_list_component_1.MovementsListComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'movements/create',
        component: movement_form_component_1.MovementFormComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'movement/update/:id',
        component: movement_form_component_1.MovementFormComponent,
        canActivate: [role_guard_service_1.RoleGuardService],
        data: {
            expectedRole: 'admin'
        }
    },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(appRoutes),
                core_2.TranslateModule.forRoot(),
                // Material moment date module
                material_moment_adapter_1.MatMomentDateModule,
                // Material
                material_1.MatButtonModule,
                material_1.MatIconModule,
                // Fuse modules
                fuse_module_1.FuseModule.forRoot(fuse_config_1.fuseConfig),
                components_1.FuseProgressBarModule,
                shared_module_1.FuseSharedModule,
                components_1.FuseSidebarModule,
                components_1.FuseThemeOptionsModule,
                // App modules
                layout_module_1.LayoutModule,
                // Auth Modules
                login_module_1.LoginModule,
                forgot_password_module_1.ForgotPasswordModule,
                forgot_password_sent_module_1.ForgotPasswordSentModule,
                reset_password_module_1.ResetPasswordModule,
                // User Modules
                user_list_module_1.UserListModule,
                user_form_module_1.UserFormModule,
                //ClientsModules
                client_list_module_1.ClientListModule,
                client_form_module_1.ClientFormModule,
                // Dashboard
                dashboard_module_1.DashboardModule,
                //mov categories
                movements_categories_module_1.MovementsCategoriesModule,
                movement_categories_form_module_1.MovementCategoriesFormModule,
                //movements
                movements_list_module_1.MovementsListModule,
                movement_form_module_1.MovementFormModule
            ],
            providers: [
                authentication_guard_service_1.AuthenticationGuardService,
                role_guard_service_1.RoleGuardService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map