import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LoginForm {
  readonly email: string;
  readonly password: string;
}

type LoginField = keyof LoginForm;
type SocialProvider = 'Google' | 'Facebook' | 'Apple';

@Component({
  selector: 'bf-login-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  readonly form = signal<LoginForm>({ email: '', password: '' });
  readonly submitted = signal<boolean>(false);
  readonly passwordVisible = signal<boolean>(false);
  readonly loginCompleted = signal<boolean>(false);
  readonly socialProviderNotice = signal<string>('');

  readonly emailValid = computed<boolean>(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form().email.trim()));
  readonly canSubmit = computed<boolean>(() => this.emailValid() && this.form().password.length > 0);

  onFieldInput(event: Event, field: LoginField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    this.form.update((current: LoginForm) => {
      switch (field) {
        case 'email': return { ...current, email: target.value };
        case 'password': return { ...current, password: target.value };
      }
    });
  }

  onSocialProviderSelected(provider: SocialProvider): void {
    this.socialProviderNotice.set(`A entrada com ${provider} será ativada quando a integração segura estiver configurada.`);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible: boolean) => !visible);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    const target = event.target;
    if (!(target instanceof HTMLFormElement) || !target.reportValidity()) return;
    if (!this.canSubmit()) return;

    this.loginCompleted.set(true);
  }
}
