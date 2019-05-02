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
import { ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

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
    selector: 'procedures-list-by-client',
    styleUrls: ['./procedures-list-by-client.component.scss'],
    templateUrl: './procedures-list-by-client.component.html',
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},],

})

export class ProceduresListByClientComponent implements OnInit {

    dtOptions : any;
    tableData : any;

    @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef;

    displayedColumns: string[] = ['procedure_name', 'client_name', 'observaciones', 'actions'];
    procedures: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();
    balance: number;
    incomes: number;
    outcomes: number;
    pageSize=10;
    id_client:any;
    client_name:string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _proceduresService: ProceduresService,
                private _fuseConfigService: FuseConfigService,
                private _dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private _excelService:ExcelService,
                private _activatedRoute: ActivatedRoute) {
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

        this.id_client = this._activatedRoute.snapshot.paramMap.get('id');  
        //console.log(this.id_client);
        

        let that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            bAutoWidth: false,
            order: [0, 'desc'],

            ajax: (dataTablesParameters: any, callback) => {
                console.log(dataTablesParameters);
                
                that._proceduresService.getListByClient(this.id_client, dataTablesParameters).subscribe((resp: any) => {
                    console.log(resp);
                        this.procedures = resp;
                        this.loaded = true;
                        this.client_name = resp.data[0].client_name;
                        // for(let i = 0, len = this.procedures.length; i < len; i++){
                        //     if(this.procedures[i].inicio_demanda){
                        //         this.procedures[i].inicio_demanda= moment(this.procedures[i].inicio_demanda).format('DD-MM-Y');
                        //     }
                        //     if(this.procedures[i].sentencia_primera_instancia){
                        //         this.procedures[i].sentencia_primera_instancia= moment(this.procedures[i].sentencia_primera_instancia).format('DD-MM-Y');
                        //     }
                        //     if(this.procedures[i].sentencia_segunda_instancia){
                        //         this.procedures[i].sentencia_segunda_instancia= moment(this.procedures[i].sentencia_segunda_instancia).format('DD-MM-Y');
                        //     }
                        //     if(this.procedures[i].sentencia_corte_suprema){
                        //         this.procedures[i].sentencia_corte_suprema= moment(this.procedures[i].sentencia_corte_suprema).format('DD-MM-Y');
                        //     }
                        //     if(this.procedures[i].inicio_de_ejecucion){
                        //         this.procedures[i].inicio_de_ejecucion= moment(this.procedures[i].inicio_de_ejecucion).format('DD-MM-Y');
                        //     }
                        // }
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
        const title = 'Eliminar Trámite'
        let content = 'Estas por Eliminar el trámite: {row.procedure_name}, deseas continuar?';
        content = content.replace('{row.procedure_name}', deleteRowItem.procedure_name);

        const dialogRef = this._dialog.open(GenericDialogComponent, {
            data: {title: title, content: content}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(deleteRowItem);
            }
        });
    }

    delete( deleteRowItem) {
        
        this._proceduresService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(deleteRowItem)
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
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deletedItemIndex) {
        let index = this.tableData.findIndex(function(element) {
            return element.id === deletedItemIndex.id;
        });
        this.tableData.splice(index, 1);
                
        //console.log('Delete procedure successfuly');
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
        //console.log('There was an error while trying to delete procedure');
        this._snackBar.open('Se ha producido un error al eliminar el trámite', '', {
            duration: 4000,
            panelClass: ['warn']
        });
    }

    exportAsXLSX(){        
    
        let data = [];
        for(let i = 0, len = this.tableData.length; i < len; i++){
            let procedureData = {
                "Trámite" : this.tableData[i].procedure_name,
                "Cliente" : this.tableData[i].client_name,
                "Inicio demanda" : this.tableData[i].inicio_demanda,
                "Sentencia primera instancia" : this.tableData[i].sentencia_primera_instancia,
                "Sentencia segunda instancia" : this.tableData[i].sentencia_segunda_instancia,
                "Sentencia corte suprema" : this.tableData[i].sentencia_corte_suprema,
                "Inicio ejecución" : this.tableData[i].inicio_de_ejecucion,
                "Observaciones" : this.tableData[i].observaciones,
            }
            data.push(procedureData)
        }
        

        this._excelService.exportAsExcelFile(data, 'Tramites');
    
    }

    exportFullListAsXLSX(){

        this._proceduresService.getListForExport().subscribe((resp : any) => {
            let excelList = [];
            for(let i = 0, len = resp.length; i < len; i++) {
                excelList.push(this.getObjectTranslated(resp[i]));
             }
             this._excelService.exportAsExcelFile(excelList, 'Listado De trámites');
        });
        
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
