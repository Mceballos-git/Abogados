import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {ClientsService} from 'app/main/services/clients.service';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {FuseConfigService} from '@fuse/services/config.service';
import {GenericDialogComponent} from 'app/main/common/generic-dialog/generic-dialog.component';
import {ExcelService} from 'app/main/services/excel.service';


@Component({
    selector: 'client-list',
    styleUrls: ['./client-list.component.scss'],
    templateUrl: './client-list.component.html',
})

export class ClientListComponent implements OnInit {

    @ViewChild('TABLE', {read: ElementRef}) table: ElementRef;

    displayedColumns: string[] = ['last_name', 'first_name', 'identification_number', 'city', 'balance', 'actions'];
    clients: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();
    pageSize = 10;
    tableData : any;
    dtOptions : any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _clientsService: ClientsService,
                private _fuseConfigService: FuseConfigService,
                private _dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private excelService: ExcelService) {
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
            let that = this;
            this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that._clientsService.getClientsList(dataTablesParameters).subscribe((resp : any) => {
                    that.tableData = resp.data;
                    that.loaded = true;
                    
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDeleteDialog(deleteRowItem) {
        const title = 'Eliminar Cliente'
        let content = 'Estas por Eliminar al Cliente: {row.first_name}, Deseas continuar?';
        content = content.replace('{row.first_name}', deleteRowItem.first_name);

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
        //const index = this.getElementIndex(pageElementIndex);
        this._clientsService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(deleteRowItem)
        }, (error) => {
            this.handleDeletingError(error)
        });
    }

    // getElementIndex(elementPageIndex) {
    //     if (this.paginator.pageIndex === 0) {
    //         return elementPageIndex;
    //     }
    //     return (this.paginator.pageSize * this.paginator.pageIndex) + elementPageIndex;
    // }

    /**
     * Update DataSource so entries get deleted from view.
     */
    updateDataSource() {
        this.dataSource = this.tableData;
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deleteRowItem) {
        //this.clients.splice(deletedItemIndex, 1);
        let index = this.tableData.findIndex(function(element) {
            return element.id === deleteRowItem.id;
        });

        this.tableData.splice(index, 1);
        console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');
        this._snackBar.open('Cliente eliminado correctamente', '', {
            duration: 4000,
            panelClass: ['green']
        });
    }

    /**
     * Handle deletion process errors.
     * @param response
     */
    handleDeletingError(response) {
        console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
        this._snackBar.open('Se ha producido un error al eliminar el cliente', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    }

    activate(id, index) {
        this._clientsService.activate(id).subscribe((response) => {
            console.log('client activated ok');
            this.tableData[index].active = 1;
            this.updateDataSource();
        }, (error) => {
            console.log(error);
        });
    }

    deactivate(id, index) {
        this._clientsService.deactivate(id).subscribe((response) => {
            console.log('client deactivated ok');
            this.tableData[index].active = 0;
            this.updateDataSource();
        }, (error) => {
            console.log(error);

        });
    }

    exportAsXLSX() {
       this.excelService.exportAsExcelFile(this.tableData, 'Clientes Visualizados');
    }

    exportFullListAsXLSX() {
        this._clientsService.getClientListForExport().subscribe((resp : any) => {
            let clients = [];
            for (let i = 0, len = resp.length; i < len; i++) {
                clients.push(this.getClientObjectTranslated(resp[i]));
            }
            this.excelService.exportAsExcelFile(clients, 'Listado Total De Clientes');
        });
    }

    getClientObjectTranslated(client) {
        return {
            "Nombre": client.first_name,
            "Apellido": client.last_name,
            "Tipo doc": client.identification_type,
            "Numero doc": client.identification_number,
            "CUIL-CUIT": client.tin_number,
            "Fecha Nacimiento": client.date_of_birth,
            "Numero de Telefono": client.phone_number,
            "email": client.email,
            "Direccion calle": client.street_address,
            "Direccion numero": client.number_address,
            "Piso": client.floor_address,
            "Dpto": client.department_address,
            "Pais": client.country,
            "Provincia": client.state,
            "Ciudad": client.city,
            "Nacionalidad": client.nationality,
            "Observaciones": client.observations,
            "Saldo": client.balance,
            "Activo": client.active,
        }
    }

}
