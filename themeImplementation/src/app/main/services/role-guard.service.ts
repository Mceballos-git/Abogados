import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthenticationService, 
        public router: Router,
        public _snackBar:MatSnackBar) {
    }

    userRole:string;

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        const tokenPayload = decode(token);

       
        this.userRole = this.auth.getRole();         

        
        if (!this.auth.isAuthenticated() || this.userRole !== expectedRole) {

            //this.router.navigate(['/dashboard']);
            this._snackBar.open('Usuario no autorizado', '',{
                duration: 4000,
                panelClass: ['warn']
            });
            return false;
        }
        return true;
    }
}