import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Service for validation
 */

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  /**
   * Validation logic base on reg exp and detection allowed symbols
   */
  private static MATCH_REGEXP = /^((?:\-*\d+(\.\d+)?)+|(((?<!^)[/+*-])(?![/+*-])(\d|(((sin)|(cos)|(tan))(\(\-*\d+(\.\d+)?)\))))+|((?:\-*((sin)|(cos)|(tan))(\(\-*\d+(\.\d+)?)\))(?![(sin)|(cos)|(tan)])))+$/;

  constructor() {
  }

  /**
   * Function for validation field, return specific flag 'MathExpresionValidation' in case of error
   * @param control: FormControl
   * @constructor
   */
  static MathExpresionValidation(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(CustomValidationService.MATCH_REGEXP);
      return matches ? null : {'MathExpresionValidation': true};
    } else {
      return null;
    }
  }
}
