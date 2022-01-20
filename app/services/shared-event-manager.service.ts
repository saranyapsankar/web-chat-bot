import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class EventManagerService {
    private messageTextSubject = new Subject<string>();
    private messageText$: Observable<string> = this.messageTextSubject.asObservable(); 
    private isChipsSubject = new Subject<boolean>();
    private isChips$: Observable<boolean> = this.isChipsSubject.asObservable();
    private acTypeSelectedSubject = new Subject<string>();
    private acTypeSelected$: Observable<string> = this.acTypeSelectedSubject.asObservable();
     appointmentCardSubject = new Subject<string>();
     appointmentCard$: Observable<string> = this.appointmentCardSubject.asObservable();
    
    constructor() {
    }

    emitMessageTextToBot(value: string){
        this.messageTextSubject.next(value);
    }
    getMessageTextObservable(): Observable<string> {
        return this.messageText$;
    }
    emitIsChipsToBot(value: boolean){
        this.isChipsSubject.next(value);
    }
    getIsChipsObservable(): Observable<boolean> {
        return this.isChips$;
    }
    emitAcTypeSelected(value: string){
        this.acTypeSelectedSubject.next(value);
    }
    getAcTypeSelectedObservable(): Observable<string> {
        return this.acTypeSelected$;
    }

    emitAppointmentCard(value: string){
        this.appointmentCardSubject.next(value);
    }
    getAppointmentCardObservable(): Observable<string> {
        return this.appointmentCard$;
    }
}
