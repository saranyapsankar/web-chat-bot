import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base/base.component';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { IntentList } from 'src/app/model/intent-config.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() isOptionSelected = false;
  @Input() intentSelected = '';
  @Input() isServiceFlow = false;
  // selectOptions =
  //   [
  //     { key: 1, name: "Park House ABC 605", tname: " ABC 605", apName: "ABC", apNumber: " 605", mobileNumber: "08011232289" },
  //     { key: 2, name: "Park House ABC 808", tname: " ABC 808", apName: "ABC", apNumber: " 808", mobileNumber: "09041223434" },
  //     { key: 3, name: "Park House ABC 1101", tname: " ABC 1101", apName: " ABC", apNumber: " 1101", mobileNumber: "09011112222" },
  //     { key: 4, name: "Park House DEF 101", tname: " DEF 101", apName: " DEF", apNumber: " 101", mobileNumber: "08049078645" },
  //     { key: 6, name: "Park House DEF 105", tname: " DEF 105", apName: " DEF", apNumber: " 105", mobileNumber: "09070005678" },
  //     { key: 5, name: "Park House DEF 1008", tname: " DEF 1008", apName: " DEF", apNumber: " 1008", mobileNumber: "09023888422" },
  //   ];
  // availableOptions = [
  //   { key: 1, name: "Yes  ", value: "Yes ", transtext: "stepper.Yes" },
  //   { key: 2, name: "Stop arrangement", value: "Stop arrangement", transtext: "dropdown.Stop" },
  //   { key: 3, name: "Wrong information", value: "Wrong information", transtext: "dropdown.WrongInfo" },
  // ];
  // calendarOptions = [
  //   { key: 1, name: "Select Date  ", value: true, transtext: "service.SelectDateBtn" },
  //   { key: 2, name: "Cancel", value: false, transtext: "service.CancelBtn" },
  // ]

  apartmentForm = this.formBuilder.group({
    apartmentCtrl: [null, Validators.required]
  });

  apartmentNumber: string;
  apartmentName: string;
  mobileNumber: any;
  container: HTMLElement;
  intentConfigObj: IntentList;
  constructor(private formBuilder: FormBuilder,
    private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  @HostListener('window:message', ['$event']) onPostMessage(e) {
    console.log("inside message event");
    if(e && e.data && e.data.eventname == 'confirmed booking'){
      let newMessage = e.data.message.split("Please");
      if(newMessage.length == 1) {
        newMessage = e.data.message.split('フォームに入力し');
      }
    console.log('received message:  ' + e.data, newMessage[0]);
    this.eventManagerService.emitAppointmentCard(newMessage[0]);
    }
  }
  ngOnInit(): void {
    this.intentConfigObj = this.getIntentConfig().intents.find((item)=> {
      console.log(this.intentSelected+" - inside apartment list");
      return item.name == this.intentSelected;
    });
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

  onApartmentChange(event: MatSelectChange) {
    if (event && event.value && !this.isServiceFlow) {
      this.isOptionSelected = true;
      this.apartmentNumber = event.value.apNumber;
      this.apartmentName = event.value.apName;
      this.mobileNumber = event.value.mobileNumber;
      this.container = document.getElementById("msgContainer");
      this.container.scrollTop = this.container.scrollHeight;
    }
    if (this.isServiceFlow) { this.isOptionSelected = true; }
    this.scrollToBottom(); 
  }
  onChipselect(message: string) {
    this.subscriptions.push(this.translate.get(message).subscribe((t) =>
      this.eventManagerService.emitMessageTextToBot(t)
    ));
    this.scrollToBottom(); 
  }
  onCalendarChipselect(isProceed) {
    if (!isProceed) this.eventManagerService.emitMessageTextToBot("cancel")
    else {
      var win = window.open('http://stage-booking.livesmart.co.jp/', "myWindow", "width=400,height=600");
      var tempRef = this;
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
         // tempRef.eventManagerService.emitAppointmentCard(true);
          tempRef.scrollToBottom(); 
        }
      }, 1000);
    }
  }

  onGetBookingselect() {
    var win = window.open('http://stage-booking.livesmart.co.jp/user-calendar/', "myWindow", "width=400,height=600");
    var tempWindow = win.opener;
    var timer = setInterval(function () {
      if (win.closed) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
