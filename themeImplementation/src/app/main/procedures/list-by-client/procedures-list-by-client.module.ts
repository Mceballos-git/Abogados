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
import { DataTablesModule } from 'angular-datatables';
import { ProceduresListByClientComponent } from './procedures-list-by-client.component';


// import {Mat}
@NgModule({
    declarations: [
        ProceduresListByClientComponent,

    ],
    imports: [
        RouterModule,
        DataTablesModule,
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
        ProceduresListByClientComponent
    ]
})

export class ProceduresListByClientModule {
}
