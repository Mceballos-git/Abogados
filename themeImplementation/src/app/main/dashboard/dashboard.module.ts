import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {MatProgressSpinnerModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {MatCardModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';

// import {Mat}
@NgModule({
    declarations: [
        DashboardComponent,

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
        DashboardComponent
    ]
})

export class DashboardModule {
}
