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
var movements_service_1 = require("app/main/services/movements.service");
var offices_service_1 = require("app/main/services/offices.service");
var clients_service_1 = require("app/main/services/clients.service");
var movement_categories_service_1 = require("app/main/services/movement-categories.service");
var forkJoin_1 = require("rxjs/observable/forkJoin");
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
var Offices = /** @class */ (function () {
    function Offices() {
    }
    return Offices;
}());
var Clients = /** @class */ (function () {
    function Clients() {
    }
    return Clients;
}());
var MovCategory = /** @class */ (function () {
    function MovCategory() {
    }
    return MovCategory;
}());
var MovementFormComponent = /** @class */ (function () {
    function MovementFormComponent(_fuseConfigService, _activatedRoute, _movementService, _dialog, _snackBar, _router, _officesService, _clientsService, _movCategoryService) {
        this._fuseConfigService = _fuseConfigService;
        this._activatedRoute = _activatedRoute;
        this._movementService = _movementService;
        this._dialog = _dialog;
        this._snackBar = _snackBar;
        this._router = _router;
        this._officesService = _officesService;
        this._clientsService = _clientsService;
        this._movCategoryService = _movCategoryService;
        this.dtTrigger = new rxjs_1.Subject();
        this.office = [];
        this.client = [];
        this.movCategory = [];
        //para llenar combo de tipos de movimientos
        this.mov_type = [
            { value: 1, viewValue: 'PAGO' },
            { value: 1, viewValue: 'VENTA' },
        ];
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
    MovementFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.actionString = this._activatedRoute.snapshot.url[1].path;
        this.action = this.actionString === 'create' ? 1 : 2;
        if (this.action === 2) {
            this.res = this._activatedRoute.snapshot.paramMap.get('id');
            return this.initUpdate(this.res);
        }
        var offices = this._officesService.getList();
        var clients = this._clientsService.getClientsList();
        var movCategories = this._movCategoryService.getMovCategoriesList();
        forkJoin_1.forkJoin([offices, clients, movCategories]).subscribe(function (responseList) {
            _this.responseOffices = responseList[0];
            _this.responseClients = responseList[1];
            _this.responseMovCategories = responseList[2];
            console.log(_this.responseOffices[0].name);
            for (var i = 0; i < _this.responseOffices.length; i++) {
                _this.office[i] = new Offices();
                _this.office[i].value = _this.responseOffices[i].id;
                _this.office[i].viewValue = _this.responseOffices[i].name;
            }
        }, function (error) {
            console.log(error);
        });
        return this.initCreate();
    };
    /**
     * Initialize Form View For Create.
     */
    MovementFormComponent.prototype.initCreate = function () {
        this.createForm(false);
        this.loading = false;
    };
    /**
     * Initialize form view For update.
     * @param resourceId
     */
    MovementFormComponent.prototype.initUpdate = function (resourceId) {
        var _this = this;
        this.resourceId = this.resourceId;
        this._movementService.getOne(resourceId).subscribe(function (response) {
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
    MovementFormComponent.prototype.createForm = function (data) {
        var formData = this.getInitialFormData(data);
        this.form = new forms_1.FormGroup({
            'datetime': new forms_1.FormControl(moment()),
            'amount': new forms_1.FormControl(formData.amount, forms_1.Validators.required),
            'concept': new forms_1.FormControl(formData.concept, forms_1.Validators.required),
            'movement_type_id': new forms_1.FormControl(formData.movement_type_id),
            'movement_category_id': new forms_1.FormControl(formData.movement_category_id, forms_1.Validators.required),
            'client_id': new forms_1.FormControl(formData.client_id, forms_1.Validators.required),
        });
    };
    /**
     * Set initial Form Data.
     *
     * @param data
     * @returns {}
     */
    MovementFormComponent.prototype.getInitialFormData = function (data) {
        return {
            'datetime': data ? data.datetime : '',
            'amount': data ? data.amount : 0,
            'concept': data ? data.concept : '',
            'movement_type_id': data ? data.movement_type_id : '',
            'movement_category_id': data ? data.movement_category_id : '',
            'client_id': data ? data.client_id : '',
        };
    };
    /**
     * Handles Form Submit.
     *
     */
    MovementFormComponent.prototype.submitForm = function () {
        var _this = this;
        this.openLoadingDialog();
        var data = this.form.value;
        console.log(moment(data.datetime).format('Y-MM-DD'));
        data.datetime = moment(data.datetime).format('Y-MM-DD');
        if (this.action === 1) {
            this._movementService.create(data).subscribe(function (response) {
                console.log(data);
                _this.handleSubmitSuccess(response);
            }, function (error) {
                console.log(data);
                _this.handleSubmitError(error);
            });
            return;
        }
        this._movementService.update(this.res, data).subscribe(function (response) {
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
    MovementFormComponent.prototype.openLoadingDialog = function () {
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
    MovementFormComponent.prototype.handleSubmitSuccess = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 2) {
            this._snackBar.open('Movimiento editado correctamente', '', {
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/clients/list']);
        }
        if (this.action === 1) {
            this._snackBar.open('Movimiento creado correctamente', '', {
                duration: 4000,
                panelClass: ['green']
            });
            this._router.navigate(['/movements/list']);
        }
        console.log('show success message');
    };
    /**
     * Handle Login request Response Failure.
     *
     * @param response
     */
    MovementFormComponent.prototype.handleSubmitError = function (response) {
        this.loadingDialogRef.close();
        if (this.action === 1) {
            this._snackBar.open('Se ha producido un error al crear el movimento', '', {
                duration: 4000,
                panelClass: ['warn']
            });
        }
        if (this.action === 2) {
            this._snackBar.open('Se ha producido un error al editar el movimento', '', {
                duration: 4000,
                panelClass: ['warn']
            });
        }
    };
    var _a, _b, _c, _d;
    MovementFormComponent = __decorate([
        core_1.Component({
            selector: 'movement-form',
            templateUrl: './movement-form.component.html',
            styleUrls: ['./movement-form.component.scss'],
            providers: [{ provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: exports.MY_FORMATS },
            ],
        }),
        __metadata("design:paramtypes", [config_service_1.FuseConfigService,
            router_1.ActivatedRoute, typeof (_a = typeof movements_service_1.MovementsService !== "undefined" && movements_service_1.MovementsService) === "function" ? _a : Object, material_1.MatDialog,
            material_1.MatSnackBar,
            router_1.Router, typeof (_b = typeof offices_service_1.OfficesService !== "undefined" && offices_service_1.OfficesService) === "function" ? _b : Object, typeof (_c = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _c : Object, typeof (_d = typeof movement_categories_service_1.MovementCategoriesService !== "undefined" && movement_categories_service_1.MovementCategoriesService) === "function" ? _d : Object])
    ], MovementFormComponent);
    return MovementFormComponent;
}());
exports.MovementFormComponent = MovementFormComponent;
//# sourceMappingURL=movement-form.component.js.map