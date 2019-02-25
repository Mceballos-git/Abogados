import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from '@fuse/services/config.service';
import {GenericDialogComponent} from 'app/main/common/generic-dialog/generic-dialog.component';
import { ProceduresService } from 'app/main/services/procedures.service';

import * as XLSX from 'xlsx';
import { ExcelService } from 'app/main/services/excel.service';

//para dar formato a la fecha
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
      dateInput: 'DD MM YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD MM YYYY',
      monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'procedures-list',
    styleUrls: ['./procedures-list.component.scss'],
    templateUrl: './procedures-list.component.html',
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},],

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
           
            for(let i = 0, len = this.procedures.length; i < len; i++){
                if(this.procedures[i].inicio_demanda){
                    this.procedures[i].inicio_demanda= moment(this.procedures[i].inicio_demanda).format('DD-MM-Y');
                }
                if(this.procedures[i].sentencia_primera_instancia){
                    this.procedures[i].sentencia_primera_instancia= moment(this.procedures[i].sentencia_primera_instancia).format('DD-MM-Y');
                }
                if(this.procedures[i].sentencia_segunda_instancia){
                    this.procedures[i].sentencia_segunda_instancia= moment(this.procedures[i].sentencia_segunda_instancia).format('DD-MM-Y');
                }
                if(this.procedures[i].sentencia_corte_suprema){
                    this.procedures[i].sentencia_corte_suprema= moment(this.procedures[i].sentencia_corte_suprema).format('DD-MM-Y');
                }
                if(this.procedures[i].inicio_de_ejecucion){
                    this.procedures[i].inicio_de_ejecucion= moment(this.procedures[i].inicio_de_ejecucion).format('DD-MM-Y');
                }
            }

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
        let content = 'Estas por Eliminar al trámite: {row.procedure_category.name}, Deseas continuar?';
        content = content.replace('{row.procedure_category.name}', deleteRowItem.procedure_category.name);

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
        this._proceduresService.delete(deleteRowItem.id).subscribe((response) => {
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
           excelList.push(this.getObjectTranslated(this.procedures[i]));
        }
        this._excelService.exportAsExcelFile(excelList, 'Listado De trámites');
    }

    getObjectTranslated(procedureData) {
        return {
           "Trámite" : procedureData.procedure_category.name,
           "Cliente" : procedureData.client.first_name + ' ' + procedureData.client.last_name,
           "Inicio demanda" : procedureData.inicio_demanda,
           "Sentencia primera instancia" : procedureData.sentencia_primera_instancia,
           "Sentencia segunda instancia" : procedureData.sentencia_segunda_instancia,
           "Sentencia corte suprema" : procedureData.sentencia_corte_suprema,
           "Inicio ejecución" : procedureData.inicio_de_ejecucion,
           "Observaciones" : procedureData.observaciones,
           
        }
    }

}
