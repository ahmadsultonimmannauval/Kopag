import { Component, input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  template: `
    <button
      class="btn-primary"
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading()"
    >
      @if (loading()) {
        <span class="spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
})
export class PrimaryButton {
  readonly type = input<'button' | 'submit'>('button');
  readonly loading = input(false);
  readonly disabled = input(false);
}
