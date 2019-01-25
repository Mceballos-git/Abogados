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
    MatPaginatorModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {MatCardModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import { MovementsListComponent } from './movements-list.component';


// import {Mat}
@NgModule({
    declarations: [
        MovementsListComponent,

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
    ],
    exports: [
        MovementsListComponent
    ]
})

export class MovementsListModule {
}
