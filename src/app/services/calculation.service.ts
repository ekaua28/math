import {Injectable} from '@angular/core';

/**
 * Service for execution expression, validation for expresion made in another service, all input params already validate.
 * In case if reuse this service and will send not validated data, need to added exception cases.
 */

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  /**
   * Expression to detect trigonometry function
   */
  private static TRIGONOMETRY_DETECT_REGEXP = /((sin)|(cos)|(tan))(\(\-*\d+(\.\d+)?)\)+/g;

  /**
   * Expression to split trigonometry function, on operation and number
   */
  private static TRIGONOMETRY_MATCH_REGEXP = /((sin)|(cos)|(tan))|(\-*\d+(\.\d+)?)/g;

  /**
   * Array of possible signs, what can be used in evaluation
   */
  private static SIGNS = ["*", "/", "-", "+", "+-", "-+", "--"];

  constructor() {
  }

  /**
   * Function to get result of Math operation base on trigonometry function operation
   * @param operation, trigonometry function
   * @param number, input param for trigonometry function
   * @return result of operation
   * @constructor
   */
  private static TrigonometryOperation(operation: string, number: string): number {
    switch (operation) {
      case "sin":
        return Math.sin(parseFloat(number));
      case "cos":
        return Math.cos(parseFloat(number));
      case "tan":
        return Math.tan(parseFloat(number));
    }
  }

  /**
   * Function for replacing trigonometry operation on their result, for continuing evaluation
   * @param str original string for replacing
   * @return replaced string
   * @constructor
   */
  private static NormalizeTrigonometry(str: string): string {
    const matches = str.match(this.TRIGONOMETRY_DETECT_REGEXP);
    if (matches) {
      for (var place = 0; place < matches.length; place++) {
        const groups = matches[place].match(this.TRIGONOMETRY_MATCH_REGEXP);
        if (groups[1].match(this.TRIGONOMETRY_DETECT_REGEXP)) {
          groups[1] = this.NormalizeTrigonometry(groups[1]);
        } else {
          str = str.replace(matches[place], this.TrigonometryOperation(groups[0], groups[1]).toString());
        }
      }
    }
    return str;
  }

  /**
   * Function to solved problem with first negation sign
   * @param array of character from expresion
   * @return modified array
   */
  private static NormalizeSign(array: string[]): string[] {
    if (array[0] === '-') {
      array[1] = "-" + array[1];
      array.shift();
    }
    return array;
  }

  /**
   * Function to normalize decimal, and prepared array to evaluating expresion
   * @param array of character from expresion
   * @return modified array
   */
  private static NormalizeDot(array: string[]): string[] {
    for (var place = 0; place < array.length; place++) {
      if (array[place] == ".") {
        array[place - 1] = array[place - 1] + "." + array[place + 1];
        array.splice(place--, 2);
      }
    }
    return array;
  }

  /**
   * Operation multiply
   * @param x operand
   * @param y operand
   * @return result of multiply
   */
  private static multiply(x: number, y: number): number {
    return x * y;
  }

  /**
   * Operation subtract
   * @param x operand
   * @param y operand
   * @return result of subtract
   */
  private static subtract(x: number, y: number): number {
    return x - y;
  }

  /**
   * Operation divide
   * @param x operand
   * @param y operand
   * @return result of divide
   */
  private static divide(x: number, y: number): number {
    return x / y;
  }

  /**
   * Operation add
   * @param x operand
   * @param y operand
   * @return result of add
   */
  private static add(x: number, y: number): number {
    return x + y;
  }

  /**
   * Function help call right function base on which operator used
   * @param operator
   * @return function base on operator symbol
   */
  private static getOperation(operator: string) {
    switch (operator) {
      case "*":
        return this.multiply;
      case "/":
        return this.divide;
      case "-":
      case "-+":
      case "+-":
        return this.subtract;
      case "+":
      case "--":
        return this.add;
    }
  }

  /**
   * Function calculation, base on sign, start loop in math priority of sign.
   * After detection sign, start doing math operation with number.
   * Currently this function don't support prioritizing operation by '(' and ')' and also 'atan' not supported
   * @param array of characters from expresion
   * @return result of expresion evaluation
   */
  private static Calculation(array: string[]): string {
    for (var round = 0; round < this.SIGNS.length; round++) {
      for (var place = 0; place < array.length; place++) {
        if (array[place] == this.SIGNS[round]) {
          array[place - 1] = this.getOperation(this.SIGNS[round])(parseFloat(array[place - 1]), parseFloat(array[place + 1])).toString();
          array.splice(place--, 2);
        }
      }
    }
    return array[0];
  }

  /**
   * Function for getting expression in string, call all normalization logic and return result
   * @param str validated expression in string
   * @return result of expresion evaluation from function Calculation
   */
  static Evaluate(str: string): string {
    let tokens = this.NormalizeTrigonometry(str).split(/\b/);
    tokens = this.NormalizeSign(tokens);
    tokens = this.NormalizeDot(tokens);
    return this.Calculation(tokens);
  }
}
