import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { EventManagerService } from 'src/app/services/shared-event-manager.service';

import { BaseComponent } from 'src/app/base/base.component';
import { TranslateService } from '@ngx-translate/core'
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-hor-stepper',
  templateUrl: './hor-stepper.component.html',
  styleUrls: ['./hor-stepper.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})

export class HorStepperComponent extends BaseComponent implements OnInit {
  confirmText: string;
  arrangeText: string;
  constructor(private eventManagerService: EventManagerService,
    private translate: TranslateService,
    public commonService: CommonService) {
   super(commonService);
  }

  ngOnInit() {
    this.subscriptions.push(this.translate.get("stepper.Yes").
    subscribe((text) => (this.confirmText = text)));
    this.subscriptions.push(this.translate.get("stepper.ArrangePlumber").
    subscribe((text) => (this.arrangeText = text)));
  }
  onSubmit(message: string) {
    this.eventManagerService.emitMessageTextToBot(message);
  }
  

}
