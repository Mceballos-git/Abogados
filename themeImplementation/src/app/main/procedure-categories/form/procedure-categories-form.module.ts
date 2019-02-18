import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

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
import { ProcedureCategoriesFormComponent } from './procedure-categories-form.component';

// import {Mat}
@NgModule({
    declarations: [
        ProcedureCategoriesFormComponent,
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
        ProcedureCategoriesFormComponent
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})

export class ProcedureCategoriesFormModule {
}
