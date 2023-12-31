import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

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
    userExists:boolean;
    emailExists:boolean;

    // Constants.
    DEFAULT_ROLE_VALUE = 'operator';

    // Selectable Role Values
    roles = [
        { value: 'admin', text: 'Administrador'},
        { value: 'operator', text: 'Operador'},
    ];

    //hours
    hours = ['00:00:00:00', '00:30:00','01:00:00', '01:30:00','02:00:00', '02:30:00','03:00:00', '03:30:00','04:00:00', '04:30:00','05:00:00', '05:30:00','06:00:00', '06:30:00',
        '07:00:00', '07:30:00','08:00:00', '08:30:00','09:00:00', '09:30:00','10:00:00', '10:30:00','11:00:00', '11:30:00','12:00:00', '12:30:00','13:00:00', '13:30:00',
        '14:00:00', '14:30:00','15:00:00', '15:30:00','16:00:00', '16:30:00','17:00:00', '17:30:00','18:00:00', '18:30:00','19:00:00', '19:30:00','20:00:00', '20:30:00',
        '21:00:00', '21:30:00','22:00:00', '22:30:00','23:00:00', '23:30:00','24:00:00', '24:30:00'
    ];
    
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _userService: UsersService,
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

    //snackbar
    // openSnackBar(message: string, action:string) {
    //     this._snackBar.open(message,  action,{
    //       duration: 3000,
    //       panelClass: ['green-snackbar']
    //     });
    // }


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
        this.resourceId = this.resourceId;
        this._userService.getOne(resourceId).subscribe(response => {
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
            'first_name': new FormControl(formData.first_name, Validators.required),
            'last_name': new FormControl(formData.last_name, Validators.required),
            'username': new FormControl(formData.username, Validators.required),
            'email': new FormControl(formData.email, [Validators.required, Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")]),
            'role': new FormControl(formData.role, Validators.required),
            'active': new FormControl(formData.active),
            'degree': new FormControl(formData.degree),
            'position': new FormControl(formData.position),
            'shift_start': new FormControl(formData.shift_start),
            'shift_end': new FormControl(formData.shift_end)
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
            'first_name': data ? data.first_name : '',
            'last_name': data ? data.last_name : '',
            'username':  data ? data.username : '',
            'email': data ? data.email : '',
            'role': data ? this.getRole(data.role_list) : this.DEFAULT_ROLE_VALUE,
            'active': data ? data.active : '',
            'degree': data ? data.degree : '',
            'position': data ? data.position : '',
            'shift_start':data ? data.shift_start : '',
            'shift_end': data ? data.shift_end : '',
        }
    }

    /**
     * Get Role
     *
     * @param roleArray
     * @returns {any}
     */
    private getRole(roleArray) {
        return roleArray ? roleArray[0] : this.DEFAULT_ROLE_VALUE;
    }

    /**
     * Handles Form Submit.
     *
     */
    submitForm() {
        this.userExists=false;
        this.emailExists=false;
        this.openLoadingDialog();

        if (this.action === 1) {
            this._userService.create(this.form.value).subscribe((response) => {
                this.handleSubmitSuccess(response);
            }, (error) => {
                this.handleSubmitError(error);
            });
            return;
        }      

        this._userService.update(this.res, this.form.value).subscribe((response) => {
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
        if (this.action === 2){
            this._snackBar.open('Usuario editado correctamente', '',{
                duration: 3000,
                panelClass: ['green']
            });
        }

        if (this.action === 1) {
            this._snackBar.open('Usuario creado correctamente', '',{
                duration: 4000,
                panelClass: ['green']
            });            
        }
        this._router.navigate(['/users/list']);
    }

    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    handleSubmitError(response): void {
        
        this.loadingDialogRef.close();
        this._snackBar.open('Se ha producido un error al editar el usuario', '',{
            duration: 4000,
            panelClass: ['warn']
        });
        if(response.error.details.message.username)
        {
            if(response.error.details.message.username[0] === "The username has already been taken.")
            {
                this.userExists = true; 
            }
        }
        
        if(response.error.details.message.email)
        {
            if(response.error.details.message.email[0] === "The email has already been taken.")
            {
                this.emailExists = true; 
            }
        }
        
    }


}
