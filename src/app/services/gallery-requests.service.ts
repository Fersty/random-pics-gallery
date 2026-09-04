import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Photo } from '../interfaces/photo.interface';

const DEFAULT_PHOTO_WIDTH = 200;
const DEFAULT_PHOTO_HEIGHT = 300;
const DEFAULT_DETAIL_WIDTH = 1200;
const DEFAULT_DETAIL_HEIGHT = 800;

@Injectable({
  providedIn: 'root',
})
export class GalleryRequestsService {
  private buildPhotoUrl(id: string, width: number, height: number): string {
    return `${environment.picsumBaseUrl}/seed/${id}/${width}/${height}`;
  }

  loadPhotos(count: number): Observable<Photo[]> {
    const photos: Photo[] = Array.from({ length: count }, () => {
      const id = crypto.randomUUID();
      return {
        id,
        url: this.buildPhotoUrl(id, DEFAULT_PHOTO_WIDTH, DEFAULT_PHOTO_HEIGHT),
      };
    });

    const delayTime = 200 + Math.random() * 100;
    return of(photos).pipe(
      delay(delayTime),
      catchError(() => of([])),
    );
  }

  loadPhotoById(
    id: string,
    width = DEFAULT_DETAIL_WIDTH,
    height = DEFAULT_DETAIL_HEIGHT,
  ): Observable<Photo> {
    const photo: Photo = {
      id,
      url: this.buildPhotoUrl(id, width, height),
    };

    return of(photo).pipe(catchError(() => of({ id, url: '' })));
  }
}
