import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { Photo } from '../../../interfaces/photo.interface';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosPageComponent implements OnInit {
  photo = signal<Photo | null>(null);
  isPhotoFavorited = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryRequestsService: GalleryRequestsService,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.galleryRequestsService.loadPhotoById(id).subscribe((photo) => {
      this.photo.set(photo);
    });
    this.isPhotoFavorited.set(this.favoritesService.isFavorited(id));
  }

  addToFavorite(): void {
    this.isPhotoFavorited.set(true);
    this.favoritesService.addToFavorites(this.photo()!.id);
  }

  deleteFromFavorite(): void {
    this.isPhotoFavorited.set(false);
    this.favoritesService.removeFromFavorites(this.photo()!.id);
  }
}
