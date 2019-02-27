import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

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
import { ProcedureCategoriesComponent } from './procedure-categories.component';

// import {Mat}
@NgModule({
    declarations: [
        ProcedureCategoriesComponent,
        
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
        ProcedureCategoriesComponent
    ],
    entryComponents: [
        
    ]
})

export class ProcedureCategoriesModule {
}
