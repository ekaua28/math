import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RandomService} from "../services/random.service";
import {HistoryService} from "../services/history.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  resultHistory$: Observable<string[]>;
  isEmpty: boolean;

  constructor(private fb: FormBuilder, private historyService: HistoryService) {
    this.isEmpty = true;
  }

  ngOnInit() {
    this.resultHistory$ = this.historyService.getResultHistory$()
  }

  ngAfterViewInit() {
    this.resultHistory$.subscribe(arr => {
      this.isEmpty = !arr.length;
    })
  }

  clear(){
    this.historyService.cleanResultHistory$()
  }

}
