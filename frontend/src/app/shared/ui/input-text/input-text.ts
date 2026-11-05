import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { errorMessage } from '../../validators';

let nextId = 0;

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.html',
})
export class InputText {
  readonly control = input.required<FormControl<string>>();
  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly placeholder = input('');
  readonly hint = input('');
  readonly autocomplete = input('off');

  protected readonly inputId = `input-text-${++nextId}`;

  protected get error(): string | null {
    const control = this.control();
    return control.touched && control.invalid ? errorMessage(control, this.label()) : null;
  }
}
