import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';

// Route Guards
import {AuthenticationGuardService} from './main/services/authentication-guard.service';
import {RoleGuardService} from './main/services/role-guard.service';

// Auth Modules
import {LoginModule} from './main/authentication/login/login.module';
import {LoginComponent} from './main/authentication/login/login.component';
import {ForgotPasswordModule} from './main/authentication/forgot-password/forgot-password.module';
import {ForgotPasswordComponent} from './main/authentication/forgot-password/forgot-password.component';
import {ForgotPasswordSentModule} from './main/authentication/forgot-password-sent/forgot-password-sent.module';
import {ForgotPasswordSentComponent} from './main/authentication/forgot-password-sent/forgot-password-sent.component';
import {ResetPasswordModule} from './main/authentication/reset-password/reset-password.module';
import {ResetPasswordComponent} from './main/authentication/reset-password/reset-password.component';

// Users related
import {UserListComponent} from './main/users/list/user-list.component';
import {UserListModule} from './main/users/list/user-list.module';
import {UserFormComponent} from "./main/users/user-form/user-form.component";
import {UserFormModule} from "./main/users/user-form/user-form.module";


// Dashboard
import {DashboardModule} from './main/dashboard/dashboard.module';
import {DashboardComponent} from './main/dashboard/dashboard.component';
//clients
import { ClientListComponent } from './main/clients/list/client-list.component';
import { ClientListModule } from './main/clients/list/client-list.module';
//mov categories
import { MovementsCategoriesComponent } from './main/movements-categories/list/movements-categories.component';
import { MovementsCategoriesModule } from './main/movements-categories/list/movements-categories.module';
import { MovementCategoriesFormComponent } from './main/movements-categories/form/movement-categories-form.component';
import { MovementCategoriesFormModule } from './main/movements-categories/form/movement-categories-form.module';
import { ClientFormModule } from './main/clients/client-form/client-form.module';
import { ClientFormComponent } from './main/clients/client-form/client-form.component';
import { MovementsListModule } from './main/movements/list/movements-list.module';
import { MovementsListComponent } from './main/movements/list/movements-list.component';
import { MovementFormModule } from "./main/movements/movement-form/movement-form.module";
import { MovementFormComponent } from './main/movements/movement-form/movement-form.component';
import { CalendarModule } from './main/calendar/calendar.module';
import { CalendarComponent } from './main/calendar/calendar.component';
import { ChangePasswordModule } from './main/authentication/change-password/change-password.module';
import { ChangePasswordComponent } from './main/authentication/change-password/change-password.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'forgot-password-sent', component: ForgotPasswordSentComponent},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
    {
        // User must be logged in to see this route.
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuardService]
    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/list',
        component: UserListComponent,
        canActivate: [RoleGuardService],
        data: {     
            expectedRole: '["admin"]'
        }

    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '["admin"]'
        }

    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/update/:id',
        component: UserFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '["admin"]'
        }

    },

    {
        // User must be logged in to see this route.
        path: 'clients/list',
        component: ClientListComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in to see this route.
        path: 'clients/create',
        component: ClientFormComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in to see this route.
        path: 'clients/update/:id',
        component: ClientFormComponent,
        canActivate: [AuthenticationGuardService],        
    },


    {
        // User must be logged in to see this route.
        path: 'movements-categories/list',
        component: MovementsCategoriesComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in to see this route.
        path: 'movements-categories/create',
        component: MovementCategoriesFormComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in to see this route.
        path: 'movements-categories/update/:id',
        component: MovementCategoriesFormComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in and have role Admin to see this route.
        path: 'movements/list',
        component: MovementsListComponent,
        canActivate: [RoleGuardService],
        data: {     
            expectedRole: '["admin"]'
        }
    },      

    {
        // User must be logged in and have role Admin to see this route.
        path: 'movements/create',
        component: MovementFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '["admin"]'
        }

    },

    {
        // User must be logged in and have role Admin to see this route.
        path: 'movements/update/:id',
        component: MovementFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: '["admin"]'
        }

    },
    {
        // User must be logged in to see this route.
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthenticationGuardService],        
    },

    {
        // User must be logged in to see this route.
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthenticationGuardService],        
    },

];

@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        // Auth Modules
        LoginModule,
        ForgotPasswordModule,
        ForgotPasswordSentModule,
        ResetPasswordModule,

        // User Modules
        UserListModule,
        UserFormModule,

        //ClientsModules
        ClientListModule,
        ClientFormModule,

        // Dashboard
        DashboardModule,
        //mov categories
        MovementsCategoriesModule,
        MovementCategoriesFormModule,
        //movements
        MovementsListModule,
        MovementFormModule,
        //calendar
        CalendarModule,
        //change password
        ChangePasswordModule
    ],
    providers: [
        AuthenticationGuardService,
        RoleGuardService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
