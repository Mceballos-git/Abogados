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
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'admin'
        }

    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'admin'
        }

    },
    {
        // User must be logged in and have role Admin to see this route.
        path: 'users/update/:id',
        component: UserFormComponent,
        canActivate: [RoleGuardService],
        data: {
            expectedRole: 'admin'
        }

    },


];

@NgModule({
    declarations: [
        AppComponent
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

        // Dashboard
        DashboardModule
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
