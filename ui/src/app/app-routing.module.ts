import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CashComponent } from './cash/cash.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MailResetPassComponent } from './mail-reset-pass/mail-reset-pass.component';



const routes: Routes = [
  {path:'login', component: LoginComponent},  
  {path:'cash', component: CashComponent},
  {path:'main', component: MainMenuComponent},
  {path:'resetpassmail', component: MailResetPassComponent},
  {path:'', pathMatch: 'full', redirectTo: 'main'}, //ruta vacio redirecciona al home
  {path:'**', pathMatch: 'full', redirectTo: 'login'}, //cualquier otra ruta redirecciona la home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
