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
var NewClientComponent = /** @class */ (function () {
    function NewClientComponent(clientService) {
        this.clientService = clientService;
        this.isLoading = false;
        this.id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];
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
        this.clientForm.patchValue({ active: true });
    }
    NewClientComponent.prototype.createClient = function () {
        var _this = this;
        this.isLoading = true;
        this.clientService.create(this.clientForm.value).subscribe(function (response) {
            _this.isLoading = false;
            _this.clientForm.reset();
            console.log('Create client successfuly. Todo: Mostrar mensaje create exitoso');
        }, function (error) {
            _this.isLoading = false;
            console.log('There was an error while trying to create client. Todo: Mostrar mensaje create no exitoso' + error);
        });
    };
    NewClientComponent = __decorate([
        core_1.Component({
            selector: 'app-new-client',
            templateUrl: './new-client.component.html',
            styleUrls: ['./new-client.component.css']
        }),
        __metadata("design:paramtypes", [clients_service_1.ClientsService])
    ], NewClientComponent);
    return NewClientComponent;
}());
exports.NewClientComponent = NewClientComponent;
//# sourceMappingURL=new-client.component.js.map