import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

/**
 * HistoryService to store result and expression that was executed
 * used 3 method, get, add, and clean
 *
 * get: getResultHistory$ to get Observable
 * add: addResultHistory$ to add new value
 * clean: cleanResultHistory$ to clean store
 */
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
