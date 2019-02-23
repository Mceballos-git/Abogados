import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from '@fuse/services/config.service';
import {GenericDialogComponent} from 'app/main/common/generic-dialog/generic-dialog.component';
import { ProceduresService } from 'app/main/services/procedures.service';

import * as XLSX from 'xlsx';
import { ExcelService } from 'app/main/services/excel.service';

@Component({
    selector: 'procedures-list',
    styleUrls: ['./procedures-list.component.scss'],
    templateUrl: './procedures-list.component.html',

})

export class ProceduresListComponent implements OnInit {

    @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef;

    displayedColumns: string[] = ['procedure_category_id', 'client_id', 'inicio_demanda', 'sentencia_primera_instancia', 
        'sentencia_segunda_instancia', 'sentencia_corte_suprema', 'inicio_de_ejecucion', 'observaciones', 'actions'];
    procedures: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();
    balance: number;
    incomes: number;
    outcomes: number;
    pageSize=10;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _proceduresService: ProceduresService,
                private _fuseConfigService: FuseConfigService,
                private _dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private _excelService:ExcelService) {
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

        this._proceduresService.getList().subscribe(response => {
            console.log(response);
            this.procedures = response;
            this.loaded = true;
           

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.procedures);
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDeleteDialog(index, deleteRowItem) {
        const title = 'Eliminar Trámite'
        let content = 'Estas por Eliminar al trámite: {row.concept}, Deseas continuar?';
        content = content.replace('{row.concept}', deleteRowItem.concept);

        const dialogRef = this._dialog.open(GenericDialogComponent, {
            data: {title: title, content: content}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.delete(index, deleteRowItem);
            }
        });
    }

    delete(index, deleteRowItem) {
        this._proceduresService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(index)
        }, (error) => {
            this.handleDeletingError(error)
        });
    }

    /**
     * Update DataSource so entries get deleted from view.
     */
    updateDataSource() {
        this.dataSource.data = this.procedures;
        this.dataSource.paginator = this.paginator;
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deletedItemIndex) {
        this.procedures.splice(deletedItemIndex, 1);
        this.updateDataSource();
        
        console.log('Delete procedure successfuly');
        this._snackBar.open('Trámite eliminado correctamente', '', {
            duration: 4000,
            panelClass: ['green']
        });
    }

    /**
     * Handle deletion process errors.
     * @param response
     */
    handleDeletingError(response) {
        console.log('There was an error while trying to delete procedure');
        this._snackBar.open('Se ha producido un error al eliminar el trámite', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    }

    exportAsXLSX(){        
    
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);    

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

      /* save to file */
      XLSX.writeFile(wb, 'tramites.xlsx');
    
    }

    exportFullListAsXLSX(){
        let excelList = [];
        for(let i = 0, len = this.procedures.length; i < len; i++) {
           excelList.push(this.getClientObjectTranslated(this.procedures[i]));
        }
        this._excelService.exportAsExcelFile(excelList, 'Listado De Clientes');
    }

    getClientObjectTranslated(client) {
        return {
           "Nombre" : client.first_name,
           "Apellido" : client.last_name,
           "Tipo doc" : client.identification_type,
           "Numero doc" : client.identification_number,
           "CUIL-CUIT" : client.tin_number,
           "Fecha Nacimiento" : client.date_of_birth,
           "Numero de Telefono" : client.phone_number,
           "email" : client.email,
           "Direccion calle" : client.street_address,
           "Direccion numero" : client.number_address,
           "Piso" : client.floor_address,
           "Dpto" : client.department_address,
           "Pais" : client.country,
           "Provincia" : client.state,
           "Ciudad" : client.city,
           "Nacionalidad" : client.nationality,
           "Observaciones" : client.observations,
           "Saldo" : client.balance,
           "Activo" : client.active,
        }
    }

}
