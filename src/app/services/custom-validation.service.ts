import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  private static MATCH_REGEXP = /^((?:\-*\d+(\.\d+)?)+|(((?<!^)[/+*-])(?![/+*-])(?<![/+*-])$)+|((?:\-*((sin)|(cos)|(tan))(\(\-*\d+(\.\d+)?)\))(?![(sin)|(cos)|(tan)])))+$/;

  constructor() {
  }

  static MathExpresionValidation(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(CustomValidationService.MATCH_REGEXP);
      return matches ? null : {'MathExpresionValidation': true};
    } else {
      return null;
    }
  }
}
