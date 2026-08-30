import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Photo } from '../interfaces/photo.interface';
import { GalleryRequestsService } from './gallery-requests.service';

const STORAGE_KEY = 'favorites';

@Injectable()
export class FavoritesService {
  constructor(private galleryRequestsService: GalleryRequestsService) {}

  private getFavoriteIds(): string[] {
    const ids = window.localStorage.getItem(STORAGE_KEY);
    return ids ? JSON.parse(ids) : [];
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  }

  removeFromFavorites(photoId: string): void {
    const updatedIds = this.getFavoriteIds().filter((id) => id !== photoId);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
  }
}
