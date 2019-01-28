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

  displayedColumns: string[] = ['id', 'name', 'actions'];
  movCategories: any;
  dataSource: MatTableDataSource<any>;
  loaded: boolean;
  dtTrigger: Subject<any> = new Subject();

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
    this._movCategoriesService.getMovCategoriesList().subscribe(response => {
    this.movCategories = response;
    this.loaded = true;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.movCategories);
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
    const title = 'Eliminar Rubro'
    let content = 'Estas por Eliminar rubro: {row.name}, Deseas continuar?';
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
      this._movCategoriesService.delete(deleteRowItem.id).subscribe((response) => {
          this.handleDeletingSuccess(index)
      },(error) => { this.handleDeletingError(error)});
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
      this.movCategories.splice(deletedItemIndex, 1);
      this.updateDataSource();
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
