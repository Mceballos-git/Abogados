import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component"
import {MatDialog, MatDialogConfig} from '@angular/material';

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

    // Constants.
    DEFAULT_ROLE_VALUE = 'operator';

    // Selectable Role Values
    roles = [
        { value: 'admin', text: 'Administrador'},
        { value: 'operator', text: 'Operador'},
    ];

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _userService: UsersService,
        private _dialog: MatDialog,
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
            const resourceId = this._activatedRoute.snapshot.paramMap.get('id');
            return this.initUpdate(resourceId);
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
        this.openLoadingDialog();

        if (this.action === 1) {
            this._userService.create(this.form.value).subscribe((response) => {
                this.handleSubmitSuccess(response);
            }, (error) => {
                this.handleSubmitError(error);
            });
            return;
        }

        this._userService.update(this.resourceId, this.form.value).subscribe((response) => {
            this.handleSubmitSuccess(response);
        }, (error) => {
            this.handleSubmitError(error);
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
        if (this.action === 1) {
            this._router.navigate(['users/update/' + response.id]);
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
        console.log('show error');
    }

}
