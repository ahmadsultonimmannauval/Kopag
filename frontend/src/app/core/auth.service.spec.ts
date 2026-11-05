import { HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './auth.interceptor';
import { AuthService, httpErrorMessage } from './auth.service';
import { TokenStorage } from './token-storage';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let tokens: TokenStorage;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    tokens = TestBed.inject(TokenStorage);
  });

  afterEach(() => http.verify());

  it('login mengirim POST dan menyimpan token JWT', () => {
    service.login({ email: 'a@b.id', password: 'rahasia123' }).subscribe();
    const req = http.expectOne('http://localhost:5000/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'jwt-token' });
    expect(tokens.get()).toBe('jwt-token');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('interceptor menyematkan header Authorization saat token ada', () => {
    tokens.set('jwt-token');
    service.register({ name: 'Sarah', email: 'a@b.id', password: 'rahasia123' }).subscribe();
    const req = http.expectOne('http://localhost:5000/api/v1/auth/register');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush({});
  });

  it('logout menghapus token', () => {
    tokens.set('jwt-token');
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});

describe('httpErrorMessage', () => {
  it('401 -> kredensial salah', () => {
    expect(httpErrorMessage(new HttpErrorResponse({ status: 401 }))).toBe(
      'Email atau kata sandi salah',
    );
  });

  it('409 -> email sudah terdaftar', () => {
    expect(httpErrorMessage(new HttpErrorResponse({ status: 409 }))).toContain('sudah terdaftar');
  });

  it('status 0 -> server tidak dapat dihubungi', () => {
    expect(httpErrorMessage(new HttpErrorResponse({ status: 0 }))).toContain(
      'tidak dapat dihubungi',
    );
  });
});
