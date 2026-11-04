import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { InputText } from './input-text';

function setup(control: FormControl<string>) {
  const fixture = TestBed.createComponent(InputText);
  fixture.componentRef.setInput('control', control);
  fixture.componentRef.setInput('label', 'Email');
  return fixture;
}

describe('InputText', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [InputText] }));

  it('menampilkan label', async () => {
    const fixture = setup(new FormControl('', { nonNullable: true }));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('label').textContent).toContain('Email');
  });

  it('menampilkan pesan galat setelah field disentuh', async () => {
    const control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    const fixture = setup(control);
    control.markAsTouched();
    await fixture.whenStable();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.field__error')?.textContent).toContain('Email wajib diisi');
    expect(el.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
  });

  it('tidak menampilkan galat sebelum disentuh', async () => {
    const control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    const fixture = setup(control);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.field__error')).toBeNull();
  });
});
