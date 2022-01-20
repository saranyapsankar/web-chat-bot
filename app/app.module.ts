import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventManagerService } from './services/shared-event-manager.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './chat/chat.service';
import { SuggestionChipsComponent } from './rich-components/suggestion-chips/suggestion-chips.component';
import { HorStepperComponent } from './rich-components/hor-stepper/hor-stepper.component';
import { ApartmentListComponent } from './rich-components/apartment-list/apartment-list.component';
import { BaseComponent } from './base/base.component';
import { AcServiceComponent } from './rich-components/ac-service/ac-service.component';
import { AppointmentsComponent } from './rich-components/appointments/appointments.component';
import { AssessmentComponent } from './rich-components/assessment/assessment.component';
import { CommonService } from './services/common.service'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MessageComponent,
    SuggestionChipsComponent,
    HorStepperComponent,
    ApartmentListComponent,
    BaseComponent,
    AcServiceComponent,
    AppointmentsComponent,
    AssessmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    FlexLayoutModule,
    YouTubePlayerModule,
    MatChipsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule, 
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [ChatService, EventManagerService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
