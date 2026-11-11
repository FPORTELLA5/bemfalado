import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bf-how-it-works',
  standalone: true,
  templateUrl: './how-it-works.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksComponent {}
