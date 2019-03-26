import {Component, Inject, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CalendarEvent} from 'angular-calendar';

import {MatColors} from '@fuse/mat-colors';

import {forkJoin} from "rxjs/observable/forkJoin";

import {CalendarEventModel} from 'app/main/calendar/event.model';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {ClientsService} from 'app/main/services/clients.service';
import {UsersService} from 'app/main/services/users.service';
import { AuthenticationService } from 'app/main/services/authentication.service';
import {LoadingDialogComponent} from "../../common/loading-dialog/loading-dialog.component";
import { PARAMETERS } from '@angular/core/src/util/decorators';

import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'

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
    last_name:string
}

@Component({
    selector: 'calendar-event-form-dialog',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})

export class CalendarEventFormDialogComponent implements OnInit {

    people3$: any;
    people3Loading = false;
    people3input$ = new Subject<string>();
    

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

    last_name:string;
    first_name:string;
    id_type:string;
    id_number:string;
    clientData:string;
    phone_number:string;
    username:string;

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
        private _auth: AuthenticationService,
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

        this.loadPeople3();
        // this.loading = true;
       
        // let clients = this._clientsService.getClientsActiveList();
        // let users = this._usersService.getUsersList();

        // forkJoin([clients, users]).subscribe((responseList) => {
        //     this.responseClients = responseList[0];
        //     this.responseUsers = responseList[1];

        //     for (let i = 0; i < this.responseClients.length; i++) {
        //         this.client[i] = new Person();
        //         this.client[i].value = this.responseClients[i].id;
        //         this.client[i].phoneNumber = this.responseClients[i].phone_number;
        //         this.phone_number = this.responseClients[i].phone_number === null ? '' : this.responseClients[i].phone_number;
        //         let lastName = this.responseClients[i].last_name === null ? '' : this.responseClients[i].last_name;
        //         this.first_name = this.responseClients[i].first_name === null ? '' : this.responseClients[i].first_name;
        //         this.id_type = this.responseClients[i].identification_type === null ? '' : this.responseClients[i].identification_type;
        //         this.id_number = this.responseClients[i].identification_number === null ? '' : this.responseClients[i].	identification_number;
        //         this.clientData = lastName + ' ' + this.first_name + ' ' + '(' + this.id_type + ' ' + this.id_number + ')';
        //         this.client[i].viewValue = this.clientData;
        //     }


        //     for (let i = 0; i < this.responseUsers.length; i++) {
        //         this.user[i] = new Person();
        //         this.user[i].value = this.responseUsers[i].id;
        //         this.user[i].viewValue = this.responseUsers[i].username;
        //     }

        //     if (this.action === 'edit') {
           
        //         this.createEventFormEdit(this.event);
        //         return;
        //     }
        //     this.eventForm = this.createEventFormNew();

        // }, (error) => {});

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
            client :{
                first_name:'',
                last_name:''
            },
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
        this.eventDate = moment(event.originalData.turn_date).format('DD-MM-YYYY')
                
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
            'client_id': new FormControl(data.client_id),
            // 'given_user_id': new FormControl(data.given_user_id, Validators.required),
            // 'attention_user_id': new FormControl(data.attention_user_id, Validators.required),      
            
            'given_user_id': new FormControl(11),
            'attention_user_id': new FormControl(11),         
            'register_date': new FormControl(moment().format('YYYY-MM-DD')),
            'turn_date': new FormControl(data.turn_date),
            'turn_time_start': new FormControl(data.turn_time_start, Validators.required),
            'turn_time_end': new FormControl(data.turn_time_end, Validators.required),
            'phone_number_ref': new FormControl(data.phone_number_ref, Validators.required),
            'priority': new FormControl(data.priority, Validators.required),
            'comments': new FormControl(data.comments),
            'title': new FormControl('')
        });

        if (this.action === 'edit') {
           
            this.eventForm = new FormGroup({
                'active': new FormControl(data.active),
                'client_id': new FormControl(data.client.first_name + ' ' + data.client.last_name ),
                // 'given_user_id': new FormControl(data.given_user_id, Validators.required),
                // 'attention_user_id': new FormControl(data.attention_user_id, Validators.required),      
                
                'given_user_id': new FormControl(11),
                'attention_user_id': new FormControl(11),         
                'register_date': new FormControl(moment().format('YYYY-MM-DD')),
                'turn_date': new FormControl(data.turn_date),
                'turn_time_start': new FormControl(data.turn_time_start, Validators.required),
                'turn_time_end': new FormControl(data.turn_time_end, Validators.required),
                'phone_number_ref': new FormControl(data.phone_number_ref, Validators.required),
                'priority': new FormControl(data.priority, Validators.required),
                'comments': new FormControl(data.comments),
                'title': new FormControl('')
            });
        }




        this.loading=false;
        return this.eventForm;

      
    }

    clientPhone(id){     
        
        for (let i = 0; i < this.client.length; i++)
        {
            if (this.client[i].value === id.value)
            {
                this.eventForm.get('phone_number_ref').setValue(this.client[i].phoneNumber) ;
            }
        }        
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
}
