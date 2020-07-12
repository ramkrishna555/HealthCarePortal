import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {

  patientsRegisteredTodayCount: number;
  appointmentsBookedToday: number;
  totalAppointmentsCount: number;


  constructor(private httpClient: HttpClient,
    private apptmntService: AppointmentsService) {
    apptmntService.newAppointmentAdded.subscribe(
      () => {
        this.getTotalAppointmentsBooked();
        this.getTotalAppointmentsBookedToday();
      });
    apptmntService.newUserAdded.subscribe(
      () => {
        this.getPatientCountRegisteredToday();
      }
    );

  }

  ngOnInit() {
    this.getTotalAppointmentsBooked();
    this.getPatientCountRegisteredToday();
    this.getTotalAppointmentsBookedToday();
  }

  getTotalAppointmentsBooked() {
    this.httpClient.get<number>('http://localhost:8080/getTotalAppointmentsBooked')
      .subscribe(data => this.totalAppointmentsCount = data);
  }

  getPatientCountRegisteredToday() {
    this.httpClient.get<number>('http://localhost:8080/getPatientCountRegisteredToday')
      .subscribe(data => this.patientsRegisteredTodayCount = data);
  }

  getTotalAppointmentsBookedToday() {
    this.httpClient.get<number>('http://localhost:8080/getTotalAppointmentsBookedToday')
      .subscribe(data => this.appointmentsBookedToday = data);
  }

}