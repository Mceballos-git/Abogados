import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserListComponent} from './user-list.component';
import {MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {MatCardModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';

// import {Mat}
@NgModule({
    declarations: [
        UserListComponent,

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
    ],
    exports: [
        UserListComponent
    ]
})

export class UserListModule {
}
