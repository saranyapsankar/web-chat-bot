import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base/base.component';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { IntentConfig, IntentList } from 'src/app/model/intent-config.model';
import { SelectionChange } from '@angular/cdk/collections';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-ac-service',
  templateUrl: './ac-service.component.html',
  styleUrls: ['./ac-service.component.scss']
})
export class AcServiceComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() isTypeSelected = false;
  @Input() intentSelected = '';
  @Input() messageText = '';
selectTypeOptions = 
[
  { key: 1, name: "Wall mounted", transtext: "dropdown.WallMounted"},
  { key: 2, name: "Ceiling mounted", transtext: "dropdown.CeilingMounted" }
];
// nextOptions = 
// [
//   { key: 1, name: "Next", transtext: "stepper.Next", isProceed:true},
//   { key: 2, name: "Cancel", transtext: "service.CancelBtn", isProceed:false }
// ];
// selectOptions = 
// [
//   { key: 1, name: "Park House ABC 605", tname: " ABC 605", apName: "ABC", apNumber: " 605", mobileNumber: "08011232289" },
//   { key: 2, name: "Park House ABC 808", tname: " ABC 808", apName: "ABC", apNumber: " 808", mobileNumber: "09041223434" },
//   { key: 3, name: "Park House ABC 1101", tname: " ABC 1101", apName: " ABC", apNumber: " 1101", mobileNumber: "09011112222" },
//   { key: 4, name: "Park House DEF 101", tname: " DEF 101", apName: " DEF", apNumber: " 101", mobileNumber: "08049078645" },
//   { key: 6, name: "Park House DEF 105", tname: " DEF 105", apName: " DEF", apNumber: " 105", mobileNumber: "09070005678" },
//   { key: 5, name: "Park House DEF 1008", tname: " DEF 1008", apName: " DEF", apNumber: " 1008", mobileNumber: "09023888422" },
// ];
// acCountOptions = [1, 2, 3, 4];

apartmentForm = this.formBuilder.group({
  apartmentCtrl: [null, Validators.required],
  acTypeCtrl: [null, Validators.required]
});
  
  apartmentNumber: string;
  apartmentName: string;
  mobileNumber: any;
  container: HTMLElement;
  isAcTypeSelected: boolean;
  isOptionSelected: boolean;
  acType: string;
  acCount: any;
  showacSelectionSummary: boolean;
  isApartmentSelection: boolean;
  acTypeSelected: string;
  intentConfigObj: IntentList;
  constructor(private formBuilder: FormBuilder,
    private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  ngOnInit(): void {
    this.subscribeToExecutionEvents();
    this.intentConfigObj = this.getIntentConfig().intents.find((item)=> {
      return item.name == this.intentSelected;
    });
    if(this.intentSelected.includes('wall')) this.acTypeSelected = this.selectTypeOptions[0].transtext;
    if(this.intentSelected.includes('ceiling')) this.acTypeSelected = this.selectTypeOptions[1].transtext;
  }
  onACTypeChange(event: MatSelectChange){
    if(event && event.value){
      this.subscriptions.push(this.translate.get(event.value.transtext).subscribe((t) =>
      this.eventManagerService.emitMessageTextToBot(t)
      )); 
      this.eventManagerService.emitAcTypeSelected(event.value.transtext);
    }
    this.scrollToBottom();  
  }
  onNextChipselect(valObj){
    if(!valObj?.isProceed) {
      this.subscriptions.push(this.translate.get(valObj?.transtext).subscribe((t) =>
      this.eventManagerService.emitMessageTextToBot(t)
      ));
    } else this.isApartmentSelection = true;
    this.scrollToBottom();  
  }
  onCountChipselect(count) {
    this.acCount = count;
    this.showacSelectionSummary = true;   
    this.scrollToBottom();      
  }

  scrollToBottom() {
    setTimeout(function(){ 
       var container = document.getElementById("msgContainer");           
       container.scrollTop = container.scrollHeight; 
     }, 1000);
  }

  onApartmentChange(event: MatSelectChange) {
    if(event && event.value){
    this.isOptionSelected = true;
    this.apartmentNumber =event.value.apNumber;
    this.apartmentName =event.value.apName;
    this.mobileNumber = event.value.mobileNumber;
    this.scrollToBottom();  
    }
  }
  onChipselect(message:string){
    this.subscriptions.push(this.translate.get(message).subscribe((t) =>
     this.eventManagerService.emitMessageTextToBot(t)
     ));      
     this.scrollToBottom();              
  }

  ngAfterViewInit() {    
    this.scrollToBottom();      
  } 

  subscribeToExecutionEvents() {
    this.subscriptions.push(this.eventManagerService
      .getAcTypeSelectedObservable()
      .subscribe((type: string) => {
        this.acType = type;
        }));
  }
}

