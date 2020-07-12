import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './main/registration/register.component';
import { TodolinksComponent } from './main/todolinks/todolinks.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewpatientsComponent } from './main/viewpatients/viewpatients.component';
import { BookappointmentComponent } from './main/bookappointment/bookappointment.component';
import { AsideComponent } from './aside/aside.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ScheduledComponent } from './aside/scheduled/scheduled.component';

const appRoutes: Routes = [
  { path: '', component: TodolinksComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'viewpatients', component: ViewpatientsComponent },
  { path: 'bookappointment', component: BookappointmentComponent },
  { path: 'bookappointment/:patientId', component: BookappointmentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    TodolinksComponent,
    ViewpatientsComponent,
    BookappointmentComponent,
    AsideComponent,
    ScheduledComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
