import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatGridListModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoadingDialogComponent } from '../../common/loading-dialog/loading-dialog.component';
import { ProcedureFormComponent } from './procedure-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
// import {Mat}
@NgModule({
    declarations: [
        ProcedureFormComponent,
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
        MatSelectModule, MatSnackBarModule, MatDatepickerModule,

        NgSelectModule, FormsModule
    ],
    exports: [
        ProcedureFormComponent
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})
export class ProcedureFormModule {
}



