import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {MatDialogModule} from '@angular/material';
import {ForgotPasswordSentComponent} from './forgot-password-sent.component';

@NgModule({
    declarations: [
        ForgotPasswordSentComponent
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
export class ForgotPasswordSentModule {
}
