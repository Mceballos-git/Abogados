import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {GenericDialogComponent} from "../../common/generic-dialog/generic-dialog.component";
import { FuseConfigService } from '@fuse/services/config.service';
import { MovementCategoriesService } from 'app/main/services/movement-categories.service';


@Component({
  selector: 'app-movements-categories',
  templateUrl: './movements-categories.component.html',
  styleUrls: ['./movements-categories.component.scss']
})
export class MovementsCategoriesComponent implements OnInit {

  dtOptions : any;
  tableData : any
  displayedColumns: string[] = ['id', 'movement_category_name', 'actions'];
  movCategories: any;
  dataSource: MatTableDataSource<any>;
  loaded: boolean;
  dtTrigger: Subject<any> = new Subject();
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _movCategoriesService: MovementCategoriesService,
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
            order:[0,'desc'],
            
            ajax: (dataTablesParameters: any, callback) => {
                that._movCategoriesService.getMovCategoriesList(dataTablesParameters).subscribe((resp : any) => {
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
    const title = 'Eliminar Rubro'
    let content = 'Estas por Eliminar rubro: {row.movement_category_name}, Deseas continuar?';
    content = content.replace('{row.movement_category_name}', deleteRowItem.movement_category_name);

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
        //const index = this.getElementIndex(pageElementIndex);
        this._movCategoriesService.delete(deleteRowItem.id).subscribe((response) => {
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
      this.dataSource.data = this.movCategories;
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
      console.log('Delete movement-category successfuly. Todo: Mostrar mensaje delete exitoso');
      this._snackBar.open('Rubro eliminado correctamente', '',{
        duration: 4000,
        panelClass: ['green']
    });
  }

  /**
   * Handle deletion process errors.
   * @param response
   */
  handleDeletingError(response) {
      console.log('There was an error while trying to delete movement-category. Todo: Mostrar mensaje delete no exitoso');
      this._snackBar.open('Se ha producido un error al eliminar el rubro', '',{
        duration: 4000,
        panelClass: ['warn']
    });
  }

}
