import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { ClientsService } from 'app/main/services/clients.service';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import { FuseConfigService } from '@fuse/services/config.service';
import { GenericDialogComponent } from 'app/main/common/generic-dialog/generic-dialog.component';

@Component({
    selector: 'client-list',
    styleUrls: ['./client-list.component.scss'],
    templateUrl: './client-list.component.html',
})

export class ClientListComponent implements OnInit {

    displayedColumns: string[] = ['last_name', 'first_name', 'identification_number', 'city', 'email', 'actions'];
    clients: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _clientsService: ClientsService,
                private _fuseConfigService:FuseConfigService,
                private _dialog:MatDialog) {
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

        this._clientsService.getClientsList().subscribe(response => {
            this.clients = response;
            this.loaded = true;    
            

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

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
        const title = 'Eliminar Cliente'
        let content = 'Estas por Eliminar al Cliente: {row.first_name}, Deseas continuar?';
        content = content.replace('{row.first_name}', deleteRowItem.first_name);

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

    delete(index, deleteRowItem){
        this._clientsService.delete(deleteRowItem.id).subscribe((response) => {
            this.handleDeletingSuccess(index)
        },(error) => { this.handleDeletingError(error)});  
    }

    /**
     * Update DataSource so entries get deleted from view.
     */
    updateDataSource() {
        this.dataSource.data = this.clients;
    }

    /**
     * Handle Deletion process
     * @param deletedItemIndex
     */
    handleDeletingSuccess(deletedItemIndex) {
        this.clients.splice(deletedItemIndex, 1);
        this.updateDataSource();
        console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');
    }

    /**
     * Handle deletion process errors.
     * @param response
     */
    handleDeletingError(response) {
        console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
    }

    activate(id, index){        
        this._clientsService.activate(id).subscribe((response)=>{
            console.log('client activated ok'); 
            this.clients[index].active = 1;         
            this.updateDataSource();
        }, (error)=>{
            console.log(error);            
        });
    }

    deactivate(id, index){
        this._clientsService.deactivate(id).subscribe((response)=>{
            console.log('client deactivated ok');   
            this.clients[index].active = 0;       
            this.updateDataSource();
        }, (error)=>{
            console.log(error);
            
        });
    }

}
