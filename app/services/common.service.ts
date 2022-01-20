import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  intentConfigData: any;
   constructor(private http: HttpClient) {
        this.getIntentConfigJSON().subscribe(data => {
            this.intentConfigData = data;
        });
    }

    public getIntentConfigJSON(): Observable<any> {
      if(this.intentConfigData) return this.intentConfigData;
      return this.http.get("assets/config/intent-config.json");
    }
}
