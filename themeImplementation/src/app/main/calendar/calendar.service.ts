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


    createEvent(turnData) {
        const url = this.getURL('TURNS', 'CREATE');
        const options = this.getRequestOptions(true);
        return this.http.post(url, turnData, options);
    }

    updateEvent(id, turnData) {
        let url = this.getURL('TURNS', 'UPDATE');
        url = url.replace(':id', id);
        const options = this.getRequestOptions(true);
        return this.http.put(url, turnData, options);
    }

    deleteEvent(id) {
        let url = this.getURL('TURNS', 'DELETE');
        url = url.replace(':id', id);
        const options = this.getRequestOptions(true);
        return this.http.delete(url, options);
    }
}
