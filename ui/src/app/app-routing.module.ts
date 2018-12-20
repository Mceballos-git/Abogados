import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuprinComponent } from './menuprin/menuprin.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'menuprin', component: MenuprinComponent},
  {path:'', pathMatch: 'full', redirectTo: 'login'}, //ruta vacio redirecciona al home
  {path:'**', pathMatch: 'full', redirectTo: 'login'}, //cualquier otra ruta redirecciona la home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
