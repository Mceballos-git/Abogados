import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations/index';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loadingDialogRef: any;
    authenticationFailed: boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private _dialog: MatDialog,
        private _router: Router,
        private _snackBar:MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    onSubmit(): boolean {

        // Login Form is invalid abort execution.
        if (!this.loginForm.valid) {
            return false;
        }

        this.openDialog();

        // Do Login Request
        this._authService.login(this.loginForm.value).subscribe((response) => {
            this.handleLoginSuccess(response);
        }, (response) => {
            this.handleLoginError(response);
        });

        return true;
    }

    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    openDialog(): any {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.loadingDialogRef = this._dialog.open(LoadingDialogComponent, dialogConfig);
    }

    /**
     * Handle Login request Response Success.
     *
     * @param response
     */
    handleLoginSuccess(response): void {
        this.loadingDialogRef.close();
        this._authService.setUsername(response.user.username);
        this._authService.setRole(response.user.role_list);
        //console.log(response.user.role_list);
        
        this._authService.setToken(response.token);
        this._router.navigate(['dashboard']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handleLoginError(response): void {
        this.loginForm.reset();
        this.loadingDialogRef.close();
        this.authenticationFailed = true;
        this._snackBar.open('Se ha producido un error al iniciar sesión', '',{
            duration: 3000,
            panelClass: ['warn']
        });
    }
}
