import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private static TRIGONOMETRY_DETECT_REGEXP = /((sin)|(cos)|(tan))(\(\-*\d+(\.\d+)?)\)+/g;
  private static TRIGONOMETRY_MATCH_REGEXP = /((sin)|(cos)|(tan))|(\-*\d+(\.\d+)?)/g;
  private static SIGNS = ["*", "/", "-", "+", "+-", "-+", "--"];

  constructor() {
  }

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

  private static NormalizeTrigonometry(str: string): string {
    const matches = str.match(this.TRIGONOMETRY_DETECT_REGEXP);
    if (matches) {
      for (var place = 0; place < matches.length; place++) {
        const groups = matches[place].match(this.TRIGONOMETRY_MATCH_REGEXP);
        str = str.replace(matches[place], this.TrigonometryOperation(groups[0], groups[1]).toString());
      }
    }
    return str;
  }

  private static NormalizeSign(array: string[]): string[] {
    if (array[0] === '-') {
      array[1] = "-" + array[1];
      array.shift();
    }
    return array;
  }

  private static NormalizeDot(array: string[]): string[] {
    for (var place = 0; place < array.length; place++) {
      if (array[place] == ".") {
        array[place - 1] = array[place - 1] + "." + array[place + 1];
        array.splice(place--, 2);
      }
    }
    return array;
  }

  private static multiply(x: number, y: number): number {
    return x * y;
  }

  private static subtract(x: number, y: number): number {
    return x - y;
  }

  private static divide(x: number, y: number): number {
    return x / y;
  }

  private static add(x: number, y: number): number {
    return x + y;
  }

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

  static Evaluate(str: string): string {
    let tokens = this.NormalizeTrigonometry(str).split(/\b/);
    tokens = this.NormalizeSign(tokens);
    tokens = this.NormalizeDot(tokens);
    return this.Calculation(tokens);
  }
}
