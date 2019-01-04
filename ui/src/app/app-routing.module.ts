import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MailResetPassComponent } from './mail-reset-pass/mail-reset-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { MovementCategoriesComponent } from './movement-categories/movement-categories.component';



const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'main', component: MainMenuComponent},
  {path:'forgot-password', component: MailResetPassComponent},
  {path:'reset-password/:token', component: ResetPassComponent},
  {path:'movements-categories', component: MovementCategoriesComponent},
  {path:'', pathMatch: 'full', redirectTo: 'main'}, //ruta vacio redirecciona al home
  {path:'**', pathMatch: 'full', redirectTo: 'login'}, //cualquier otra ruta redirecciona la home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
