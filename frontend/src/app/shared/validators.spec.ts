import { FormControl, FormGroup, Validators } from '@angular/forms';
import { errorMessage, matchWith, passwordStrength } from './validators';

describe('passwordStrength', () => {
  it('menolak kata sandi tanpa angka', () => {
    expect(passwordStrength(new FormControl('hurufsaja'))).toEqual({ noDigit: true });
  });

  it('menolak kata sandi tanpa huruf', () => {
    expect(passwordStrength(new FormControl('12345678'))).toEqual({ noLetter: true });
  });

  it('menerima kombinasi huruf dan angka', () => {
    expect(passwordStrength(new FormControl('rahasia123'))).toBeNull();
  });
});

describe('matchWith', () => {
  const build = (password: string, confirm: string) => {
    const group = new FormGroup({
      password: new FormControl(password),
      confirmPassword: new FormControl(confirm, [matchWith('password')]),
    });
    group.controls.confirmPassword.updateValueAndValidity(); // jalankan setelah terhubung ke group
    return group;
  };

  it('mendeteksi konfirmasi yang berbeda', () => {
    expect(build('rahasia123', 'beda12345').controls.confirmPassword.errors).toEqual({
      mismatch: true,
    });
  });

  it('valid bila konfirmasi sama', () => {
    expect(build('rahasia123', 'rahasia123').controls.confirmPassword.errors).toBeNull();
  });
});

describe('errorMessage', () => {
  it('email kosong -> wajib diisi', () => {
    const c = new FormControl('', [Validators.required]);
    expect(errorMessage(c, 'Email')).toBe('Email wajib diisi');
  });

  it('email salah format', () => {
    const c = new FormControl('sarah@', [Validators.email]);
    expect(errorMessage(c, 'Email')).toContain('Format email tidak valid');
  });

  it('kata sandi kurang dari 8 karakter', () => {
    const c = new FormControl('abc123', [Validators.minLength(8)]);
    expect(errorMessage(c, 'Kata sandi')).toBe('Kata sandi minimal 8 karakter');
  });

  it('boundary: tepat 8 karakter valid', () => {
    const c = new FormControl('abcd1234', [Validators.minLength(8)]);
    expect(errorMessage(c, 'Kata sandi')).toBeNull();
  });

  it('nama lebih dari 100 karakter', () => {
    const c = new FormControl('a'.repeat(101), [Validators.maxLength(100)]);
    expect(errorMessage(c, 'Nama lengkap')).toBe('Nama lengkap maksimal 100 karakter');
  });
});
