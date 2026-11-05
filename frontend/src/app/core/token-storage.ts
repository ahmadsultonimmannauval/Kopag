import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

/** Penyimpanan token sesi JWT di Local Storage (aman terhadap storage yang tidak tersedia). */
@Injectable({ providedIn: 'root' })
export class TokenStorage {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }
}
