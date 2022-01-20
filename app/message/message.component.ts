import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Message } from '../model/message.model';
import { EventManagerService } from '../services/shared-event-manager.service';
import { TranslateService } from '@ngx-translate/core'
import { lang } from 'moment';
import { ChatService } from '../chat/chat.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input('text') text: string;
  @Input('date') date: any;
  @Input('owner') owner: boolean;
  @Input('messageObject') messageObject: Message;
 showMedia: boolean = false;
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;
  selectOptions: any[] = [
    { key: 1, name: "English", value: "en", dispName: "en-US" },
    { key: 2, name: "日本語", value: "jp", dispName: "ja-JP" }];
    assessmentOptions: any[] = [
      { key: 1, name: "assessment.Confirm" },
      { key: 2, name: "assessment.ExistingPatient"}];
  isLangSelected: boolean;
  acTypeSelected: string;
  showAssessment: boolean;

  constructor(private eventManagerService: EventManagerService,
    private chatService: ChatService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  ngOnInit(): void{
    console.log(this.messageObject.intent);
    if(this.messageObject && this.messageObject.intent){
      if(this.messageObject.intent.includes('UserProvides') || this.messageObject.intent == 'eating_assessment' ||
      this.messageObject.intent == 'eating_assessment - existing'){
        this.showAssessment = true;
        if(this.messageObject.intent == 'UserProvidesDoesChoke - yes/no') {
          this.messageObject.text = this.formatValueInSummary(this.messageObject.text);
          this.messageObject.text.replace('"','');
        }
      } else this.showAssessment = false;
    }
  }
 
  formatValueInSummary(str) {
    var stringToChange = str.match(/(?<=:).*?(?=\n)/g);
    return str.replace(stringToChange, function(d,e) { console.log(e); return '<b>' + e + '</b>' });
}

  onChipselect(src:string){
    this.eventManagerService.emitMessageTextToBot(src);
  }
  onTypeChange(message:string){
    this.subscriptions.push(this.translate.get(message).subscribe((t) =>
     this.eventManagerService.emitMessageTextToBot(t)));
  }

  onLangChange(langObj) {
    if(langObj && langObj.value) {
      this.translate.use(langObj.value); 
      this.chatService.setSelectedLanguage(langObj.dispName),
      this.eventManagerService.emitMessageTextToBot(langObj.name);
    }
   }

  ngAfterViewInit() {         
    var container = document.getElementById("msgContainer");           
    container.scrollTop = container.scrollHeight;     
  } 
  onGetBookingselect(){
    window.open('http://stage-booking.livesmart.co.jp/user-calendar/',"myWindow", "width=400,height=600"); 
  }
}

