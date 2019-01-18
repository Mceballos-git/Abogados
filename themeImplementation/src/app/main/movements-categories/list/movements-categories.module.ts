import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { MovementsCategoriesComponent } from './movements-categories.component';

import {
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {GenericDialogComponent} from "../../common/generic-dialog/generic-dialog.component";
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component";

// import {Mat}
@NgModule({
    declarations: [
        MovementsCategoriesComponent,
        
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
        MatTableModule,
        MatPaginatorModule,
        FuseSharedModule,
        MatDialogModule
    ],
    exports: [
        MovementsCategoriesComponent
    ],
    entryComponents: [
        
    ]
})

export class MovementsCategoriesModule {
}
