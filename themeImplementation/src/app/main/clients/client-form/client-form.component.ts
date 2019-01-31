import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { ClientsService } from 'app/main/services/clients.service';

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
    selector: 'client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],

})
export class ClientFormComponent implements OnInit {

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

    id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];
    
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _clientService: ClientsService,
        private _dialog: MatDialog,
        private _snackBar:MatSnackBar,
        private _router: Router
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
        this.resourceId = resourceId;
        this._clientService.getOne(resourceId).subscribe(response => {
            this.resource = response;
            this.createForm(response);
            this.form.markAsTouched();
            for (let control in this.form.controls) {
                this.form.controls[control].markAsTouched();
            };
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
            'active': new FormControl(formData.active),     
            'first_name': new FormControl(formData.first_name, Validators.required),
            'last_name': new FormControl(formData.last_name, Validators.required),
            'nationality': new FormControl(formData.nationality),
            'identification_type': new FormControl(formData.identification_type),
            'identification_number': new FormControl(formData.identification_number),
            'tin_number': new FormControl(formData.tin_number),
            'date_of_birth': new FormControl(formData.date_of_birth),
            'phone_number': new FormControl(formData.phone_number),
            'email': new FormControl(formData.email, Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")),
            'street_address':new FormControl(formData.street_address),
            'number_address': new FormControl(formData.number_address),
            'floor_address': new FormControl(formData.floor_address),
            'department_address':new FormControl(formData.department_address),
            'country': new FormControl(formData.country),
            'state':new FormControl(formData.state), 
            'city':new FormControl(formData.city),
            'observations': new FormControl(formData.observations),
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

            'active':  data ? data.active : '',    
            'first_name':  data ? data.first_name : '',
            'last_name': data ? data.last_name : '',
            'nationality': data ? data.nationality : '',
            'identification_type': data ? data.identification_type : '',
            'identification_number': data ? data.identification_number : '',
            'tin_number': data ? data.tin_number : '',
            'date_of_birth': data ? data.date_of_birth : '',
            'phone_number': data ? data.phone_number : '',
            'email': data ? data.email : '',
            'street_address':data ? data.street_address : '',
            'number_address': data ? data.number_address : '',
            'floor_address': data ? data.floor_address : '',
            'department_address':data ? data.department_address : '',
            'country': data ? data.country : '',
            'state': data ? data.state : '',
            'city':data ? data.city : '',
            'observations': data ? data.observations : '',
            'extra': data ? data.extra : '',
            
        }
    }

    /**
     * Handles Form Submit.
     *
     */
    submitForm() {
        this.openLoadingDialog();
        let data = this.form.value;

        if(data.date_of_birth) {
            data.date_of_birth = moment(data.date_of_birth).format('Y-MM-DD');
        }

        if (this.action === 1) {
            this._clientService.create(data).subscribe((response) => {
                console.log(data);
                
                this.handleSubmitSuccess(response);
            }, (error) => {
                console.log(data);
                this.handleSubmitError(error);
            });
            return;
        }            
        

        this._clientService.update(this.res, data).subscribe((response) => {
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
            this._snackBar.open('Cliente editado correctamente', '',{
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/clients/list']);
        }
      
        if (this.action === 1) {
            this._snackBar.open('Cliente creado correctamente', '',{
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/clients/list']);
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
            this._snackBar.open('Se ha producido un error al crear el cliente', '',{
                duration: 3000,
                panelClass: ['warn']
            });           
        }
        if(this.action === 2){
            this._snackBar.open('Se ha producido un error al editar el cliente', '',{
                duration: 3000,
                panelClass: ['warn']
            });
        }   
    }

}
