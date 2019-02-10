import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CalendarEvent} from 'angular-calendar';

import {MatColors} from '@fuse/mat-colors';

import {forkJoin} from "rxjs/observable/forkJoin";

import {CalendarEventModel} from 'app/main/calendar/event.model';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {OfficesService} from 'app/main/services/offices.service';
import {ClientsService} from 'app/main/services/clients.service';
import {UsersService} from 'app/main/services/users.service';

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

class Person {
    value: number[];
    viewValue: string[];
}

@Component({
    selector: 'calendar-event-form-dialog',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class CalendarEventFormDialogComponent implements OnInit {
    action: string;
    event: CalendarEventModel;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    locale: string = 'es';
    eventDate: any;
    eventDate1: any;
    office: any = [];
    client: any = [];
    user: any = [];

    last_name:string;

    priority = ['NORMAL', 'IMPORTANTE', 'PRIORITARIA', 'BASICA'];

    //forkJoinResponse
    public responseOffices: any;
    public responseClients: any;
    public responseUsers: any;

    /**
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
        private _officesService: OfficesService,
        private _clientsService: ClientsService,
        private _usersService: UsersService
    ) {
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

        let clients = this._clientsService.getClientsActiveList();
        let users = this._usersService.getUsersList();

        forkJoin([clients, users]).subscribe((responseList) => {
            this.responseClients = responseList[0];
            this.responseUsers = responseList[1];

            for (let i = 0; i < this.responseClients.length; i++) {
                this.client[i] = new Person();
                this.client[i].value = this.responseClients[i].id;
                let lastName = this.responseClients[i].last_name === null ? '' : this.responseClients[i].last_name;
                this.client[i].viewValue = lastName + ' ' + this.responseClients[i].first_name;
            }


            for (let i = 0; i < this.responseUsers.length; i++) {
                this.user[i] = new Person();
                this.user[i].value = this.responseUsers[i].id;
                this.user[i].viewValue = this.responseUsers[i].username;
            }

        }, (error) => {});


        if (this.action === 'edit') {
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
            given_user_id: '',
            attention_user_id: '',
            register_date: '',
            turn_date: this.eventDate1,
            turn_time_start: '',
            turn_time_end: '',
            phone_number_ref: '',
            priority: null,
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
        return this.createEventForm(event.originalData);
    }

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(data): FormGroup {
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
            'priority': new FormControl(data.priority),
            'comments': new FormControl(data.comments),
            'title': new FormControl(data.title)
        });
        return this.eventForm;
    }
}
