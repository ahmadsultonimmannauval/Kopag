import { TestBed } from '@angular/core/testing';
import { TokenStorage } from './token-storage';

describe('TokenStorage', () => {
  let storage: TokenStorage;

  beforeEach(() => {
    localStorage.clear();
    storage = TestBed.inject(TokenStorage);
  });

  it('menyimpan dan membaca token', () => {
    storage.set('abc.def.ghi');
    expect(storage.get()).toBe('abc.def.ghi');
  });

  it('menghapus token', () => {
    storage.set('abc');
    storage.clear();
    expect(storage.get()).toBeNull();
  });
});
