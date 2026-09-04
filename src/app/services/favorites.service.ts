import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { FAVORITES_STORAGE_KEY } from '../constants/storage-keys';
import { GalleryRequestsService } from './gallery-requests.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private galleryRequestsService: GalleryRequestsService,
    private storageService: StorageService,
  ) {}

  private getFavoriteIds(): string[] {
    return this.storageService.read<string[]>(FAVORITES_STORAGE_KEY) ?? [];
  }

  isFavorited(photoId: string): boolean {
    return this.getFavoriteIds().includes(photoId);
  }

  getFavorites(width?: number, height?: number): Observable<Photo[]> {
    const ids = this.getFavoriteIds();
    if (!ids.length) {
      return of([]);
    }
    return forkJoin(
      ids.map((id) =>
        this.galleryRequestsService.loadPhotoById(id, width, height),
      ),
    );
  }

  addToFavorites(photoId: string): boolean {
    const ids = this.getFavoriteIds();
    if (ids.includes(photoId)) {
      return false;
    }
    ids.push(photoId);
    this.storageService.write(FAVORITES_STORAGE_KEY, ids);
    return true;
  }

  removeFromFavorites(photoId: string): void {
    const updatedIds = this.getFavoriteIds().filter((id) => id !== photoId);
    this.storageService.write(FAVORITES_STORAGE_KEY, updatedIds);
  }
}
