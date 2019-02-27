import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations/index';

import {UserSecurityService} from '../../services/user-security.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'forgot-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChangePasswordComponent implements OnInit {
    loadingDialogRef: any;
    changePasswordForm: FormGroup;
    changePasswordFailed: boolean;
    invalidCurrentPass:boolean;
    sameOldPassword:boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userSecurityService: UserSecurityService,
        private _dialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
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

    /**
     * On init
     */
    ngOnInit(): void {
        this.changePasswordForm = new FormGroup({
            'current_password': new FormControl('', Validators.required),
            'new_password': new FormControl('', [Validators.required, Validators.minLength(5)]),
            'new_password_confirmation': new FormControl()
        });    
        
        
        this.changePasswordForm.controls['new_password_confirmation'].setValidators([
            Validators.required,
            this.checkPasswords.bind(this.changePasswordForm)
        ]);     
       
    }

    checkPasswords(group: FormGroup): any {
        const form: any = this;
        const newPass = form.controls.new_password.value;
        const newPassConfirm = form.controls.new_password_confirmation.value;
        return newPass === newPassConfirm ? null : { notMatch: true };
    }

    /**
     *
     * @returns {boolean}
     */
    onSubmit(): boolean {
        this.invalidCurrentPass = false;
        this.sameOldPassword = false;
        // Form is invalid abort execution.
        if (!this.changePasswordForm.valid) {
            return false;
        }

        this.openDialog();
      
        // Do Request
        this._userSecurityService.changePassword(this.changePasswordForm.value).subscribe(
            (response) => { this.handlePostSubmitSuccess(response); },
            (response) => { this.handlePostSubmitError(response); }
        );

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
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handlePostSubmitSuccess (response): void {
        this.loadingDialogRef.close();
        this._snackBar.open('Cambio de contraseña exitoso', '',{
            duration: 4000,
            panelClass: ['green']
        });  
        this._router.navigate(['login']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handlePostSubmitError (response): void {
        this.loadingDialogRef.close();
        this.changePasswordForm.reset();
        console.log(response.error.details.message);
        
        this.changePasswordFailed = true;
        this._snackBar.open('Se ha producido un error al cambiar contraseña', '',{
            duration: 4000,
            panelClass: ['warn']
        });  
        if(response.error.details.message)
        {          
            
            if(response.error.details.message === "current_password is invalid")
            {
                this.invalidCurrentPass = true; 
                        
            }
        }

        if(response.error.details.message.new_password)
        {
            if(response.error.details.message.new_password[0] === "The new password and current password must be different.")
            {
                this.sameOldPassword = true; 
            }
        }
    }
}
