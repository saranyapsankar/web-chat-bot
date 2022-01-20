import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/base/base.component';
import { CommonService } from 'src/app/services/common.service';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent extends BaseComponent implements OnInit, AfterViewInit {
  isVisible = false;
  messageText: string;
  constructor(
    private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  ngOnInit(): void {
    this.subscribeToExecutionEvents();
  }

  onGetBookingselect() {
    var win = window.open('http://stage-booking.livesmart.co.jp/user-calendar/',"myWindow", "width=400,height=600"); 
    var tempWindow = win.opener;
    var timer = setInterval(function() { 
        if(win.closed) {
            clearInterval(timer);
        }
    }, 1000);
  }

  ngAfterViewInit() {         
    this.scrollToBottom(); 
  } 

  scrollToBottom() {
    setTimeout(function(){ 
       var container = document.getElementById("msgContainer");           
       container.scrollTop = container.scrollHeight; 
     }, 1000);
  }


  subscribeToExecutionEvents() {
    this.subscriptions.push(this.eventManagerService
      .getAppointmentCardObservable()
      .subscribe((data: string) => {alert(data);
        if(data){
        this.isVisible = true;
        this.messageText = data;
        //this.messageText = data.split('Please')[0];
        console.log(this.messageText+ "summary --");
        this.scrollToBottom();
        } 
        }));
  }

}
