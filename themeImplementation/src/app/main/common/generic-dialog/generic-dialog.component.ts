import {Component, OnInit, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'generic-dialog',
    templateUrl: './generic-dialog.component.html',
    styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

    content: string;
    title: string;

    constructor(
        private dialogRef: MatDialogRef<GenericDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.content = data.content;
        this.title = data.title;
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