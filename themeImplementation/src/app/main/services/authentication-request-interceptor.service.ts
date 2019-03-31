import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import {AuthenticationService} from "./authentication.service";
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationRequestInterceptorService implements HttpInterceptor {

    constructor(public auth: AuthenticationService, public router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(event => {}, err => {
            if (err instanceof HttpErrorResponse && err.status == 401) {
                this.router.navigate(['login']);
                return false;
            }
        });
    }
}