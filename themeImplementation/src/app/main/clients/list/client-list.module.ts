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
import { ClientListComponent } from './client-list.component';
import { DataTablesModule } from 'angular-datatables';

// import {Mat}
@NgModule({
    declarations: [
        ClientListComponent,

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
        DataTablesModule,
    ],
    exports: [
        ClientListComponent
    ]
})

export class ClientListModule {
}
