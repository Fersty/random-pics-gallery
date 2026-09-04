import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { Photo } from '../../../interfaces/photo.interface';
import { FavoritesService } from '../../../services/favorites.service';
import { PhotoThumbnailComponent } from '../../../shared/components/photo-thumbnail/photo-thumbnail.component';
import { InfiniteScrollDirective } from '../../../shared/directives/infinite-scroll.directive';

const PAGE_SIZE = 20;
const SNACKBAR_DURATION_MS = 1000;

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [
    PhotoThumbnailComponent,
    MatProgressSpinnerModule,
    InfiniteScrollDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPageComponent implements OnInit {
  private readonly galleryRequestsService = inject(GalleryRequestsService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);

  photos = signal<Photo[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loadRandomPhotos();
  }

  loadRandomPhotos(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.galleryRequestsService
      .loadPhotos(PAGE_SIZE)
      .subscribe({
        next: (photos) => {
          this.photos.update((current) => [...current, ...photos]);
        },
        complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
      });
  }

  addToFavorites = (photoId: string) => {
    const wasAdded = this.favoritesService.addToFavorites(photoId);
    this.snackBar.open(
      wasAdded
        ? 'Photo added to favorites'
        : 'Photo already exists in favorites',
      '',
      { duration: SNACKBAR_DURATION_MS },
    );
  };
}
