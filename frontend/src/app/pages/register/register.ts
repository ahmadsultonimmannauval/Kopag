import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, httpErrorMessage } from '../../core/auth.service';
import { AlertToast } from '../../shared/ui/alert-toast/alert-toast';
import { AuthLayout } from '../../shared/ui/auth-layout/auth-layout';
import { InputText } from '../../shared/ui/input-text/input-text';
import { PrimaryButton } from '../../shared/ui/primary-button/primary-button';
import { matchWith, passwordStrength } from '../../shared/validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AuthLayout, InputText, PrimaryButton, AlertToast],
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    password: ['', [Validators.required, Validators.minLength(8), passwordStrength]],
    confirmPassword: ['', [Validators.required, matchWith('password')]],
  });
  protected readonly loading = signal(false);
  protected readonly errorText = signal<string | null>(null);

  constructor() {
    // Validasi ulang konfirmasi saat kata sandi diubah
    this.form.controls.password.valueChanges.subscribe(() =>
      this.form.controls.confirmPassword.updateValueAndValidity(),
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorText.set(null);
    const { name, email, password } = this.form.getRawValue();
    this.auth.register({ name, email, password }).subscribe({
      next: () => this.router.navigate(['/login'], { state: { registered: true } }),
      error: (err) => {
        this.loading.set(false);
        this.errorText.set(httpErrorMessage(err));
      },
    });
  }
}
