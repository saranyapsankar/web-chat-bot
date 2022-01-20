import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/base/base.component';
import { IntentList } from 'src/app/model/intent-config.model';
import { SelectOptions } from 'src/app/model/select-options.model';
import { CommonService } from 'src/app/services/common.service';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';
import { ButtonType } from 'src/app/shared/enum/button-type.enum';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() intentSelected = '';
  @Input() messageText = '';
  selectOptions: SelectOptions[];
  availableOptions: SelectOptions[];
  questionText: string;
  isDropDown: boolean;
  isSuggestionChips:boolean;
  intentConfigObj: IntentList;
  // assessmentOptions: any[] = [
  //   { key: 1, name: "assessment.Confirm" },
  //   { key: 2, name: "assessment.ExistingPatient" }];
  // userList: any[] = [
  //   { key: 1, name: "assessment.PatientOne", ref: '121756' },
  //   { key: 2, name: "assessment.PatientTwo", ref: '203983' },
  //   { key: 2, name: "assessment.PatientThree", ref: '221987' }];
  // eatTypeObj: any[] = [
  //   { key: 1, name: "assessment.CanEatTextOne" },
  //   { key: 2, name: "assessment.CanEatTextTwo" },
  //   { key: 2, name: "assessment.CanEatTextThree" },
  //   { key: 2, name: "assessment.CanEatTextFour" },
  //   { key: 2, name: "assessment.CanEatTextFive" }];
  // howTextObj: any[] = [
  //   { key: 1, name: "assessment.HowTextOne" },
  //   { key: 2, name: "assessment.HowTextTwo" },
  //   { key: 2, name: "assessment.HowTextThree" }];
  // SelfHelpObj: any[] = [
  //   { key: 1, name: "assessment.SelfHelpYes" },
  //   { key: 2, name: "assessment.SelfHelpNo" }];
  // confirmationObj: any[] = [
  //   { key: 1, name: "assessment.Yes" },
  //   { key: 2, name: "assessment.No" }];
  
  constructor(private formBuilder: FormBuilder,
    private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }
  assessmentForm = this.formBuilder.group({
    fieldCtrl: [null, Validators.required]
  });

  ngOnInit(): void {
    this.intentConfigObj = this.getIntentConfig().intents.find((item)=> {
      console.log(this.intentSelected+" - inside apartment list");
      return item.name == this.intentSelected;
    });
    if(this.intentConfigObj && this.intentConfigObj.buttonType == ButtonType.Dropdown) {
      this.isDropDown = true;
      this.selectOptions = this.intentConfigObj.options;
      this.availableOptions = [];
    } else if(this.intentConfigObj && this.intentConfigObj.buttonType == ButtonType.SuggestionChip){
      this.isSuggestionChips = true;
      this.selectOptions = [];
      this.availableOptions = this.intentConfigObj.options;
    } else if(!this.intentConfigObj?.buttonType) {
      this.isSuggestionChips = false;
      this.isDropDown = false;
      this.selectOptions = [];
      this.availableOptions = [];
    }
  }
  onOptionChange(event: MatSelectChange) {
    if (event && event.value){
      this.subscriptions.push(this.translate.get(event.value.name).subscribe((t) =>{
        var message = (event.value.ref) ? t + ' ' +event.value.ref : t;
        this.eventManagerService.emitMessageTextToBot(message)
      }));
    }
    }
  onChipselect(message: string) { 
    this.subscriptions.push(this.translate.get(message).subscribe((text) =>
     this.eventManagerService.emitMessageTextToBot(text)));
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
}
