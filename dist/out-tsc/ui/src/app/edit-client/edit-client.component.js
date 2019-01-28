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
var forms_1 = require("@angular/forms");
var clients_service_1 = require("../services/clients.service");
var router_1 = require("@angular/router");
var Client = /** @class */ (function () {
    function Client() {
    }
    return Client;
}());
var EditClientComponent = /** @class */ (function () {
    function EditClientComponent(clientService, activatedRoute) {
        this.clientService = clientService;
        this.activatedRoute = activatedRoute;
        this.isLoading = false;
        this.id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];
        this.id_client = this.activatedRoute.snapshot.paramMap.get('id');
        this.getClient(this.id_client);
        this.clientForm = new forms_1.FormGroup({
            'active': new forms_1.FormControl(),
            'first_name': new forms_1.FormControl('', forms_1.Validators.required),
            'last_name': new forms_1.FormControl('', forms_1.Validators.required),
            'nationality': new forms_1.FormControl('', forms_1.Validators.required),
            'identification_type': new forms_1.FormControl('', forms_1.Validators.required),
            'identification_number': new forms_1.FormControl('', forms_1.Validators.required),
            'tin_number': new forms_1.FormControl(''),
            'date_of_birth': new forms_1.FormControl('', forms_1.Validators.required),
            'phone_number': new forms_1.FormControl('', forms_1.Validators.required),
            'email': new forms_1.FormControl('', forms_1.Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")),
            'street_address': new forms_1.FormControl('', forms_1.Validators.required),
            'number_address': new forms_1.FormControl('', forms_1.Validators.required),
            'floor_address': new forms_1.FormControl(''),
            'department_address': new forms_1.FormControl(''),
            'country': new forms_1.FormControl('', forms_1.Validators.required),
            'state': new forms_1.FormControl(''),
            'city': new forms_1.FormControl(''),
            'observations': new forms_1.FormControl(''),
        });
    }
    EditClientComponent.prototype.getClient = function (id) {
        var _this = this;
        this.clientService.getOne(id).subscribe(function (response) {
            _this.client = response;
            _this.clientForm.patchValue(_this.client);
            console.log(_this.client);
        }, function (error) {
            console.log(error);
        });
    };
    EditClientComponent.prototype.editClient = function () {
        var _this = this;
        this.isLoading = true;
        this.clientService.updateUser(this.id_client, this.clientForm.value).subscribe(function (response) {
            _this.isLoading = false;
            _this.clientForm.reset();
            console.log('Update client successfuly. Todo: Mostrar mensaje update exitoso');
        }, function (error) {
            _this.isLoading = false;
            console.log('There was an error while trying to update client. Todo: Mostrar mensaje update no exitoso' + error);
        });
    };
    EditClientComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-client',
            templateUrl: './edit-client.component.html',
            styleUrls: ['./edit-client.component.css']
        }),
        __metadata("design:paramtypes", [clients_service_1.ClientsService,
            router_1.ActivatedRoute])
    ], EditClientComponent);
    return EditClientComponent;
}());
exports.EditClientComponent = EditClientComponent;
//# sourceMappingURL=edit-client.component.js.map