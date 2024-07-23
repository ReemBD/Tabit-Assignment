import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const linkReg = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
export const isrPhoneReg =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
const englishCharsReg = /^[A-Za-z]+$/;

export function createPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const isrPhone = isrPhoneReg.test(control.value);
    const phoneValid = !!isrPhone;
    return !phoneValid ? { isrPhone } : null;
  };
}

export function createWebsiteLinkValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const domainOrLink = linkReg.test(control.value);
    const websiteLinkValid = !!domainOrLink;
    return !websiteLinkValid ? { domainOrLink: true } : null;
  };
}

export function createNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const englishChars = englishCharsReg.test(control.value);
    const nameValid = !!englishChars;
    return !nameValid ? { englishChars: true } : null;
  };
}
