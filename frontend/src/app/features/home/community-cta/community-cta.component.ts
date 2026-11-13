import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bf-community-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './community-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityCtaComponent {}
