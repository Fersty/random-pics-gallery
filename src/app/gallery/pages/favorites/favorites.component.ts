import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../services/favorites.service';
import { PhotoThumbnailComponent } from '../../../shared/components/photo-thumbnail/photo-thumbnail.component';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [AsyncPipe, PhotoThumbnailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly favoritePhotos$ = this.favoritesService.getFavorites(200, 300);

  openPhoto(photoId: string): void {
    this.router.navigate(['/photos', photoId]);
  }
}
