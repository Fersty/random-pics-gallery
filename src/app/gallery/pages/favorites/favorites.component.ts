import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../../../interfaces/photo.interface';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  favoritePhotos = signal<Photo[]>([]);

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.favoritesService.getFavorites(200, 300).subscribe((photos) => {
      this.favoritePhotos.set(photos);
    });
  }

  openPhoto(photoId: string): void {
    this.router.navigate(['/photos', photoId]);
  }
}
