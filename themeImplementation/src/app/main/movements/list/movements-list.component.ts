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
//
// class DataTablesResponse {
//     data: any[];
//     draw: number;
//     recordsFiltered: number;
//     recordsTotal: number;
// }

export class MovementsListComponent implements OnInit {

    dtOptions : any;

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

    constructor(
        private _movService: MovementsService,
        private _fuseConfigService: FuseConfigService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {

        // Configure the layout
        this.loaded = false;
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

    dataTableParameters: any;
    tableData : any
    ngOnInit() {

        let that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            bAutoWidth: false,
            order: [0, 'desc'],           

            
            ajax: (dataTablesParameters: any, callback) => {
                that.dataTableParameters = dataTablesParameters;
                that._movService.getList(dataTablesParameters).subscribe((resp : any) => {
                    that.tableData = resp.data;
                    that.loaded = true;
                    this.getBalance(dataTablesParameters);
                    this.dtTrigger.next();

                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            language: {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
            // columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
        };

    }

    getBalance(parameters) {
        this.balance = 0;
        this.incomes = 0;
        this.outcomes = 0;

        // Hacer Request a nuevo Endpoint que devuelva esa info calculada desde el server.
        this._movService.getTotalBalance(parameters).subscribe((response:any)=>{
           // console.log(response);
            this.balance = response.balance;
            this.incomes = response.incomes;
            this.outcomes = response.outcomes;
        }, error=>{
            console.log(error);
            
        });

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDeleteDialog(deleteRowItem) {
        const title = 'Eliminar Movimiento'
        let content = 'Estas por Eliminar al movimiento: {row.concept}, Deseas continuar?';
        content = content.replace('{row.concept}', deleteRowItem.concept);

        const dialogRef = this._dialog.open(GenericDialogComponent, {
            data: {title: title, content: content}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(deleteRowItem);
            }
        });
    }

    delete(deleteRowItem) {
        this._movService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(deleteRowItem);
        }, (error) => {
            this.handleDeletingError(error)
        });
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deleteRowItem) {

        let index = this.tableData.findIndex(function(element) {
            return element.id === deleteRowItem.id;
        });

        console.log(index);
        this.tableData.splice(index, 1);
        this.getBalance(this.dataTableParameters);
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
