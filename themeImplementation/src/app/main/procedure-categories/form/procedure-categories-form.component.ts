import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { ProcedureCategoriesService } from 'app/main/services/procedure-categories.service';

@Component({
    selector: 'procedure-categories-form',
    templateUrl: './procedure-categories-form.component.html',
    styleUrls: ['./procedure-categories-form.component.scss']
})
export class ProcedureCategoriesFormComponent implements OnInit {

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

    
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _procedureCatService: ProcedureCategoriesService,
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
        this.resourceId = this.resourceId;
        this._procedureCatService.getOne(resourceId).subscribe(response => {
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
            'name': new FormControl(formData.name, Validators.required)        
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
            'name': data ? data.name : ''           
        }
    }

    /**
     * Handles Form Submit.
     *
     */
    submitForm() {
        this.openLoadingDialog();

        if (this.action === 1) {
            this._procedureCatService.create(this.form.value).subscribe((response) => {
                this.handleSubmitSuccess(response);
            }, (error) => {
                this.handleSubmitError(error);
            });
            return;
        }      

        this._procedureCatService.updateCategories(this.res, this.form.value).subscribe((response) => {
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
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/procedure-categories/list']);
        }
      
        if (this.action === 1) {
            this._snackBar.open('Trámite creado correctamente', '',{
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/procedure-categories/list']);
        }
        //console.log('show success message');
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
                duration: 3000,
                panelClass: ['warn']
            });           
        }
        if(this.action === 2){
            this._snackBar.open('Se ha producido un error al editar el trámite', '',{
                duration: 3000,
                panelClass: ['warn']
            });
        }       
        //console.log('show error');
    }

}
