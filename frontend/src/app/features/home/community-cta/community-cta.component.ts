import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bf-community-cta',
  standalone: true,
  templateUrl: './community-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCtaComponent {}
