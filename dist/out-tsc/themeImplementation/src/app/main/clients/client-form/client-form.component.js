"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
var config_service_1 = require("../../../../@fuse/services/config.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var loading_dialog_component_1 = require("../../common/loading-dialog/loading-dialog.component");
var material_1 = require("@angular/material");
var clients_service_1 = require("app/main/services/clients.service");
//para dar formato a la fecha
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var core_2 = require("@angular/material/core");
var _moment = require("moment");
var moment = _moment;
exports.MY_FORMATS = {
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
var ClientFormComponent = /** @class */ (function () {
    function ClientFormComponent(_fuseConfigService, _activatedRoute, _clientService, _dialog, _snackBar, _router) {
        this._fuseConfigService = _fuseConfigService;
        this._activatedRoute = _activatedRoute;
        this._clientService = _clientService;
        this._dialog = _dialog;
        this._snackBar = _snackBar;
        this._router = _router;
        this.dtTrigger = new rxjs_1.Subject();
        this.id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];
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
    ClientFormComponent.prototype.ngOnInit = function () {
        this.actionString = this._activatedRoute.snapshot.url[1].path;
        this.action = this.actionString === 'create' ? 1 : 2;
        if (this.action === 2) {
            this.res = this._activatedRoute.snapshot.paramMap.get('id');
            return this.initUpdate(this.res);
        }
        return this.initCreate();
    };
    /**
     * Initialize Form View For Create.
     */
    ClientFormComponent.prototype.initCreate = function () {
        this.createForm(false);
        this.loading = false;
    };
    /**
     * Initialize form view For update.
     * @param resourceId
     */
    ClientFormComponent.prototype.initUpdate = function (resourceId) {
        var _this = this;
        this.resourceId = this.resourceId;
        this._clientService.getOne(resourceId).subscribe(function (response) {
            _this.resource = response;
            _this.createForm(response);
            _this.loading = false;
            _this.dtTrigger.next();
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Creates Form.
     *
     * @param data
     */
    ClientFormComponent.prototype.createForm = function (data) {
        var formData = this.getInitialFormData(data);
        this.form = new forms_1.FormGroup({
            'active': new forms_1.FormControl(formData.active),
            'first_name': new forms_1.FormControl(formData.first_name, forms_1.Validators.required),
            'last_name': new forms_1.FormControl(formData.last_name, forms_1.Validators.required),
            'nationality': new forms_1.FormControl(formData.nationality),
            'identification_type': new forms_1.FormControl(formData.identification_type, forms_1.Validators.required),
            'identification_number': new forms_1.FormControl(formData.identification_number, forms_1.Validators.required),
            'tin_number': new forms_1.FormControl(formData.tin_number),
            'date_of_birth': new forms_1.FormControl(formData.date_of_birth, forms_1.Validators.required),
            'phone_number': new forms_1.FormControl(formData.phone_number, forms_1.Validators.required),
            'email': new forms_1.FormControl(formData.email, forms_1.Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")),
            'street_address': new forms_1.FormControl(formData.street_address, forms_1.Validators.required),
            'number_address': new forms_1.FormControl(formData.number_address, forms_1.Validators.required),
            'floor_address': new forms_1.FormControl(formData.floor_address),
            'department_address': new forms_1.FormControl(formData.department_address),
            'country': new forms_1.FormControl(formData.country),
            'state': new forms_1.FormControl(formData.state),
            'city': new forms_1.FormControl(formData.city),
            'observations': new forms_1.FormControl(formData.observations),
        });
    };
    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    ClientFormComponent.prototype.getInitialFormData = function (data) {
        return {
            'active': data ? data.active : '',
            'first_name': data ? data.first_name : '',
            'last_name': data ? data.last_name : '',
            'nationality': data ? data.nationality : '',
            'identification_type': data ? data.identification_type : '',
            'identification_number': data ? data.identification_number : '',
            'tin_number': data ? data.tin_number : '',
            'date_of_birth': data ? data.date_of_birth : '',
            'phone_number': data ? data.phone_number : '',
            'email': data ? data.email : '',
            'street_address': data ? data.street_address : '',
            'number_address': data ? data.number_address : '',
            'floor_address': data ? data.floor_address : '',
            'department_address': data ? data.department_address : '',
            'country': data ? data.country : '',
            'state': data ? data.state : '',
            'city': data ? data.city : '',
            'observations': data ? data.observations : '',
            'extra': data ? data.extra : '',
        };
    };
    /**
     * Handles Form Submit.
     *
     */
    ClientFormComponent.prototype.submitForm = function () {
        var _this = this;
        this.openLoadingDialog();
        var data = this.form.value;
        console.log(moment(data.date_of_birth).format('Y-MM-DD'));
        data.date_of_birth = moment(data.date_of_birth).format('Y-MM-DD');
        if (this.action === 1) {
            this._clientService.create(data).subscribe(function (response) {
                console.log(data);
                _this.handleSubmitSuccess(response);
            }, function (error) {
                console.log(data);
                _this.handleSubmitError(error);
            });
            return;
        }
        this._clientService.update(this.res, data).subscribe(function (response) {
            _this.handleSubmitSuccess(response);
        }, function (error) {
            _this.handleSubmitError(error);
            return;
        });
    };
    /**
     * Open loading dialog
     *
     * @returns {any}
     */
    ClientFormComponent.prototype.openLoadingDialog = function () {
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.loadingDialogRef = this._dialog.open(loading_dialog_component_1.LoadingDialogComponent, dialogConfig);
    };
    /**
     * Handle Login request Response Success.
     *
     * @param response
     */
    ClientFormComponent.prototype.handleSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 2) {
            this._snackBar.open('Cliente editado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/clients/list']);
        }
        if (this.action === 1) {
            this._snackBar.open('Cliente creado correctamente', '', {
                duration: 3000,
                panelClass: ['green']
            });
            this._router.navigate(['/clients/list']);
        }
        console.log('show success message');
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    ClientFormComponent.prototype.handleSubmitError = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 1) {
            this._snackBar.open('Se ha producido un error al crear el cliente', '', {
                duration: 3000,
                panelClass: ['warn']
            });
        }
        if (this.action === 2) {
            this._snackBar.open('Se ha producido un error al editar el cliente', '', {
                duration: 3000,
                panelClass: ['warn']
            });
        }
    };
    var _a;
    ClientFormComponent = __decorate([
        core_1.Component({
            selector: 'client-form',
            templateUrl: './client-form.component.html',
            styleUrls: ['./client-form.component.scss'],
            providers: [{ provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: exports.MY_FORMATS },
            ],
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            router_1.ActivatedRoute, typeof (_a = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _a : Object, material_1.MatDialog,
            material_1.MatSnackBar,
            router_1.Router])
    ], ClientFormComponent);
    return ClientFormComponent;
}());
exports.ClientFormComponent = ClientFormComponent;
//# sourceMappingURL=client-form.component.js.map