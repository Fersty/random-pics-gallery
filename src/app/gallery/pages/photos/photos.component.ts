import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { Photo } from '../../../interfaces/photo.interface';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly galleryRequestsService = inject(GalleryRequestsService);
  private readonly favoritesService = inject(FavoritesService);

  photo = signal<Photo | null>(null);
  isPhotoFavorited = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.galleryRequestsService.loadPhotoById(id).subscribe((photo) => {
      this.photo.set(photo);
      this.isPhotoFavorited.set(this.favoritesService.isFavorited(photo.id));
    });
  }

  addToFavorite(): void {
    const currentPhoto = this.photo();
    if (!currentPhoto) {
      return;
    }

    this.favoritesService.addToFavorites(currentPhoto.id);
    this.isPhotoFavorited.set(true);
  }

  deleteFromFavorite(): void {
    const currentPhoto = this.photo();
    if (!currentPhoto) {
      return;
    }

    this.favoritesService.removeFromFavorites(currentPhoto.id);
    this.isPhotoFavorited.set(false);
  }
}
