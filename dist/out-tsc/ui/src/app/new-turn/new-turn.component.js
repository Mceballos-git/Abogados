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
var turns_service_1 = require("../services/turns.service");
var NewTurnComponent = /** @class */ (function () {
    function NewTurnComponent(turnService) {
        this.turnService = turnService;
        this.isLoading = false;
        this.priority = ['NORMAL', 'IMPORTANTE', 'PRIORITARIA', 'BASICA'];
        this.turnForm = new forms_1.FormGroup({
            'active': new forms_1.FormControl(),
            'client_id': new forms_1.FormControl('', forms_1.Validators.required),
            'given_user_id': new forms_1.FormControl('', forms_1.Validators.required),
            'attention_user_id': new forms_1.FormControl('', forms_1.Validators.required),
            'office_id': new forms_1.FormControl('', forms_1.Validators.required),
            'register_date': new forms_1.FormControl('', forms_1.Validators.required),
            'turn_date': new forms_1.FormControl(''),
            'turn_time_start': new forms_1.FormControl('', forms_1.Validators.required),
            'turn_time_end': new forms_1.FormControl('', forms_1.Validators.required),
            'phone_number_ref': new forms_1.FormControl('', forms_1.Validators.required),
            'priority': new forms_1.FormControl(),
            'comments': new forms_1.FormControl(''),
            'title': new forms_1.FormControl('')
        });
    }
    NewTurnComponent.prototype.ngOnInit = function () {
    };
    NewTurnComponent.prototype.createTurn = function () {
        var _this = this;
        this.isLoading = true;
        this.turnService.create(this.turnForm.value).subscribe(function (response) {
            _this.isLoading = false;
            _this.turnForm.reset();
            console.log('Create turn successfuly. Todo: Mostrar mensaje create exitoso');
        }, function (error) {
            _this.isLoading = false;
            console.log('There was an error while trying to create turn. Todo: Mostrar mensaje create no exitoso' + error);
        });
    };
    NewTurnComponent = __decorate([
        core_1.Component({
            selector: 'app-new-turn',
            templateUrl: './new-turn.component.html',
            styleUrls: ['./new-turn.component.css']
        }),
        __metadata("design:paramtypes", [turns_service_1.TurnsService])
    ], NewTurnComponent);
    return NewTurnComponent;
}());
exports.NewTurnComponent = NewTurnComponent;
//# sourceMappingURL=new-turn.component.js.map