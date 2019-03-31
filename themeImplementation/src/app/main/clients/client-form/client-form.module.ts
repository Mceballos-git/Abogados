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
    MatSnackBarModule,
    MatDatepickerModule,    
    
    // MatCheckbox
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {LoadingDialogComponent} from '../../common/loading-dialog/loading-dialog.component';
import { ClientFormComponent } from './client-form.component';


// import {Mat}
@NgModule({
    declarations: [
        ClientFormComponent,
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
        MatSelectModule,MatSnackBarModule,MatDatepickerModule
    ],
    exports: [
        ClientFormComponent
    ],
    entryComponents: [
        LoadingDialogComponent
    ]
})

export class ClientFormModule {
}
