import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';
import {CustomValidationService} from "./custom-validation.service";

describe('CalculationService', () => {
  let service: CalculationService;
  it('should run MathExpresionValidation with empty spring', () => {
    expect(CalculationService.Evaluate('')).toBe('');
  });
  it('should run MathExpresionValidation with 3+2+4', () => {
    expect(CalculationService.Evaluate('3+2+4')).toBe('9');
  });
  it('should run MathExpresionValidation with sin(30)+cos(20)', () => {
    expect(CalculationService.Evaluate('sin(30)+cos(20)')).toBe('-0.5799495622794699');
  });
  it('should run MathExpresionValidation with sin(30)', () => {
    expect(CalculationService.Evaluate('sin(30)')).toBe('-0.9880316240928618');
  });
  it('should run MathExpresionValidation with 3*0', () => {
    expect(CalculationService.Evaluate('3*0')).toBe('0');
  });
  it('should run MathExpresionValidation with 3/3', () => {
    expect(CalculationService.Evaluate('3/3')).toBe('1');
  });
  it('should run MathExpresionValidation with tan(0)', () => {
    expect(CalculationService.Evaluate('tan(0)')).toBe('0');
  });
  it('should run MathExpresionValidation with 2-1+2*5+6-10/2', () => {
    expect(CalculationService.Evaluate('2-1+2*5+6-10/2')).toBe('12');
  });
});
