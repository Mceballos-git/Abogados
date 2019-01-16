import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

import {ForgotPasswordComponent} from 'app/main/authentication/forgot-password/forgot-password.component';
import {MatDialogModule} from '@angular/material';

const routes = [{
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatDialogModule

    ]
})
export class ForgotPasswordModule {
}
