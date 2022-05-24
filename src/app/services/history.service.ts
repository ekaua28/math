import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private resultHistory$: BehaviorSubject<string[]>;

  constructor() {
    this.resultHistory$ = new BehaviorSubject<string[]>([]);
  }

  getResultHistory$(){
    return this.resultHistory$.asObservable();
  }

  addResultHistory$(result){
    this.resultHistory$.next(this.resultHistory$.getValue().concat([result]));
  }

  cleanResultHistory$(){
    this.resultHistory$.next([]);
  }

}
