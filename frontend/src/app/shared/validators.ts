import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Kata sandi wajib mengandung huruf dan angka. */
export const passwordStrength: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = String(control.value ?? '');
  if (!value) return null;
  const errors: ValidationErrors = {};
  if (!/[A-Za-z]/.test(value)) errors['noLetter'] = true;
  if (!/\d/.test(value)) errors['noDigit'] = true;
  return Object.keys(errors).length ? errors : null;
};

/** Nilai kontrol harus sama dengan kontrol saudara (mis. konfirmasi kata sandi). */
export function matchWith(siblingName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sibling = control.parent?.get(siblingName);
    if (!sibling || !control.value) return null;
    return sibling.value === control.value ? null : { mismatch: true };
  };
}

/** Pesan galat berbahasa Indonesia untuk satu kontrol (null bila valid). */
export function errorMessage(control: AbstractControl, label: string): string | null {
  const e = control.errors;
  if (!e) return null;
  if (e['required']) return `${label} wajib diisi`;
  if (e['email']) return 'Format email tidak valid, contoh: nama@perusahaan.com';
  if (e['minlength']) return `${label} minimal ${e['minlength'].requiredLength} karakter`;
  if (e['maxlength']) return `${label} maksimal ${e['maxlength'].requiredLength} karakter`;
  if (e['noLetter']) return `${label} harus mengandung huruf`;
  if (e['noDigit']) return `${label} harus mengandung angka`;
  if (e['mismatch']) return `${label} tidak sama`;
  return 'Isian tidak valid';
}
