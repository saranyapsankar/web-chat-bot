import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TextMessage } from '../model/text-messsage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  selectedLanguage: string;
  constructor(private http: HttpClient) { 
    this.selectedLanguage = "ja-JP";
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      'Content-Type':  'application/json',
    })
  };

  sendMessage(textMessage: TextMessage){
    var reqBody = {
      "projectId": environment.dialogflow.projectId,
      "requestText": textMessage.text,
      "languageCode": this.selectedLanguage
    }
    return this.http.post(environment.backend.requestTextUrl, reqBody, this.httpOptions);
  }

  getSelectedLanguage() {
    return this.selectedLanguage;
  }
  setSelectedLanguage(lang) {
    this.selectedLanguage = lang;
  }
  
}
