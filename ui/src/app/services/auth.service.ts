import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AuthService {

    constructor (private http: HttpClient) {

    }

    login (loginData) {
        let requestBody = {username: loginData.user, password: loginData.pass};
        return this.http.post('http://local.sassani.com/auth/login', requestBody);
    }

    logut() {

    }
}