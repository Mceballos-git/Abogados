import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog,MatSnackBar} from '@angular/material';
import {UsersService} from "../../services/users.service";
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {GenericDialogComponent} from "../../common/generic-dialog/generic-dialog.component";
import {FuseConfigService} from '@fuse/services/config.service';
import { UserSecurityService } from 'app/main/services/user-security.service';

@Component({
    selector: 'user-list',
    styleUrls: ['user-list.component.scss'],
    templateUrl: 'user-list.component.html',
})

export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'active', 'actions'];
    users: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _usersService: UsersService,
        private _dialog: MatDialog,
        private _fuseConfigService: FuseConfigService,
        private _userSecurityService:UserSecurityService,
        private _snackBar:MatSnackBar
    ) {
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

    ngOnInit() {

        this._usersService.getUsersList().subscribe(response => {
            this.users = response;
            this.loaded = true;              

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.users);
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
        const title = 'Eliminar Operador'
        let content = 'Estas por Eliminar al Operador: {row.first_name}, Deseas continuar?';
        content = content.replace('{row.first_name}', deleteRowItem.first_name);

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
        this._usersService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(index)
        }, (error) => {
            this.handleDeletingError(error)
        });
    }

    /**
     * Update DataSource so entries get deleted from view.
     */
    updateDataSource() {
        this.dataSource.data = this.users;
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deletedItemIndex) {
        this.users.splice(deletedItemIndex, 1);
        this.updateDataSource();
        console.log('Delete user successfuly. Todo: Mostrar mensaje delete exitoso');
        this._snackBar.open('Operador eliminado correctamente', '',{
            duration: 4000,
            panelClass: ['green']
        });
    }

    /**
     * Handle deletion process errors.
     * @param response
     */
    handleDeletingError(response) {
        console.log('There was an error while trying to delete user. Todo: Mostrar mensaje delete no exitoso');
        this._snackBar.open('Se ha producido un error al eliminar el operador', '',{
            duration: 4000,
            panelClass: ['warn']
        });
    }

    activate(id, index){        
        this._userSecurityService.activate(id).subscribe((response)=>{
            console.log('user activated ok'); 
            this.users[index].active = 1;         
            this.updateDataSource();
        }, (error)=>{
            console.log(error);            
        });
    }

    deactivate(id, index){
        this._userSecurityService.deactivate(id).subscribe((response)=>{
            console.log('user deactivated ok');   
            this.users[index].active = 0;       
            this.updateDataSource();
        }, (error)=>{
            console.log(error);
            
        });
    }
}
