import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }),
  );

  it('menampilkan galat validasi saat form kosong dikirim', async () => {
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
    const errors = Array.from(el.querySelectorAll('.field__error')).map((e) => e.textContent);
    expect(errors).toContain('Email wajib diisi');
    expect(errors).toContain('Kata sandi wajib diisi');
  });

  it('tombol Masuk tersedia', async () => {
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('button[type="submit"]').textContent).toContain(
      'Masuk',
    );
  });
});
