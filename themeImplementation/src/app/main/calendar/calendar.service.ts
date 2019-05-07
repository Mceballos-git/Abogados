import {Injectable} from '@angular/core';
import {RequestHelperService} from "../services/request-helper.service";

@Injectable()
export class CalendarService extends RequestHelperService {


    /**
     *
     */
    getEvents(): any {
        const url = this.getURL('TURNS', 'LIST');
        const options = this.getRequestOptions(true);
        return this.http.get(url, options);
    }

    updateEvents(events) {
        return this.getEvents();
    }

    getOne(turnData){
        
        let url = this.getURL('TURNS', 'GET_ONE');
        url = url.replace(':id', turnData.client_id);
        const options = this.getRequestOptions(true);
        return this.http.get(url, options);
    }

    createEvent(turnData) {

        let dataToSend;

        if(turnData.procedure_category_id){
            dataToSend ={
                active: 1,
                client_id: turnData.client_id.id,
                given_user_id: turnData.given_user_id.id,
                attention_user_id:turnData.attention_user_id.id,
                register_date:turnData.register_date,
                turn_date:turnData.turn_date,
                turn_time_start:turnData.turn_time_start,
                turn_time_end:turnData.turn_time_end,
                phone_number_ref:turnData.phone_number_ref,
                priority: turnData.priority,
                procedure_category_id:turnData.procedure_category_id.id,
                comments:turnData.comments,
                title: turnData.title
            };
        }
        else{
            dataToSend ={
                active: 1,
                client_id: turnData.client_id.id,
                given_user_id: turnData.given_user_id.id,
                attention_user_id:turnData.attention_user_id.id,
                register_date:turnData.register_date,
                turn_date:turnData.turn_date,
                turn_time_start:turnData.turn_time_start,
                turn_time_end:turnData.turn_time_end,
                phone_number_ref:turnData.phone_number_ref,
                priority: turnData.priority,
                procedure_category_id:0,
                comments:turnData.comments,
                title: turnData.title
            };
        }        
        
        const url = this.getURL('TURNS', 'CREATE');
        const options = this.getRequestOptions(true);
        return this.http.post(url, dataToSend, options);
    }

    updateEvent(id, turnData) {
        let dataToSend;

        if(turnData.procedure_category_id){
            dataToSend ={
                active: 1,
                client_id: turnData.client_id.id,
                given_user_id: turnData.given_user_id.id,
                attention_user_id:turnData.attention_user_id.id,
                register_date:turnData.register_date,
                turn_date:turnData.turn_date,
                turn_time_start:turnData.turn_time_start,
                turn_time_end:turnData.turn_time_end,
                phone_number_ref:turnData.phone_number_ref,
                priority: turnData.priority,
                procedure_category_id:turnData.procedure_category_id.id,
                comments:turnData.comments,
                title: turnData.title
            };
        }
        else{
            dataToSend ={
                active: 1,
                client_id: turnData.client_id.id,
                given_user_id: turnData.given_user_id.id,
                attention_user_id:turnData.attention_user_id.id,
                register_date:turnData.register_date,
                turn_date:turnData.turn_date,
                turn_time_start:turnData.turn_time_start,
                turn_time_end:turnData.turn_time_end,
                phone_number_ref:turnData.phone_number_ref,
                priority: turnData.priority,
                procedure_category_id:0,
                comments:turnData.comments,
                title: turnData.title
            };
        }
        let url = this.getURL('TURNS', 'UPDATE');
        url = url.replace(':id', id);
        const options = this.getRequestOptions(true);
        return this.http.put(url, dataToSend, options);
    }

    deleteEvent(id) {
        let url = this.getURL('TURNS', 'DELETE');
        url = url.replace(':id', id);
        const options = this.getRequestOptions(true);
        return this.http.delete(url, options);
    }
}
