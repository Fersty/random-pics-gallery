import { of } from 'rxjs';
import { FavoritesService } from './favorites.service';
import { GalleryRequestsService } from './gallery-requests.service';
import { Photo } from '../interfaces/photo.interface';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let galleryRequestsService: GalleryRequestsService;

  beforeEach(() => {
    window.localStorage.clear();
    galleryRequestsService = {
      loadPhotoById: (id: string, width?: number, height?: number) =>
        of({ id, url: `url/${id}/${width}/${height}` } satisfies Photo),
    } as GalleryRequestsService;
    service = new FavoritesService(galleryRequestsService);
  });

  it('addToFavorites should add a new id and report it as favorited', () => {
    const wasAdded = service.addToFavorites('a');

    expect(wasAdded).toBe(true);
    expect(service.isFavorited('a')).toBe(true);
  });

  it('addToFavorites should not duplicate an id that is already favorited', () => {
    service.addToFavorites('a');
    const wasAdded = service.addToFavorites('a');

    expect(wasAdded).toBe(false);
    expect(JSON.parse(window.localStorage.getItem('favorites')!)).toEqual([
      'a',
    ]);
  });

  it('removeFromFavorites should only remove the given id', () => {
    service.addToFavorites('a');
    service.addToFavorites('b');

    service.removeFromFavorites('a');

    expect(service.isFavorited('a')).toBe(false);
    expect(service.isFavorited('b')).toBe(true);
  });

  it('getFavorites should resolve a photo for every stored id using the given size', async () => {
    service.addToFavorites('a');
    service.addToFavorites('b');

    const photos = await new Promise<Photo[]>((resolve) =>
      service.getFavorites(50, 60).subscribe(resolve),
    );

    expect(photos.map((p) => p.url)).toEqual(['url/a/50/60', 'url/b/50/60']);
  });

  it('getFavorites should resolve to an empty list when there are no favorites', async () => {
    const photos = await new Promise<Photo[]>((resolve) =>
      service.getFavorites().subscribe(resolve),
    );

    expect(photos).toEqual([]);
  });
});
