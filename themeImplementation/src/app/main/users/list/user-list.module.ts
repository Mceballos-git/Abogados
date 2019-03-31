import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserListComponent} from './user-list.component';
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
import { DataTablesModule } from 'angular-datatables';

// import {Mat}
@NgModule({
    declarations: [
        UserListComponent,
        GenericDialogComponent
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
        MatDialogModule
    ],
    exports: [
        UserListComponent
    ],
    entryComponents: [
        GenericDialogComponent
    ]
})

export class UserListModule {
}
