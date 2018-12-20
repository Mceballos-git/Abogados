import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { MenuprinComponent } from './menuprin/menuprin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    MenuprinComponent,
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
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})

export class AppModule {}
