import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { forkJoin } from "rxjs/observable/forkJoin";

import { CalendarEventModel } from 'app/main/calendar/event.model';
//para dar formato a la fecha
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { OfficesService } from 'app/main/services/offices.service';
import { ClientsService } from 'app/main/services/clients.service';
import { UsersService } from 'app/main/services/users.service';

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

class Offices {
    value: number[];
    viewValue: string[];
}

class Clients {
    value: number[];
    viewValue: string[];
}


@Component({
    selector     : 'calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class CalendarEventFormDialogComponent implements OnInit
{
    action: string;
    event: CalendarEvent;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    locale: string = 'es';
    fechaHoy = moment(this.fechaHoy).format('DD/MM/YYYY');
    office:any=[];
    client:any = [];
    user:any = [];

    priority = ['NORMAL', 'IMPORTANTE', 'PRIORITARIA', 'BASICA'];

    //forkJoinResponse
    public responseOffices: any;
    public responseClients: any;
    public responseUsers: any;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _officesService:OfficesService,
        private _clientsService:ClientsService,
        private _usersService:UsersService
    )
    {
        this.event = _data.event;
        this.action = _data.action;        

        if ( this.action === 'edit' )
        {
            this.dialogTitle = this.event.title;
        }
        else
        {
            this.dialogTitle = 'Nuevo Turno';
            this.event = new CalendarEventModel(
                // {
                // start: _data.date,
                // end  : _data.date                              
                // }
            );
        }

        
    }

    ngOnInit(){

        let offices = this._officesService.getList();
        let clients = this._clientsService.getClientsActiveList();
        let users = this._usersService.getUsersList();

        forkJoin([offices, clients, users]).subscribe((responseList)=>{
            this.responseOffices = responseList[0]; 
            this.responseClients = responseList[1];
            this.responseUsers = responseList[2];

            console.log("Done");   

            for(var i=0;i<this.responseOffices.length;i++){
                this.office[i] = new Offices();

                this.office[i].value = this.responseOffices[i].id;
                this.office[i].viewValue = this.responseOffices[i].name;
            }

            for(var i=0;i<this.responseClients.length;i++){
                this.client[i] = new Clients();

                this.client[i].value = this.responseClients[i].id;
                this.client[i].viewValue = this.responseClients[i].last_name + ' ' + this.responseClients[i].first_name;
            }

            for(var i=0;i<this.responseUsers.length;i++){
                this.user[i] = new Clients();

                this.user[i].value = this.responseUsers[i].id;
                this.user[i].viewValue = this.responseUsers[i].username;
            } 
            
        }, (error)=>{
            console.log(error);            
        });

        this.eventForm = this.createEventForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup
    {
        // return new FormGroup({
        //     title : new FormControl(this.event.title),
        //     start : new FormControl(this.event.start),
        //     end   : new FormControl(this.event.end),
        //     allDay: new FormControl(this.event.allDay),
        //     color : this._formBuilder.group({
        //         primary  : new FormControl(this.event.color.primary),
        //         secondary: new FormControl(this.event.color.secondary)
        //     }),
        //     meta  :
        //         this._formBuilder.group({
        //             location: new FormControl(this.event.meta.location),
        //             notes   : new FormControl(this.event.meta.notes)
        //         })
        // });
        this.eventForm = new FormGroup({
            'active': new FormControl(),     
            'client_id': new FormControl('', Validators.required),
            'given_user_id': new FormControl('', Validators.required),
            'attention_user_id': new FormControl('', Validators.required),
            'office_id': new FormControl('', Validators.required),
            'register_date': new FormControl(moment(), Validators.required),
            'turn_date': new FormControl(''),
            'turn_time_start': new FormControl('', Validators.required),
            'turn_time_end': new FormControl('', Validators.required),
            'phone_number_ref':new FormControl('', Validators.required),      
            'priority': new FormControl(),
            'comments': new FormControl(''),
            'title':new FormControl('')      
          }); 
          return this.eventForm;
    }
}
