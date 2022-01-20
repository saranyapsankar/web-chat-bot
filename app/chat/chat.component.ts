import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '../model/message.model';
import { TextMessage } from '../model/text-messsage.model';
import { ResponseMessage } from '../model/response-message.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventManagerService } from '../services/shared-event-manager.service';//import {Aos} from 'aos';
import { BaseComponent } from '../base/base.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends BaseComponent implements OnInit {
  @ViewChild('myScrollContainer') private myScrollContainer: ElementRef;
  BACK_ENABLED: boolean = true;
  @Input('messages') messages: any[];
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;
 
  textInput = '';
  messageText: string;
  constructor(private chatService: ChatService,
     private eventManagerService: EventManagerService,
     public commonService: CommonService) {
    super(commonService);
  }

  ngOnInit() {
    this.subscribeToExecutionEvents()
    this.messages=[];
   
   let messageBack: TextMessage = { "firstname": environment.firstName, "text": "Welcome onload"}
   this.subscriptions.push(this.chatService.sendMessage(messageBack)
   .subscribe((res: any) => {
    console.log(res);
     res = JSON.parse(res?.result?.replaceAll("\\\\", "")) as ResponseMessage;
     let messageReturn: Message = { 
       text: res.responseMessage,
       date: new Date().toDateString(),
       userOwner: false,
       intent:res.intent
      }
      
     this.messages.push(messageReturn);
     
   }));
  }

  scrollToElement(): void {
    var container = document.getElementById("msgContainer");    
    container.scrollTop = container.scrollHeight; 
  }

  subscribeToExecutionEvents() {
    this.subscriptions.push(this.eventManagerService
      .getMessageTextObservable()
      .subscribe((message: string) => {
        this.messageText = message;
        if(this.messageText != null && this.messageText != '' && this.messageText != undefined) this.handleUserMessage();
      }));
  }
  

  saveTextMessage(){
    this.messageText = this.textInput;
    if(this.textInput != null && this.textInput != '' && this.textInput != undefined) this.handleUserMessage()
  }

  handleUserMessage() {
    let newMessage: Message = { text: this.messageText, date: "", userOwner: true};
     this.messages.push(newMessage);
    let messageBack: TextMessage = { "firstname": environment.firstName, "text": this.messageText}
    if(this.BACK_ENABLED){
      this.subscriptions.push(this.chatService.sendMessage(messageBack)
      .subscribe((res: any) => {
        console.log(res.intent);
        
       res = JSON.parse(res?.result?.replaceAll("\\\\", "")) as ResponseMessage;
        let messageReturn: Message = { 
          text: res.responseMessage,
           date: new Date().toDateString(),
           userOwner: false, 
           intent:res.intent
        }
        console.log(JSON.stringify(this.intentConfigData));  
        
        this.messages.push(messageReturn);
        if(res.intent =='How_To_Use'){ this.eventManagerService.emitIsChipsToBot(true);}
        else this.eventManagerService.emitIsChipsToBot(false);
      }));
    }
    this.textInput = '';
  }

  onKey(){
      this.saveTextMessage();
  }

 

}
