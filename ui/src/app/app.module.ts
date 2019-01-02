import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { MailResetPassComponent } from './mail-reset-pass/mail-reset-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { CashItemsComponent } from './cash-items/cash-items.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, MainMenuComponent, MailResetPassComponent, ResetPassComponent, CashItemsComponent,
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {}
