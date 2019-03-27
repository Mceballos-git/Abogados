import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { MovementsService } from 'app/main/services/movements.service';
import { ClientsService } from 'app/main/services/clients.service';
import { MovementCategoriesService } from 'app/main/services/movement-categories.service';



import { forkJoin } from "rxjs/observable/forkJoin";

//para dar formato a la fecha
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'

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

export interface MovType {
    value: number;
    viewValue: string;
}
  
class Offices {
    value: number[];
    viewValue: string[];
}

class Clients {
    value: number[];
    viewValue: string[];
}

class MovCategory {
    value: number[];
    viewValue: string[];
}

@Component({
    selector: 'movement-form',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './movement-form.component.html',
    styleUrls: ['./movement-form.component.scss'],
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})
export class MovementFormComponent implements OnInit {

    // Properties.
    loadingDialogRef : any;
    dtTrigger: Subject<any> = new Subject();
    actionString: string;
    action: number;
    resourceId: number;
    resource: any;
    loading: boolean;
    form: FormGroup;
    res:any;
    office:any=[];
    client:any = [];
    movCategory:any = [];
    last_name:string;

    //para llenar combo de tipos de movimientos
    mov_type : MovType[] = [
        {value : 1 , viewValue : 'EGRESO'},
        {value : 2 , viewValue : 'INGRESO'},
    ] 

    //forkJoinResponse
    public responseOffices: any;
    public responseClients: any;
    public responseMovCategories: any;
    
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _movementService: MovementsService,
        private _dialog: MatDialog,
        private _snackBar:MatSnackBar,
        private _router: Router,
        private _clientsService:ClientsService,
        private _movCategoryService:MovementCategoriesService

    ) {
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

        this.loading = true;
    }


    ngOnInit() {

        this.loading = true;

        this.actionString = this._activatedRoute.snapshot.url[1].path;
        this.action = this.actionString === 'create' ? 1 : 2;
       
        // let clients = this._clientsService.getClientsActiveList();
        // let movCategories = this._movCategoryService.getMovCategoriesList();

        // forkJoin([ clients, movCategories]).subscribe((responseList)=>{
            
        //     this.responseClients = responseList[0];
        //     this.responseMovCategories = responseList[1];

        //     console.log("Done");              

        //     for(var i=0;i<this.responseClients.length;i++){
        //         this.client[i] = new Clients();

        //         this.client[i].value = this.responseClients[i].id;
        //         if(this.responseClients[i].last_name === null){
        //             this.last_name = '';
        //         }
        //         else{
        //             this.last_name = this.responseClients[i].last_name;
        //         }
        //         this.client[i].viewValue =  this.last_name + ' ' + this.responseClients[i].first_name;
        //     }

        //     for(var i=0;i<this.responseMovCategories.length;i++){
        //         this.movCategory[i] = new MovCategory();

        //         this.movCategory[i].value = this.responseMovCategories[i].id;
        //         this.movCategory[i].viewValue = this.responseMovCategories[i].name;
        //     }

        //     if (this.action === 2) {
        //         this.res = this._activatedRoute.snapshot.paramMap.get('id');
        //         return this.initUpdate(this.res);
        //     }
    
        //     return this.initCreate();
            
        // }, (error)=>{
        //     console.log(error);            
        // });

        
    }

    /**
     * Initialize Form View For Create.
     */
    initCreate() {
        this.createForm(false);
        this.loading = false;
    }

    /**
     * Initialize form view For update.
     * @param resourceId
     */
    initUpdate(resourceId) {
        this.resourceId = this.resourceId;
        this._movementService.getOne(resourceId).subscribe(response => {
            this.resource = response;
            this.createForm(response);
            this.loading = false;
            this.dtTrigger.next();
        }, (error) => {
            console.log(error);
        });
    }

    /**
     * Creates Form.
     *
     * @param data
     */
    private createForm(data) {
        const formData = this.getInitialFormData(data);

        this.form = new FormGroup({
            'datetime': new FormControl(moment()),     
            'amount': new FormControl(formData.amount, Validators.required),
            'concept': new FormControl(formData.concept, Validators.required),
            'movement_type_id': new FormControl(formData.movement_type_id, Validators.required),
            'movement_category_id': new FormControl(formData.movement_category_id), 
            'client_id': new FormControl(formData.client_id),
            
        });
    }

    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    private getInitialFormData(data) {
        return {

            'datetime':  data ? data.datetime : '',
            'amount': data ? data.amount : 0,
            'concept': data ? data.concept : '',
            'movement_type_id': data ? data.movement_type_id : '',
            'movement_category_id': data ? data.movement_category_id : '',   
            'client_id':  data ? data.client_id : '',    
        }
    }

    /**
     * Handles Form Submit.
     *
     */
    submitForm() {
        this.openLoadingDialog();

        let data = this.form.value;
        console.log(moment(data.datetime).format('Y-MM-DD'));
        data.datetime = moment(data.datetime).format('Y-MM-DD');

        if (this.action === 1) {
            this._movementService.create(data).subscribe((response) => {
                console.log(data);
                
                this.handleSubmitSuccess(response);
            }, (error) => {
                console.log(data);
                this.handleSubmitError(error);
            });
            return;
        }            
        

        this._movementService.update(this.res, data).subscribe((response) => {
            this.handleSubmitSuccess(response); 
        }, (error) => {
            this.handleSubmitError(error);   
            return;
        });
    }

    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    openLoadingDialog(): any {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.loadingDialogRef = this._dialog.open(LoadingDialogComponent, dialogConfig);
    }


    /**
     * Handle Login request Response Success.
     *
     * @param response
     */
    handleSubmitSuccess(response): void {
        this.loadingDialogRef.close();
        if(this.action === 2){
            this._snackBar.open('Movimiento editado correctamente', '',{
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/movements/list']);
        }
      
        if (this.action === 1) {
            this._snackBar.open('Movimiento creado correctamente', '',{
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/movements/list']);
        }
        console.log('show success message');
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handleSubmitError(response): void {
        this.loadingDialogRef.close();
        if (this.action === 1) {
            this._snackBar.open('Se ha producido un error al crear el movimento', '',{
                duration: 4000,
                panelClass: ['warn']
            });           
        }
        if(this.action === 2){
            this._snackBar.open('Se ha producido un error al editar el movimento', '',{
                duration: 4000,
                panelClass: ['warn']
            });
        }   
    }

}
