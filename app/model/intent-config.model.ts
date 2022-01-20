import { SelectOptions } from "./select-options.model";
import { ButtonType } from '../shared/enum/button-type.enum'

export interface IntentConfig {
    intents : IntentList[];
}

export interface IntentList {
    name: string;
    options: SelectOptions[];
    availableBtns: SelectOptions[];
    calendarBtns: SelectOptions[];
    nextOptions: SelectOptions[];
    buttonType?: ButtonType;
}