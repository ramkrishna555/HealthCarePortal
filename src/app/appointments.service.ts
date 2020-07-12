import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AppointmentsService {

    newAppointmentAdded = new EventEmitter();
    newUserAdded = new EventEmitter();

}