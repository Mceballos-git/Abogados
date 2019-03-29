import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {GenericDialogComponent} from "../../common/generic-dialog/generic-dialog.component";
import { FuseConfigService } from '@fuse/services/config.service';
import { ProcedureCategoriesService } from 'app/main/services/procedure-categories.service';


@Component({
  selector: 'app-procedure-categories',
  templateUrl: './procedure-categories.component.html',
  styleUrls: ['./procedure-categories.component.scss']
})
export class ProcedureCategoriesComponent implements OnInit {

  dtOptions : any;
  tableData : any
  displayedColumns: string[] = ['id', 'procedure_category_name', 'actions'];
  procedureCategories: any;
  dataSource: MatTableDataSource<any>;
  loaded: boolean;
  dtTrigger: Subject<any> = new Subject();
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _procedureCategoriesService: ProcedureCategoriesService,
    private _dialog: MatDialog,
    private _fuseConfigService:FuseConfigService,
    private _snackBar:MatSnackBar) 
    {
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
            bAutoWidth: false,
            ajax: (dataTablesParameters: any, callback) => {
                that._procedureCategoriesService.getCategoriesList(dataTablesParameters).subscribe((resp : any) => {
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
    let content = 'Estas por Eliminar trámite: {row.procedure_category_name}, Deseas continuar?';
    content = content.replace('{row.procedure_category_name}', deleteRowItem.procedure_category_name);

    const dialogRef = this._dialog.open(GenericDialogComponent, {
        data: {title: title, content: content}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result){
            this.delete(deleteRowItem);
        }           
    });
  }

    delete(deleteRowItem) {        
        this._procedureCategoriesService.delete(deleteRowItem.id).subscribe((response) => {
          this.handleDeletingSuccess(deleteRowItem)
      },(error) => { this.handleDeletingError(error)});
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
      this.dataSource.data = this.procedureCategories;
  }

  /**
   * Handle Deletion process
   * @param deletedItemIndex
   */
  handleDeletingSuccess(deletedItemIndex) {
      this.procedureCategories.splice(deletedItemIndex, 1);
      console.log(deletedItemIndex);
      
      this.updateDataSource();
      console.log('Delete procedure-category successfuly. Todo: Mostrar mensaje delete exitoso');
      this._snackBar.open('Trámite eliminado correctamente', '',{
        duration: 4000,
        panelClass: ['green']
    });
  }

  /**
   * Handle deletion process errors.
   * @param response
   */
  handleDeletingError(response) {
      console.log('There was an error while trying to delete procedure-category. Todo: Mostrar mensaje delete no exitoso');
      this._snackBar.open('Se ha producido un error al eliminar el trámite', '',{
        duration: 4000,
        panelClass: ['warn']
    });
  }

}
