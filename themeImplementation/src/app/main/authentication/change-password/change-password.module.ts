import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {MatDialogModule} from '@angular/material';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
    declarations: [
        ChangePasswordComponent
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
export class ChangePasswordModule {
}
