import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AuthService {

    public token:any;

    constructor (private http: HttpClient) {

    }

    login (loginData) {
        let requestBody = {username: loginData.user, password: loginData.pass};
        return this.http.post('http://local.sassani.com/auth/login', requestBody);
    }

    logut() {

    }

    resetPassMail(resetData){
        let requestBody = {email: resetData.email};
        return this.http.post('http://local.sassani.com/user-security/forgot-password', requestBody);
    }

}