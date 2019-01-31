import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations/index';

import {UserSecurityService} from '../../services/user-security.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'forgot-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit {
    loadingDialogRef: any;
    resetPasswordForm: FormGroup;
    resetPasswordFailed: boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userSecurityService: UserSecurityService,
        private _dialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
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
        this.resetPasswordForm = new FormGroup({
            'reset_token': new FormControl(this._activatedRoute.snapshot.paramMap.get('token')),
            'new_password': new FormControl('', Validators.required),
            'new_password_confirmation': new FormControl()
        });    
        
        
        this.resetPasswordForm.controls['new_password_confirmation'].setValidators([
            Validators.required,
            this.checkPasswords.bind(this.resetPasswordForm)
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
        // Login Form is invalid abort execution.
        if (!this.resetPasswordForm.valid) {
            return false;
        }

        this.openDialog();
      
console.log(this.resetPasswordForm.value);

        // Do Login Request
        this._userSecurityService.resetPassword(this.resetPasswordForm.value).subscribe(
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
        this._router.navigate(['login']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handlePostSubmitError (response): void {
        this.loadingDialogRef.close();
        this.resetPasswordForm.reset();
        console.log(response);
        
        this.resetPasswordFailed = true;
    }
}
