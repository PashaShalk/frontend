import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidator {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordsMismatch: true } : null;
  }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

export class LoginMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.invalid && control.touched;
  }
}
