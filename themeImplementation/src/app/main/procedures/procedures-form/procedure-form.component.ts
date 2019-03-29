import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { ClientsService } from 'app/main/services/clients.service';
import { ProceduresService } from 'app/main/services/procedures.service';
import { ProcedureCategoriesService } from 'app/main/services/procedure-categories.service';



import { forkJoin } from "rxjs/observable/forkJoin";

//para dar formato a la fecha
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';

import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { NgSelectConfig } from '@ng-select/ng-select';

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


class Clients {
    value: number[];
    viewValue: string[];
}

class ProcedureCategory {
    value: number[];
    viewValue: string[];
}



@Component({
    selector: 'procedure-form',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './procedure-form.component.html',
    styleUrls: ['./procedure-form.component.scss'],
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],

})
export class ProcedureFormComponent implements OnInit {

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
    procedureCategory:any = [];
    last_name:string;    

    people3$: any;
    people3Loading = false;
    people3input$ = new Subject<string>();

    procedureCat: any;
    procedureCatLoading = false;
    procedureCatInput = new Subject<string>();

    //forkJoinResponse    
    public responseClients: any;
    public responseProcedureCategories: any;
    
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _procedureService: ProceduresService,
        private _dialog: MatDialog,
        private _snackBar:MatSnackBar,
        private _router: Router,
        private _clientsService:ClientsService,
        private _procedureCategoryService:ProcedureCategoriesService,
        private config:NgSelectConfig,

    ) {

        this.config.typeToSearchText = 'Escriba para buscar';
        this.config.notFoundText = 'No se encontraron coincidencias';
        this.config.loadingText = 'Cargando...';
        this.config.addTagText = 'Agregue letras';
        this.config.clearAllText = 'Borrar todo';

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

        this.loadPeople3();
        this.loadProcedureCategories();

        this.actionString = this._activatedRoute.snapshot.url[1].path;
        this.action = this.actionString === 'create' ? 1 : 2;
       
        if (this.action === 2) {
            this.res = this._activatedRoute.snapshot.paramMap.get('id');
            return this.initUpdate(this.res);
        }

        return this.initCreate();
        
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
        this._procedureService.getOne(resourceId).subscribe(response => {
            
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
            'procedure_category_id': new FormControl(formData.procedure_category_id),     
            'inicio_demanda': new FormControl(formData.inicio_demanda),
            'sentencia_primera_instancia': new FormControl(formData.sentencia_primera_instancia),
            'sentencia_segunda_instancia': new FormControl(formData.sentencia_segunda_instancia),
            'sentencia_corte_suprema': new FormControl(formData.sentencia_corte_suprema),
            'inicio_de_ejecucion': new FormControl(formData.inicio_de_ejecucion),
            'observaciones': new FormControl(formData.observaciones), 
            'client_id': new FormControl(formData.client_id),
            
        });

        if (this.action === 2){
            let client = { id: data.client.id, text: data.client.first_name + ' ' + data.client.last_name };
            this.form.get('client_id').setValue(client);
            let procedure = {id: data.procedure_category.id, text: data.procedure_category.name}
            this.form.get('procedure_category_id').setValue(procedure);
        }
    }

    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    private getInitialFormData(data) {
        return {

            'procedure_category_id':  data ? data.procedure_category_id : '',
            'inicio_demanda': data ? data.inicio_demanda : '',
            'sentencia_primera_instancia': data ? data.sentencia_primera_instancia : '',
            'sentencia_segunda_instancia': data ? data.sentencia_segunda_instancia : '',
            'sentencia_corte_suprema': data ? data.sentencia_corte_suprema : '',
            'inicio_de_ejecucion': data ? data.inicio_de_ejecucion : '',   
            'observaciones': data ? data.observaciones : '',   
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
        if (data.inicio_demanda){
            data.inicio_demanda = moment(data.inicio_demanda).format('Y-MM-DD');      
        }        
        if (data.sentencia_primera_instancia){
            data.sentencia_primera_instancia = moment(data.sentencia_primera_instancia).format('Y-MM-DD');
        }               
        if (data.sentencia_segunda_instancia){
            data.sentencia_segunda_instancia = moment(data.sentencia_segunda_instancia).format('Y-MM-DD');
        }
        if (data.sentencia_corte_suprema){
            data.sentencia_corte_suprema = moment(data.sentencia_corte_suprema).format('Y-MM-DD');
        }
        if (data.inicio_de_ejecucion){
            data.inicio_de_ejecucion = moment(data.inicio_de_ejecucion).format('Y-MM-DD');

        }        
       
       
        if (this.action === 1) {
            this._procedureService.create(data).subscribe((response) => {
                
                this.handleSubmitSuccess(response);
            }, (error) => {
                console.log(error);
                this.handleSubmitError(error);
            });
            return;
        }            
        

        console.log(data);
        this._procedureService.update(this.res, data).subscribe((response) => {
            
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
            this._snackBar.open('Trámite editado correctamente', '',{
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/procedures/list']);
        }
      
        if (this.action === 1) {
            this._snackBar.open('Trámite creado correctamente', '',{
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/procedures/list']);
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
            this._snackBar.open('Se ha producido un error al crear el trámite', '',{
                duration: 4000,
                panelClass: ['warn']
            });           
        }
        if(this.action === 2){
            this._snackBar.open('Se ha producido un error al editar el trámite', '',{
                duration: 4000,
                panelClass: ['warn']
            });
        }   
    }

    private loadPeople3() {
        this.people3$ = concat(
            of([]), // default items
            this.people3input$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.people3Loading = true),
                switchMap(term => this._clientsService.getClientsActiveListSelectSearch(term).pipe(


                    catchError(() => of([])), // empty list on error
                    tap(() => this.people3Loading = false)
                ))
            )
        );

    }

    private loadProcedureCategories() {
        this.procedureCat = concat(
            of([]), // default items
            this.procedureCatInput.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.procedureCatLoading = true),
                switchMap(term => this._procedureCategoryService.getProcCatListSelectSearch(term).pipe(


                    catchError(() => of([])), // empty list on error
                    tap(() => this.procedureCatLoading = false)
                ))
            )
        );

    }

  
}
