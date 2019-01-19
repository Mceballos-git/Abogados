import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserFormComponent} from './user-form.component';
import {
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule
    
    // MatCheckbox
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';

// import {Mat}
@NgModule({
    declarations: [
        UserFormComponent,
    ],
    imports: [
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatSelectModule,MatSnackBarModule
    ],
    exports: [
        UserFormComponent
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})

export class UserFormModule {
}
