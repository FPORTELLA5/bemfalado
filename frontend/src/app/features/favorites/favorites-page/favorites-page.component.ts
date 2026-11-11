import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'bf-favorites-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent {
  readonly favorites = inject(FavoritesService);
}
