import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bf-password-recovery-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './password-recovery-page.component.html',
  styleUrl: './password-recovery-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRecoveryPageComponent {
  readonly email = signal<string>('');
  readonly submitted = signal<boolean>(false);
  readonly requestCompleted = signal<boolean>(false);

  readonly emailValid = computed<boolean>(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()));

  onEmailInput(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    this.email.set(target.value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    const target = event.target;
    if (!(target instanceof HTMLFormElement) || !target.reportValidity()) return;
    if (!this.emailValid()) return;

    this.requestCompleted.set(true);
  }
}
