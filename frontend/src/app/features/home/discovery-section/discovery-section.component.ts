import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bf-discovery-section',
  standalone: true,
  templateUrl: './discovery-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoverySectionComponent {}
