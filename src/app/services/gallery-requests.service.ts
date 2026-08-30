import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Photo } from '../interfaces/photo.interface';

@Injectable()
export class GalleryRequestsService {
  loadPhotos(count: number): Observable<Photo[]> {
    const photos: Photo[] = Array.from({ length: count }, () => {
      const id = crypto.randomUUID();
      return {
        id,
        url: `https://picsum.photos/seed/${id}/200/300`,
      };
    });
    const delayTime = 200 + Math.random() * 100;
    return of(photos).pipe(delay(delayTime));
  }

  loadPhotoById(id: string, width = 1200, height = 800): Observable<Photo> {
    const photo: Photo = {
      id,
      url: `https://picsum.photos/seed/${id}/${width}/${height}`,
    };
    return of(photo);
  }
}
