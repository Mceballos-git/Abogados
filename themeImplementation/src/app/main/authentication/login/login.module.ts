import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {LoginComponent} from './login.component';
import {MatDialogModule} from '@angular/material';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';

@NgModule({
    declarations: [
        LoginComponent,
        LoadingDialogComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatDialogModule
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})
export class LoginModule {
}
