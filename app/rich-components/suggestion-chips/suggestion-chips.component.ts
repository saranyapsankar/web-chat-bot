import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { IntentList } from 'src/app/model/intent-config.model';

@Component({
  selector: 'app-suggestion-chips',
  templateUrl: './suggestion-chips.component.html',
  styleUrls: ['./suggestion-chips.component.scss']
})
export class SuggestionChipsComponent extends BaseComponent implements OnInit {
  @Input() intentSelected = '';
  intentConfigObj: IntentList;

  constructor(private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  ngOnInit(): void {
    this.intentConfigObj = this.getIntentConfig().intents.find((item)=> {
      console.log(this.intentSelected+" - inside apartment list");
      return item.name == this.intentSelected;
    });
  }
  
  onChipselect(message:string){
    this.subscriptions.push(this.translate.get(message).subscribe((textMessage: string) =>
     this.eventManagerService.emitMessageTextToBot(textMessage)));
  }

}
