import { Component, OnInit, Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Doctor } from 'src/app/model/doctor';
import { Appointment } from 'src/app/model/appointment';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material';
import { map } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from 'src/app/appointments.service';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})

@Injectable()
export class BookappointmentComponent implements OnInit {

  slots : string[]= ['09:00','10:00','11:00','12:00','01:00','02:00','03:00','04:00','05:00',
                      '06:00','07:00','08:00' ]
  
  //Params for booking appointment
  patientdId : number;
  selectedSlot : string;
  selectedDoctor : Doctor;
  cal: any = {selectedDate: new Date() };

  //REST call responses
  doctorsList : Doctor[];
  bookedslots : string[] = []; 
  appointmentId : number;

  isDoctorSelected : boolean = false;
  bookAppointmentWarning : boolean = false;
  isBookingSuccess : boolean = false;

@Output()
dateChange: EventEmitter<MatDatepickerInputEvent<any>>

  constructor(private httpClient : HttpClient, 
              private datePipe: DatePipe, 
              private route : ActivatedRoute,
              private apptmntService : AppointmentsService) {}

  ngOnInit() {
    this.httpClient.get<Doctor[]>("http://localhost:8080/getDoctors")
        .subscribe(data => this.doctorsList = data);
    this.patientdId = this.route.snapshot.params['patientId'];
    }

  getSlotClass(slot : string){
    if(this.bookedslots.includes(slot)){
      return "bookedslot";
    }else {
      return "availableslot mousepointer";
    }
  }

  selectSlot(slot : string){
    if(!this.bookedslots.includes(slot)){
      this.selectedSlot = slot;
      console.log(slot);
    }
  }

  selectDoctor(doctor : Doctor){
    this.isDoctorSelected = true;
    this.selectedDoctor = doctor;
    console.log(doctor);
    this.getBookedSlots();
  }

  dateChangeFunction(date : any){
    console.log("inside date change");
    if(this.selectedDoctor != null && this.selectedDoctor != undefined)
      this.getBookedSlots();
  }

  getBookedSlots(){
    let dateString = this.datePipe.transform(this.cal.selectedDate,'yyyy-MM-dd');
    let params = new HttpParams();
    params = params.append('doctorId',this.selectedDoctor.id.toString());
    params = params.append('dateReq',dateString);
    this.httpClient.get<string[]>(`http://localhost:8080/getBookedSlots`,
                    { params : params })
        .subscribe(data => this.bookedslots = data);
  }

  bookAppointment(){
    if(this.selectedDoctor!=null && this.selectedDoctor!= undefined &&
      this.patientdId != null && this.patientdId != undefined &&
      this.cal.selectedDate != null && this.cal.selectedDate != undefined &&
      this.selectedSlot != null &&  this.selectedSlot != undefined){
          this.bookAppointmentWarning = false;
          let appointment = new Appointment();
          appointment.doctorId=this.selectedDoctor.id;
          appointment.patientId = this.patientdId;
          appointment.appointmentDate = this.cal.selectedDate;
          appointment.slot = this.selectedSlot;
          this.httpClient.post<Appointment>("http://localhost:8080/bookAppointment",appointment,
                          {headers: new HttpHeaders().set('Content-type', 'application/json')})
                          .pipe(map(data  => {
                             return data.id;
                          }))
                          .subscribe(data => this.appointmentId =  data,
                                    () => this.isBookingSuccess = false,
                                    () => {this.isBookingSuccess = true;
                                          this.apptmntService.newAppointmentAdded.emit()}) ;
          console.log(this.appointmentId);
    }else{
      this.bookAppointmentWarning = true;
    }
    
  }

}
