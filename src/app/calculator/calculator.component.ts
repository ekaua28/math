import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidationService} from "../services/custom-validation.service";
import {CalculationService} from "../services/calculation.service";
import {RandomService} from "../services/random.service";
import {Observable} from "rxjs";
import {HistoryService} from "../services/history.service";

/**
 * Component for rendering calculator
 */
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  /**
   * currentNumber variable helper used for, for detection current number
   */
  currentNumber = "";
  /**
   * variable for expresion
   */
  expresion = "";
  /**
   * variable for result
   */
  result = "";
  /**
   * Form for calculator
   */
  basicForm: FormGroup;
  /**
   * Observable for getting random number from random service
   */
  randomNumber$: Observable<number>;

  constructor(private fb: FormBuilder, private randomService: RandomService, private historyService: HistoryService) {
    this.createForm();
  }

  ngOnInit() {
    this.randomNumber$ = this.randomService.getRandomNumber$()
  }

  ngAfterViewInit() {
    /*
      Added subscribe to detect random number and used in expresion
     */
    this.randomNumber$.subscribe(num => {
      num && this.setNumber(num.toString());
    })
  }

  /**
   * Creating form, and describe validation for field 'expresion' CustomValidationService.MathExpresionValidation
   */
  createForm() {
    this.basicForm = this.fb.group({
      expresion: ['', Validators.compose([Validators.required, CustomValidationService.MathExpresionValidation])]
    });
  }

  /**
   * Function setter, added number to expression
   * @param num number in sting type
   */
  setNumber(num: string) {
    this.currentNumber += num;
    this.expresion += num;
  }

  /**
   * Function setter, added trigonometry operation to expression, by default added with 0
   * @param trigonometry operation
   */
  setTrigonometry(trigonometry: string) {
    this.currentNumber = "";
    this.expresion += trigonometry + "(0)";
  }

  /**
   * Function setter, added math operation to expression
   * @param op math operation what will be added to expression
   */
  setOperation(op: string) {
    this.expresion += op;
    this.currentNumber = ""
  }

  /**
   * Function setter, added possibility use decimal number in expression.
   * In case if dot was clicked first, added 0 on begin.
   */
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

  /**
   * Evaluating function, also store expresion and result of that
   */
  evaluate() {
    this.result = CalculationService.Evaluate(this.expresion);
    this.historyService.addResultHistory$(this.expresion + "=" + this.result);
  }

  /**
   * Clean expresion and last result
   */
  clear() {
    this.currentNumber = "";
    this.expresion = "";
    this.result = "";
  }

  /**
   * get random number from service
   */
  random() {
    this.randomService.fetchNumber();
  }

}
