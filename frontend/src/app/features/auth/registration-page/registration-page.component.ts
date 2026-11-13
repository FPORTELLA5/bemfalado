import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import { CATEGORIES } from '../../../shared/data/categories';
import { FocusOnRenderDirective } from '../../../shared/directives/focus-on-render.directive';

interface RegistrationForm {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
}

interface NewBusinessForm {
  readonly name: string;
  readonly category: string;
  readonly street: string;
  readonly number: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly phone: string;
}

type NewBusinessField = keyof NewBusinessForm;
type BusinessRegistrationMode = 'existing' | 'new';
type RegistrationField = keyof RegistrationForm;
type AccountType = 'personal' | 'business';
type SocialProvider = 'Google' | 'Facebook' | 'Apple';

@Component({
  selector: 'bf-registration-page',
  standalone: true,
  imports: [RouterLink, FocusOnRenderDirective],
  templateUrl: './registration-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent {
  readonly form = signal<RegistrationForm>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  readonly accountType = signal<AccountType>(
    inject(ActivatedRoute).snapshot.queryParamMap.get('tipo') === 'empresa' ? 'business' : 'personal'
  );
  readonly businesses = MOCK_BUSINESS_RESULTS;
  readonly businessId = signal('');
  readonly businessRegistrationMode = signal<BusinessRegistrationMode>('existing');
  readonly categories = CATEGORIES;
  readonly newBusiness = signal<NewBusinessForm>({
    name: '', category: '', street: '', number: '',
    neighborhood: '', city: '', state: '', postalCode: '', phone: ''
  });
  readonly selectedBusiness = computed(() =>
    this.businesses.find((business) => business.id === this.businessId())
  );
  readonly newBusinessValid = computed<boolean>(() => {
    const business = this.newBusiness();
    return business.name.trim().length >= 2
      && business.category.trim().length > 0
      && business.street.trim().length >= 2
      && business.number.trim().length > 0
      && business.neighborhood.trim().length >= 2
      && business.city.trim().length >= 2
      && /^[A-Za-z]{2}$/.test(business.state.trim())
      && /^\d{5}-?\d{3}$/.test(business.postalCode.trim());
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
      && this.acceptedTerms()
      && (this.accountType() === 'personal'
        || (this.businessRegistrationMode() === 'existing'
          ? this.selectedBusiness() !== undefined
          : this.newBusinessValid()));
  });

  onAccountTypeSelected(accountType: AccountType): void {
    this.accountType.set(accountType);
    if (accountType === 'personal') this.businessId.set('');
  }

  onBusinessChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) this.businessId.set(target.value);
  }

  onBusinessRegistrationModeSelected(mode: BusinessRegistrationMode): void {
    this.businessRegistrationMode.set(mode);
    this.submitted.set(false);
    if (mode === 'new') this.businessId.set('');
  }

  onNewBusinessFieldInput(event: Event, field: NewBusinessField): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) return;
    this.newBusiness.update((current: NewBusinessForm) => ({
      ...current,
      [field]: target.value
    }));
  }

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
