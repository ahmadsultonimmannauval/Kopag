import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, httpErrorMessage } from '../../core/auth.service';
import { AlertToast } from '../../shared/ui/alert-toast/alert-toast';
import { AuthLayout } from '../../shared/ui/auth-layout/auth-layout';
import { InputText } from '../../shared/ui/input-text/input-text';
import { PrimaryButton } from '../../shared/ui/primary-button/primary-button';

interface ToastState {
  type: 'error' | 'success';
  message: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AuthLayout, InputText, PrimaryButton, AlertToast],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  protected readonly loading = signal(false);
  protected readonly toast = signal<ToastState | null>(
    history.state?.['registered']
      ? { type: 'success', message: 'Akun berhasil dibuat. Silakan masuk.' }
      : null,
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.toast.set(null);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard'], { replaceUrl: true }),
      error: (err) => {
        this.loading.set(false);
        this.toast.set({ type: 'error', message: httpErrorMessage(err) });
      },
    });
  }
}
