import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-viewpatients',
  templateUrl: './viewpatients.component.html',
  styleUrls: ['./viewpatients.component.css']
})

export class ViewpatientsComponent implements OnInit {

  patients: any;
  selectedPatient: Patient;
  selectedPatientId: number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<Patient[]>('http://localhost:8080/getPatients')
      .subscribe(data => this.patients = data);
  }

  selectPatient(patient: Patient) {
    console.log("p sel");
    this.selectedPatient = patient;
    this.selectedPatientId = patient.id;
  }

}
