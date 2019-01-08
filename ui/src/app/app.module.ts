import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';


//servicios
import {AuthService} from './services/auth.service';
import {MovementsService} from './services/movements.service';

//componentes
import {LoginComponent} from './login/login.component';
import {MailResetPassComponent} from './mail-reset-pass/mail-reset-pass.component';
import {ResetPassComponent} from './reset-pass/reset-pass.component';
import {MovementCategoriesComponent} from './movement-categories/movement-categories.component';
import {EditMovementCategoryComponent} from './edit-movement-category/edit-movement-category.component';
import {NewMovementCategoryComponent} from './new-movement-category/new-movement-category.component';
import {UsersComponent} from './users/users.component';
import {NewUserComponent} from './new-user/new-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainMenuComponent,
        MailResetPassComponent,
        ResetPassComponent,
        MovementCategoriesComponent,
        EditMovementCategoryComponent,
        NewMovementCategoryComponent,
        UsersComponent,
        NewUserComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        HttpClientModule,
        DataTablesModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule


    ],
    providers: [
        AuthService,
        MovementsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
