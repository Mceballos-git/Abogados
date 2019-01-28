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
var router_1 = require("@angular/router");
var turns_service_1 = require("../services/turns.service");
var Turns = /** @class */ (function () {
    function Turns() {
    }
    return Turns;
}());
var EditTurnComponent = /** @class */ (function () {
    function EditTurnComponent(turnService, activatedRoute) {
        this.turnService = turnService;
        this.activatedRoute = activatedRoute;
        this.isLoading = false;
        this.id_turn = this.activatedRoute.snapshot.paramMap.get('id');
        this.getTurn(this.id_turn);
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
    EditTurnComponent.prototype.ngOnInit = function () {
    };
    EditTurnComponent.prototype.getTurn = function (id) {
        var _this = this;
        this.turnService.getOne(id).subscribe(function (response) {
            _this.turn = response;
            _this.turnForm.patchValue(_this.turn);
            console.log(_this.turn);
        }, function (error) {
            console.log(error);
        });
    };
    EditTurnComponent.prototype.editTurn = function () {
        var _this = this;
        this.isLoading = true;
        this.turnService.updateTurn(this.id_turn, this.turnForm.value).subscribe(function (response) {
            _this.isLoading = false;
            _this.turnForm.reset();
            console.log('Update turn successfuly. Todo: Mostrar mensaje update exitoso');
        }, function (error) {
            _this.isLoading = false;
            console.log('There was an error while trying to update turn. Todo: Mostrar mensaje update no exitoso' + error);
        });
    };
    EditTurnComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-turn',
            templateUrl: './edit-turn.component.html',
            styleUrls: ['./edit-turn.component.css']
        }),
        __metadata("design:paramtypes", [turns_service_1.TurnsService, router_1.ActivatedRoute])
    ], EditTurnComponent);
    return EditTurnComponent;
}());
exports.EditTurnComponent = EditTurnComponent;
//# sourceMappingURL=edit-turn.component.js.map