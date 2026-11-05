import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-toast',
  template: `
    <div
      class="toast"
      [class]="'toast toast--' + type()"
      [attr.role]="type() === 'error' ? 'alert' : 'status'"
    >
      <span>{{ message() }}</span>
      <button type="button" class="toast__close" aria-label="Tutup" (click)="closed.emit()">
        ×
      </button>
    </div>
  `,
})
export class AlertToast {
  readonly type = input<'error' | 'success'>('error');
  readonly message = input.required<string>();
  readonly closed = output<void>();
}
