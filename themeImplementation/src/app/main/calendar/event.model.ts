import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class CalendarEventModel
{
    active:boolean;
    client_id:number;
    given_user_id:number;    
    attention_user_id:number;
    office_id:number;
    register_date:Date;
    turn_date:Date;
    turn_time_start:string;
    turn_time_end:string;
    phone_number_ref:string;    
    priority:string;
    comments:string;
    title:string;   
    
    
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    
    

    /**
     * Constructor
     *
     * @param data
     */
    constructor(data?)
    {
        data = data || {};
        this.active = data.active || true;
        this.client_id = data.client_id || 0;
        this.given_user_id = data.given_user_id || 0;
        this.attention_user_id = data.attention_user_id || 0;
        this.office_id = data.office_id || 0;
        this.register_date = new Date(data.register_date) || startOfDay(new Date());
        this.turn_date = new Date(data.turn_date) || endOfDay(new Date());
        this.turn_time_start = data.turn_time_start || '';     
        this.turn_time_end = data.turn_time_end || '';     
        this.phone_number_ref = data.phone_number_ref || '';
        this.priority = data.priority || '';
        this.comments = data.comments || '';     
        this.title = data.title || '';
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd   : data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        this.cssClass = data.cssClass || '';
       
    }
}
