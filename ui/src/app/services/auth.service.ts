import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable(
  {providedIn: 'root'}
)
export class AuthService {

    constructor (private http: HttpClient) {

    }

    login (loginData) {
        let requestBody = {username: loginData.user, password: loginData.pass};
        return this.http.post('http://local.sassani.com/auth/login', requestBody);
    }

    logut() {

    }

    forgotPassword(resetData){
        let requestBody = {email: resetData.email};
        return this.http.post('http://local.sassani.com/user-security/forgot-password', requestBody);
    }

    resetPassword(data){
        let requestBody = {reset_token: data.token, new_password:data.newPassword, new_password_confirmation:data.newPassConfirm};
        return this.http.post('http://local.sassani.com/user-security/reset-password', requestBody);
    }

}