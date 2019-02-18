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

  displayedColumns: string[] = ['id', 'name', 'actions'];
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
    this._procedureCategoriesService.getCategoriesList().subscribe(response => {
    this.procedureCategories = response;
    this.loaded = true;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.procedureCategories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.paginator._intl.getRangeLabel =function(page, pageSize, length){
        if (length == 0 || pageSize == 0) { return `0 de ${length}`; } length = Math.max(length, 0); 
        const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; 
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
    let content = 'Estas por Eliminar trámite: {row.name}, Deseas continuar?';
    content = content.replace('{row.name}', deleteRowItem.name);

    const dialogRef = this._dialog.open(GenericDialogComponent, {
        data: {title: title, content: content}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result){
            this.delete(index, deleteRowItem);
        }           
    });
  }

  delete(index, deleteRowItem) {
      this._procedureCategoriesService.delete(deleteRowItem.id).subscribe((response) => {
          this.handleDeletingSuccess(index)
      },(error) => { this.handleDeletingError(error)});
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
