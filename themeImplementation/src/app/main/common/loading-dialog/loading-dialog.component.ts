import {Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<LoadingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

    }

    ngOnInit(): any {

    }

    save(): any {
        this.dialogRef.close();
    }

    close(): any {
        this.dialogRef.close();
    }
}