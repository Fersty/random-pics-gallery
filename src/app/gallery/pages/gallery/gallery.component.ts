import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { Photo } from '../../../interfaces/photo.interface';
import { FavoritesService } from '../../../services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPageComponent implements OnInit {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef<HTMLDivElement>;
  photos = signal<Photo[]>([]);
  loading = signal(false);

  constructor(
    private galleryRequestsService: GalleryRequestsService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadRandomPhotos();
  }

  loadRandomPhotos(): void {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);
    setTimeout(() => this.scrollToBottom());
    this.galleryRequestsService.loadPhotos(20).subscribe({
      next: (photos) => {
        this.photos.update((current) => [...current, ...photos]);
        this.loading.set(false);
      },
    });
  }

  private scrollToBottom(): void {
    const el = this.galleryContainer?.nativeElement;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }

  addToFavorites = (photoId: string) => {
    const wasAdded = this.favoritesService.addToFavorites(photoId);
    this.snackBar.open(
      wasAdded
        ? 'Photo added to favorites'
        : 'Photo already exists in favorites',
      '',
      { duration: 1000 },
    );
  };
}
