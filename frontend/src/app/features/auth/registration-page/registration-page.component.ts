import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RegistrationForm {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}

type RegistrationField = keyof RegistrationForm;
type SocialProvider = 'Google' | 'Facebook' | 'Apple';

@Component({
  selector: 'bf-registration-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  readonly form = signal<RegistrationForm>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  readonly acceptedTerms = signal<boolean>(false);
  readonly submitted = signal<boolean>(false);
  readonly passwordVisible = signal<boolean>(false);
  readonly confirmationVisible = signal<boolean>(false);
  readonly registrationCompleted = signal<boolean>(false);
  readonly socialProviderNotice = signal<string>('');

  readonly passwordsMatch = computed<boolean>(() => {
    const values = this.form();
    return values.password.length > 0
      && values.passwordConfirmation.length > 0
      && values.password === values.passwordConfirmation;
  });

  readonly passwordLengthValid = computed<boolean>(() => this.form().password.length >= 10);
  readonly emailValid = computed<boolean>(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form().email.trim()));

  readonly canSubmit = computed<boolean>(() => {
    const values = this.form();
    return values.name.trim().length >= 2
      && this.emailValid()
      && this.passwordLengthValid()
      && this.passwordsMatch()
      && this.acceptedTerms();
  });

  onSocialProviderSelected(provider: SocialProvider): void {
    this.socialProviderNotice.set(`A entrada com ${provider} será ativada quando a integração segura estiver configurada.`);
  }

  onFieldInput(event: Event, field: RegistrationField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    this.form.update((current: RegistrationForm) => {
      switch (field) {
        case 'name': return { ...current, name: target.value };
        case 'email': return { ...current, email: target.value };
        case 'password': return { ...current, password: target.value };
        case 'passwordConfirmation': return { ...current, passwordConfirmation: target.value };
      }
    });
  }

  onTermsChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    this.acceptedTerms.set(target.checked);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible: boolean) => !visible);
  }

  toggleConfirmationVisibility(): void {
    this.confirmationVisible.update((visible: boolean) => !visible);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    const target = event.target;
    if (!(target instanceof HTMLFormElement) || !target.reportValidity()) return;
    if (!this.canSubmit()) return;

    this.registrationCompleted.set(true);
  }
}
