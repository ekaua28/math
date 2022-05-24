import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidationService} from "../services/custom-validation.service";
import {CalculationService} from "../services/calculation.service";
import {RandomService} from "../services/random.service";
import {Observable} from "rxjs";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currentNumber = "";
  expresion = "";
  result = "";
  basicForm: FormGroup;
  randomNumber$: Observable<number>;

  constructor(private fb: FormBuilder, private randomService: RandomService, private historyService: HistoryService) {
    this.createForm();
  }

  ngOnInit() {
    this.randomNumber$ = this.randomService.getRandomNumber$()
  }

  ngAfterViewInit() {
    this.randomNumber$.subscribe(num => {
      num && this.getNumber(num.toString());
    })
  }

  createForm() {
    this.basicForm = this.fb.group({
      expresion: ['', Validators.compose([Validators.required, CustomValidationService.MathExpresionValidation])]
    });
  }

  getNumber(num: string) {
    this.currentNumber += num;
    this.expresion += num;
  }

  getTrigonometry(trigonometry: string) {
    this.currentNumber = "";
    this.expresion += trigonometry + "(0)";
  }

  getOperation(op: string) {
    this.expresion += op;
    this.currentNumber = ""
  }

  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      if (this.currentNumber) {
        this.currentNumber += '.';
        this.expresion += '.';

      } else {
        this.currentNumber += '0.';
        this.expresion += '0.';
      }
    }
  }

  evaluate() {
    this.result = CalculationService.Evaluate(this.expresion);
    this.historyService.addResultHistory$(this.expresion + "=" + this.result);
  }

  clear() {
    this.currentNumber = "";
    this.expresion = "";
    this.result = "";
  }

  random() {
    this.randomService.fetchNumber();
  }

}
