import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentDetail } from 'src/app/model/appointmentDetail';
import { AppointmentsService } from 'src/app/appointments.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {

  todaysAppmts: AppointmentDetail[];

  constructor(private httpClient: HttpClient,
    private appmtService: AppointmentsService) {
    this.appmtService.newAppointmentAdded.subscribe(() => this.getTodaysAppointments());
  }

  ngOnInit() {
    this.getTodaysAppointments();
  }

  getTodaysAppointments() {
    this.httpClient.get<AppointmentDetail[]>("http://localhost:8080/getTodaysAppointments")
      .subscribe(data => this.todaysAppmts = data);
  }

}
