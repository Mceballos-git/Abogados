import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {MatDialogModule} from '@angular/material';
import {ResetPasswordComponent} from './reset-password.component';

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatDialogModule

    ]
})
export class ResetPasswordModule {
}
