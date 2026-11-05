import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { PrimaryButton } from '../../shared/ui/primary-button/primary-button';

/** Placeholder tujuan setelah login berhasil. Diganti pada Sprint 2. */
@Component({
  selector: 'app-dashboard',
  imports: [PrimaryButton],
  template: `
    <main class="placeholder">
      <h1>Dashboard Inventori &amp; Kedaluwarsa</h1>
      <p>Anda berhasil masuk. Modul dashboard lengkap dikerjakan pada Sprint 2.</p>
      <app-primary-button (click)="logout()">Keluar</app-primary-button>
    </main>
  `,
})
export class Dashboard {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
