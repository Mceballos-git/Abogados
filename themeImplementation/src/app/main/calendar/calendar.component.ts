import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewDay
} from 'angular-calendar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';

import { CalendarService } from 'app/main/calendar/calendar.service';
import { CalendarEventModel } from 'app/main/calendar/event.model';
import { CalendarEventFormDialogComponent } from 'app/main/calendar/event-form/event-form.component';
import { FuseConfigService } from '@fuse/services/config.service';

import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEventModel[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    loaded: boolean;

    locale: string = 'es';

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService,
        private _fuseConfigService: FuseConfigService,
        private _snackBar: MatSnackBar
    ) {
        // Configure the layout
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

        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = { date: startOfDay(new Date()) };

        this.actions = [{
            label: '<i class="material-icons s-16">edit</i>',
            onClick: ({ event }: { event: CalendarEventModel }): void => {
                this.editEvent('edit', event);
            }
        }, {
            label: '<i class="material-icons s-16">delete</i>',
            onClick: ({ event }: { event: CalendarEventModel }): void => {
                this.deleteEvent(event);
            }
        }];

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loaded = false;
        this.setEvents();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    setEvents(): void {
        this._calendarService.getEvents().subscribe(response => {


            this.events = [];
            for (let i = 0, len = response.length; i < len; i++) {
                const turn = response[i];
                const event = this.getEventFromTurn(turn);
                this.events.push(event);
            }

            this.loaded = true;
            this.refresh.next(true);
        });

    }

    beforeMonthViewRender({ header, body }): void {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selected day style
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }


    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }


    eventTimesChanged({ event, newStart, newEnd }: any): void {

        console.log('AAAAAAAAAAAAAAAA')
        console.log(event);
        if (event.originalData.client) {
            let client = {
                id: event.originalData.client.id,
                text: event.originalData.client.first_name + ' ' + event.originalData.client.last_name
            };
            event.originalData.client_id = client;
        }

        if (event.originalData.given_user) {
            let givenUser = {
                id: event.originalData.given_user.id,
                text: event.originalData.given_user.first_name + ' ' + event.originalData.given_user.last_name
            };
            event.originalData.given_user_id = givenUser;
        }

        if (event.originalData.attention_user) {
            let attentionUser = {
                id: event.originalData.attention_user.id,
                text: event.originalData.attention_user.first_name + ' ' + event.originalData.attention_user.last_name
            };
            event.originalData.attention_user_id = attentionUser;
        }

        event.start = newStart;
        event.end = newEnd;
        event.originalData.turn_date = moment(newStart).format('YYYY-MM-DD');
        event.originalData.turn_time_start = moment(newStart).format('HH:mm:ss');
        event.originalData.turn_time_end = moment(newEnd).format('HH:mm:ss');
        this._calendarService.updateEvent(event.originalData.id, event.originalData).subscribe(response => {
            console.log('Event Time changed');
        });
        this.refresh.next(true);
    }

    deleteEvent(event): void {

        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Esta seguro que desea eliminar el turno?';


        const eventApiId = event.originalData.id;
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {

                this._calendarService.deleteEvent(eventApiId).subscribe(reqResponse => {
                    const eventIndex = this.events.indexOf(event);
                    this.events.splice(eventIndex, 1);
                    this.refresh.next(true);
                    this._snackBar.open('Turno eliminado correctamente', '', {
                        duration: 3000,
                        panelClass: ['green']
                    });
                }, (error) => {
                    this._snackBar.open('Se ha producido un error al eliminar el turno', '', {
                        duration: 3000,
                        panelClass: ['warn']
                    });
                });


            }
            this.confirmDialogRef = null;
        });
    }

    editEvent(action: string, event: CalendarEventModel): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event: event,
                action: action
            }
        });

        this.dialogRef.afterClosed().subscribe(response => {
            if (!response) {
                return;
            }

            const eventApiId = this.events[eventIndex].originalData.id;
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            switch (actionType) {
                case 'save':
                    console.log(formData.value);

                    this._calendarService.updateEvent(eventApiId, formData.value).subscribe(reqResponse => {
                        const event = this.getEventFromTurn(reqResponse);

                        this.events[eventIndex] = Object.assign(this.events[eventIndex], event);
                        this.refresh.next(true);
                        this._snackBar.open('Turno editado correctamente', '', {
                            duration: 3000,
                            panelClass: ['green']
                        });
                    }, (error) => {
                        this._snackBar.open('Se ha producido un error al editar el turno', '', {
                            duration: 3000,
                            panelClass: ['warn']
                        });
                    });
                    break;
                case 'delete':
                    this.deleteEvent(event);
                    break;
            }
        });
    }

    addEvent(): void {

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            console.log(response.value);


            this._calendarService.createEvent(response.value).subscribe(reqResponse => {

                const event = this.getEventFromTurn(reqResponse);
                this.events.push(event);
                this.refresh.next(true);
                this._snackBar.open('Turno creado correctamente', '', {
                    duration: 3000,
                    panelClass: ['green']
                });
            }, (error) => {
                this._snackBar.open('Se ha producido un error al crear el turno', '', {
                    duration: 3000,
                    panelClass: ['warn']
                });
            });
        });
    }


    /**
     * Format turn into calendar event.
     * @param turn
     * @returns {CalendarEventModel}
     */
    getEventFromTurn(turn) {

        let dataClient;
        if (turn.client) {
            dataClient = turn.client.first_name + ' ' + turn.client.last_name;
        }
        else {
            dataClient = '';
        }
        let itemData = {
            start: moment(turn.turn_date + ' ' + turn.turn_time_start),
            end: moment(turn.turn_date + ' ' + turn.turn_time_end),
            title: turn.turn_time_start + ' a ' + turn.turn_time_end + ' - ' + dataClient,
            color: {
                primary: null,
                secondary: null
            },
            actions: this.actions,
            draggable: false
        };



        let event = new CalendarEventModel(itemData);
        event.originalData = turn;


        return event;

    }
}


