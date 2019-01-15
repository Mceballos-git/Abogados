import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations/index';

import {UserSecurityService} from '../../services/user-security.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';
import {Router} from '@angular/router';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password-sent.component.html',
    styleUrls: ['./forgot-password-sent.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordSentComponent implements OnInit {
    loadingDialogRef: any;
    forgotPasswordForm: FormGroup;
    forgotPasswordFailed: boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userSecurityService: UserSecurityService,
        private _dialog: MatDialog,
        private _router: Router
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     *
     * @returns {boolean}
     */
    onSubmit(): boolean {
        // Login Form is invalid abort execution.
        if (!this.forgotPasswordForm.valid) {
            return false;
        }

        this.openDialog();

        // Do Login Request
        this._userSecurityService.forgotPassword(this.forgotPasswordForm.value).subscribe(
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
        this._router.navigate(['forgot-password-sent']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handlePostSubmitError (response): void {
        this.loadingDialogRef.close();
        this.forgotPasswordForm.reset();
        this.forgotPasswordFailed = true;
    }
}
