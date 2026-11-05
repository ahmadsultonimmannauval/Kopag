import { InjectionToken } from '@angular/core';

/** URL dasar backend REST API (Mhs 2). Ubah sesuai port server tim. */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:5000',
});
