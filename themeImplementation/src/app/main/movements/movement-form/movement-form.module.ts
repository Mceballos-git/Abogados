import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatGridListModule, MatSelectModule, MatSnackBarModule, MatDatepickerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoadingDialogComponent } from '../../common/loading-dialog/loading-dialog.component';
import { MovementFormComponent } from './movement-form.component';
// import {Mat}
@NgModule({
    declarations: [
        MovementFormComponent,
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
        MatSelectModule, MatSnackBarModule, MatDatepickerModule
    ],
    exports: [
        MovementFormComponent
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})
export class MovementFormModule {
}



