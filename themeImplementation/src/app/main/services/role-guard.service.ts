import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthenticationService, public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        const tokenPayload = decode(token);

        console.log(expectedRole);
        console.log(tokenPayload);

        //
        // if (
        //     !this.auth.isAuthenticated() ||
        //     tokenPayload.role !== expectedRole
        // ) {
        //     this.router.navigate(['login']);
        //     return false;
        // }
        return true;
    }
}