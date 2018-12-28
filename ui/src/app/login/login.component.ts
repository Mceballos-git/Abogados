import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material'


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    loginForm: FormGroup;
    isLoading = false;

    /**
     * Class constructor definition.
     * @param {Router} router
     * @param {AuthService} loginService
     */
    constructor(private router: Router, 
        private loginService: AuthService,
        public snackBar:MatSnackBar) {

        this.loginForm = new FormGroup({
            'user': new FormControl('', Validators.required),
            'pass': new FormControl('', Validators.required)
        })
    }


    /**
     * Handle "Sign in" button callback.
     *
     */
    login() {

        this.isLoading = true;
        // Login Form is invalid abort execution.
        if (!this.loginForm.valid) {
            this.isLoading = false;
            return false;
        }

        // Do Login Request
        this.loginService.login(this.loginForm.value).subscribe(
            (response) => { this.handleLoginSuccess(response) },
            (response) => { this.handleLoginError(response) }
        );
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handleLoginSuccess (response) {
        this.isLoading = false;
        console.log('logged in sucesfully, redirect to main menu');
        this.router.navigate(['menuprin']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handleLoginError (response) {
        this.isLoading = false;
        this.loginForm.reset();
        console.log('There was an error while trying to login, Reset form (done) and show error message (done)');
        this.snackBar.open('Usuario o contraseña inválidos','', {
            duration:2000,
            panelClass:['red-snackbar']
        });
    }

}
