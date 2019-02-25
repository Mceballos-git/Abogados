import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from '@fuse/services/config.service';
import {GenericDialogComponent} from 'app/main/common/generic-dialog/generic-dialog.component';
import {MovementsService} from 'app/main/services/movements.service';


@Component({
    selector: 'movements-list',
    styleUrls: ['./movements-list.component.scss'],
    templateUrl: './movements-list.component.html',

})

export class MovementsListComponent implements OnInit {

    displayedColumns: string[] = ['datetime', 'movement_category_id', 'client_id', 'movement_type_id', 'amount', 'concept', 'user_id', 'actions'];
    movements: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();
    balance: number;
    incomes: number;
    outcomes: number;
    pageSize=10;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _movService: MovementsService,
                private _fuseConfigService: FuseConfigService,
                private _dialog: MatDialog,
                private _snackBar: MatSnackBar) {
        this.loaded = false;
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: false
                }
            }
        };
    }

    ngOnInit() {

        this._movService.getList().subscribe(response => {
            //console.log(response);
            this.movements = response;
            this.loaded = true;
            this.balance = this.getBalance();


            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.movements);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
            this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
                if (length == 0 || pageSize == 0) {
                    return `0 de ${length}`;
                }
                length = Math.max(length, 0);
                const startIndex = page * pageSize;
                const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
                return `${startIndex + 1} - ${endIndex} de ${length}`;

            }

            this.dtTrigger.next();
        }, (error) => {
            console.log(error);
        });


    }

    getBalance() {
        this.balance = 0;
        this.incomes = 0;
        this.outcomes = 0;
        for (let i = 0, len = this.movements.length; i < len; i++) {

            if (this.movements[i].movement_type_id === 1) {
                this.balance = this.balance - this.movements[i].amount;
                this.outcomes = this.outcomes + this.movements[i].amount;
            }

            if (this.movements[i].movement_type_id === 2) {
                this.balance = this.balance + this.movements[i].amount;
                this.incomes = this.incomes + this.movements[i].amount;
            }

        }
        return this.balance;
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDeleteDialog(index, deleteRowItem) {
        const title = 'Eliminar Movimiento'
        let content = 'Estas por Eliminar al movimiento: {row.concept}, Deseas continuar?';
        content = content.replace('{row.concept}', deleteRowItem.concept);

        const dialogRef = this._dialog.open(GenericDialogComponent, {
            data: {title: title, content: content}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(index, deleteRowItem);
            }
        });
    }

    delete(pageElementIndex, deleteRowItem) {
        const index = this.getElementIndex(pageElementIndex);
        this._movService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(index)
        }, (error) => {
            this.handleDeletingError(error)
        });
    }

    getElementIndex(elementPageIndex) {
        if (this.paginator.pageIndex === 0) {
            return elementPageIndex;
        }
        return (this.paginator.pageSize * this.paginator.pageIndex) + elementPageIndex;
    }

    /**
     * Update DataSource so entries get deleted from view.
     */
    updateDataSource() {
        this.dataSource.data = this.movements;
        this.dataSource.paginator = this.paginator;
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deletedItemIndex) {
        this.movements.splice(deletedItemIndex, 1);
        this.updateDataSource();
        this.getBalance();
        console.log('Delete movement successfuly');
        this._snackBar.open('Movimiento eliminado correctamente', '', {
            duration: 4000,
            panelClass: ['green']
        });
    }

    /**
     * Handle deletion process errors.
     * @param response
     */
    handleDeletingError(response) {
        console.log('There was an error while trying to delete movement');
        this._snackBar.open('Se ha producido un error al eliminar el movimiento', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    }

}
