import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { TokenStorage } from './token-storage';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface LoginResponse {
  token: string;
  user?: { id: string; name: string; email: string; role: string };
}

/** Ubah galat HTTP menjadi pesan yang jelas untuk pengguna. */
export function httpErrorMessage(error: unknown): string {
  if (!(error instanceof HttpErrorResponse) || error.status === 0) {
    return 'Server tidak dapat dihubungi. Periksa koneksi Anda.';
  }
  if (error.status === 401) return 'Email atau kata sandi salah';
  if (error.status === 409) return 'Email sudah terdaftar. Gunakan email lain atau masuk.';
  return error.error?.message ?? 'Terjadi kesalahan. Coba lagi.';
}

// Kontrak API: POST /api/v1/auth/login & /api/v1/auth/register
// (samakan dengan docs/api_specifications.md milik Backend)
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokens = inject(TokenStorage);
  private readonly baseUrl = inject(API_BASE_URL);

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/v1/auth/login`, payload)
      .pipe(tap((res) => this.tokens.set(res.token)));
  }

  register(payload: RegisterPayload): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/register`, payload);
  }

  logout(): void {
    this.tokens.clear();
  }

  isLoggedIn(): boolean {
    return this.tokens.get() !== null;
  }
}
