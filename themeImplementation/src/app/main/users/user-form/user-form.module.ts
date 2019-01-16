import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserFormComponent} from './user-form.component';
import {
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';

// import {Mat}
@NgModule({
    declarations: [
        UserFormComponent,

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
        UserFormComponent
    ]
})

export class UserFormModule {
}
