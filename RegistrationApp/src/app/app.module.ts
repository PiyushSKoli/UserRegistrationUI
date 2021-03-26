import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastrModule } from 'ngx-toastr';
import {ConfirmationService,MessageService} from 'primeng/api';
import { LoginComponent } from './component/login/login.component';
import {DropdownModule} from 'primeng/dropdown';
import { ProfileComponent } from './component/profile/profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ContextMenuModule,
    DialogModule,
    PasswordModule,
    CalendarModule,
    ToastrModule.forRoot(),
    ConfirmDialogModule,
    DropdownModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
