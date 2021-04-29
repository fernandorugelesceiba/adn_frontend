import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { DataTablesModule } from 'angular-datatables';
import { DatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    DataTablesModule,
    DatepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
