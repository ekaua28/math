import { TestBed } from '@angular/core/testing';

import { CustomValidationService } from './custom-validation.service';
import {FormControl} from "@angular/forms";

describe('CustomValidationService', () => {
  let service: CustomValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should run MathExpresionValidation with empty spring', () => {
    expect(CustomValidationService.MatchFunction('')).toBeNull();
  });
  it('should run MathExpresionValidation with 3+2+4', () => {
    expect(CustomValidationService.MatchFunction('3+2+4')).toBeTruthy();
  });
  it('should run MathExpresionValidation with sin(30)+cos(20)', () => {
    expect(CustomValidationService.MatchFunction('sin(30)+cos(20)')).toBeTruthy();
  });
  it('should run MathExpresionValidation with sin(30', () => {
    expect(CustomValidationService.MatchFunction('sin(30')).toBeNull();
  });
  it('should run MathExpresionValidation with 3++', () => {
    expect(CustomValidationService.MatchFunction('3++')).toBeNull();
  });
});
