import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rangeLengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value?.length ?? 0;
    return length >= min && length <= max ? null : { rangeLength: true };
  };
}

export function equalToValidator(matchControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === matchControl.value ? null : { equalTo: true };
  };
}