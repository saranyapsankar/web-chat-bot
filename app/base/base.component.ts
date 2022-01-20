import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';
import { IntentConfig } from '../model/intent-config.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements OnInit {

  subscriptions: Subscription[] = [];
  intentConfigData: IntentConfig;
  constructor(public commonService: CommonService) { 
  }

  ngOnInit(): void {
    console.log("in base comp onint"+JSON.stringify(this.intentConfigData));
  }

  getIntentConfig() {
    return this.commonService.intentConfigData as IntentConfig;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });
}
}
