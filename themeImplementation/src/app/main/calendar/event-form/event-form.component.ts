import { Component, Inject, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { forkJoin } from "rxjs/observable/forkJoin";

import { CalendarEventModel } from 'app/main/calendar/event.model';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { ClientsService } from 'app/main/services/clients.service';
import { UsersService } from 'app/main/services/users.service';
import { AuthenticationService } from 'app/main/services/authentication.service';
import { LoadingDialogComponent } from "../../common/loading-dialog/loading-dialog.component";

import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { NgSelectConfig } from '@ng-select/ng-select';
import { ProcedureCategoriesService } from '../../services/procedure-categories.service';

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

interface Person {
    id: string;
    isActive: boolean;
    name: string;
    last_name: string
}

@Component({
    selector: 'calendar-event-form-dialog',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})

export class CalendarEventFormDialogComponent implements OnInit {

    people3$: any;
    people3Loading = false;
    people3input$ = new Subject<string>();

    users: any;
    usersLoading = false;
    userInput = new Subject<string>();

    procedureCat: any;
    procedureCatLoading = false;
    procedureCatInput = new Subject<string>();


    action: string;
    event: CalendarEventModel;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;
    loading: boolean;
    locale: string = 'es';
    eventDate: any;
    eventDate1: any;
    office: any = [];
    client: any = [];
    user: any = [];

    last_name: string;
    first_name: string;
    id_type: string;
    id_number: string;
    clientData: string;
    phone_number: string;
    username: string;

    priority = ['NORMAL', 'IMPORTANTE', 'PRIORITARIA', 'BASICA'];
    horarios = ['08:00:00', '08:05:00', '08:10:00', '08:15:00', '08:20:00', '08:25:00', '08:30:00', '08:35:00', '08:40:00', '08:45:00', '08:50:00', '08:55:00',
        '09:00:00', '09:05:00', '09:10:00', '09:15:00', '09:20:00', '09:25:00', '09:30:00', '09:35:00', '09:40:00', '09:45:00', '09:50:00', '09:55:00',
        '10:00:00', '10:05:00', '10:10:00', '10:15:00', '10:20:00', '10:25:00', '10:30:00', '10:35:00', '10:40:00', '10:45:00', '10:50:00', '10:55:00',
        '11:00:00', '11:05:00', '11:10:00', '11:15:00', '11:20:00', '11:25:00', '11:30:00', '11:35:00', '11:40:00', '11:45:00', '11:50:00', '11:55:00',
        '12:00:00', '12:05:00', '12:10:00', '12:15:00', '12:20:00', '12:25:00', '12:30:00', '12:35:00', '12:40:00', '12:45:00', '12:50:00', '12:55:00',
        '13:00:00', '13:05:00', '13:10:00', '13:15:00', '13:20:00', '13:25:00', '13:30:00', '13:35:00', '13:40:00', '13:45:00', '13:50:00', '13:55:00',
        '14:00:00', '14:05:00', '14:10:00', '14:15:00', '14:20:00', '14:25:00', '14:30:00', '14:35:00', '14:40:00', '14:45:00', '14:50:00', '14:55:00',
        '15:00:00', '15:05:00', '15:10:00', '15:15:00', '15:20:00', '15:25:00', '15:30:00', '15:35:00', '15:40:00', '15:45:00', '15:50:00', '15:55:00',
        '16:00:00', '16:05:00', '16:10:00', '16:15:00', '16:20:00', '16:25:00', '16:30:00', '16:35:00', '16:40:00', '16:45:00', '16:50:00', '16:55:00',
        '17:00:00', '17:05:00', '17:10:00', '17:15:00', '17:20:00', '17:25:00', '17:30:00', '17:35:00', '17:40:00', '17:45:00', '17:50:00', '17:55:00', '18:00']

    selected_time = this.horarios[0];
    selected_priority = this.priority[0];
        
    //forkJoinResponse
    public responseOffices: any;
    public responseClients: any;
    public responseUsers: any;

    /**17
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {OfficesService} _officesService
     * @param {ClientsService} _clientsService
     * @param {UsersService} _usersService
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _auth: AuthenticationService,
        private _clientsService: ClientsService,
        private _usersService: UsersService,
        private config: NgSelectConfig,
        private _procedureCategoryService:ProcedureCategoriesService,
    ) {
        this.config.typeToSearchText = 'Escriba para buscar';
        this.config.notFoundText = 'No se encontraron coincidencias';
        this.config.loadingText = 'Cargando...';
        this.config.addTagText = 'Agregue letras';
        this.config.clearAllText = 'Borrar todo';
        this.event = _data.event;
        this.action = _data.action;
        this.eventDate = moment(_data.date).format('DD-MM-YYYY');
        this.eventDate1 = moment(_data.date).format('YYYY-MM-DD');

        if (this.action === 'edit') {
            this.dialogTitle = 'Editar Turno';
            return;
        }

        console.log(_data);


        this.dialogTitle = 'Nuevo Turno';
        this.event = new CalendarEventModel();
    }


    ngOnInit() {

        this.loadPeople3();
        this.loadUsers();        
        this.loadProcedureCategories();

        if (this.action === 'edit') {
            console.log(event);
            this.createEventFormEdit(this.event);
            return;
        }
        
        this.eventForm = this.createEventFormNew();

    }

    /**
     *
     * @returns {FormGroup}
     */
    createEventFormNew() {

        const data = {
            active: 1,
            client_id: '',
            client: {
                first_name: '',
                last_name: ''
            },
            given_user_id: '',
            attention_user_id: '',
            register_date: '',
            turn_date: this.eventDate1,
            turn_time_start: '',
            turn_time_end: '',
            phone_number_ref: '',
            priority: null,
            procedure_category_id:'',
            comments: '',
            title: ''
        };
        return this.createEventForm(data);
    }

    /**
     *
     * @param event
     * @returns {FormGroup}
     */
    createEventFormEdit(event) {
        this.eventDate = moment(event.originalData.turn_date).format('DD-MM-YYYY')
        return this.createEventForm(event.originalData);
    }

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    dataForForm: any;
    createEventForm(data): FormGroup {

        this.dataForForm = data;
        this.eventForm = new FormGroup({
            'active': new FormControl(data.active),
            'client_id': new FormControl(data.client_id, Validators.required),
            'given_user_id': new FormControl(data.given_user_id, Validators.required),
            'attention_user_id': new FormControl(data.attention_user_id, Validators.required),
            'register_date': new FormControl(moment().format('YYYY-MM-DD')),
            'turn_date': new FormControl(data.turn_date),
            'turn_time_start': new FormControl(data.turn_time_start, Validators.required),
            'turn_time_end': new FormControl(data.turn_time_end, Validators.required),
            'phone_number_ref': new FormControl(data.phone_number_ref, Validators.required),
            'procedure_category_id': new FormControl(data.procedure_category_id,Validators.required),
            'priority': new FormControl(data.priority, Validators.required),
            'comments': new FormControl(data.comments),
            'title': new FormControl()
        });

        this.eventForm.get('turn_time_start').setValue(this.selected_time);
        this.eventForm.get('turn_time_end').setValue(this.selected_time);
        this.eventForm.get('priority').setValue(this.selected_priority);
        

        if (this.action === 'edit') {
            let client = { id: data.client.id, text: data.client.first_name + ' ' + data.client.last_name };
            this.eventForm.get('client_id').setValue(client);
            let givenUser = { id: data.given_user.id, text: data.given_user.first_name + ' ' + data.given_user.last_name };
            this.eventForm.get('given_user_id').setValue(givenUser);
            let attentionUser = { id: data.attention_user.id, text: data.attention_user.first_name + ' ' + data.attention_user.last_name };
            this.eventForm.get('attention_user_id').setValue(attentionUser);

            let procedure = {id: data.procedure_category.id, text: data.procedure_category.name}
            this.eventForm.get('procedure_category_id').setValue(procedure);

            this.eventForm.get('priority').setValue(data.priority);
            this.eventForm.get('turn_time_start').setValue(data.turn_time_start);
            this.eventForm.get('turn_time_end').setValue(data.turn_time_end);

        }

        this.loading = false;
        return this.eventForm;


    }

    clientPhone(event) {
        this.eventForm.get('phone_number_ref').setValue(event.phone);
    }

    private loadPeople3() {
        this.people3$ = concat(
            of([]), // default items
            this.people3input$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.people3Loading = true),
                switchMap(term => this._clientsService.getClientsActiveListSelectSearch(term).pipe(


                    catchError(() => of([])), // empty list on error
                    tap(() => this.people3Loading = false)
                ))
            )
        );

    }

    private loadUsers() {
        this.users = concat(
            of([]), // default items
            this.userInput.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.usersLoading = true),
                switchMap(term => this._usersService.getUserActiveListSelectSearch(term).pipe(


                    catchError(() => of([])), // empty list on error
                    tap(() => this.usersLoading = false)
                ))
            )
        );

    }

    private loadProcedureCategories() {
        this.procedureCat = concat(
            of([]), // default items
            this.procedureCatInput.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.procedureCatLoading = true),
                switchMap(term => this._procedureCategoryService.getProcCatListSelectSearch(term).pipe(


                    catchError(() => of([])), // empty list on error
                    tap(() => this.procedureCatLoading = false)
                ))
            )
        );

    }
}
