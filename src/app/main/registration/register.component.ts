import { Component, ViewEncapsulation, Injectable } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators'
import { AppointmentsService } from 'src/app/appointments.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent {

  formSubmitted: boolean = false;
  newPatient: Patient = new Patient();
  patientId: number;
  patientRegistered: string = '';

  constructor(private httpClient: HttpClient,
    private appmntService: AppointmentsService) { }

  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addPatient(this.newPatient);
      this.newPatient = new Patient();
      form.reset();
      this.formSubmitted = false;
    }
  }

  addPatient(patient: Patient) {
    console.log("inside addpatient" + patient);
    this.httpClient.post<Patient>('http://localhost:8080/registerPatient', patient,
      { headers: new HttpHeaders().set('Content-type', 'application/json') })
      .pipe(map(data => {
        return data.id;
      }))
      .subscribe(data => this.patientId = data,
        () => this.patientRegistered = 'error',
        () => {
          this.patientRegistered = 'success'
          this.appmntService.newUserAdded.emit();
        });
    console.log(this.patientId);
  }
}