import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { GalleryPageComponent } from './gallery.component';
import { GalleryModule } from '../../gallery.module';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { FavoritesService } from '../../../services/favorites.service';
import { Photo } from '../../../interfaces/photo.interface';

function createComponent(photosToLoad: Photo[], addToFavoritesReturns = true) {
  const galleryRequestsService = { loadPhotos: vi.fn(() => of(photosToLoad)) };
  const favoritesService = {
    addToFavorites: vi.fn(() => addToFavoritesReturns),
  };
  const snackBar = { open: vi.fn() };

  TestBed.configureTestingModule({
    imports: [GalleryModule],
    providers: [
      { provide: GalleryRequestsService, useValue: galleryRequestsService },
      { provide: FavoritesService, useValue: favoritesService },
      { provide: MatSnackBar, useValue: snackBar },
    ],
  });

  const component =
    TestBed.createComponent(GalleryPageComponent).componentInstance;
  return { component, galleryRequestsService, favoritesService, snackBar };
}

describe('GalleryPageComponent', () => {
  it('loadRandomPhotos should ignore concurrent calls while already loading', () => {
    const { component, galleryRequestsService } = createComponent([]);
    component.loading.set(true);

    component.loadRandomPhotos();

    expect(galleryRequestsService.loadPhotos).not.toHaveBeenCalled();
  });

  it('loadRandomPhotos should append the newly loaded photos to the existing list', () => {
    const existing: Photo = { id: '1', url: 'u1' };
    const loaded: Photo = { id: '2', url: 'u2' };
    const { component } = createComponent([loaded]);
    component.photos.set([existing]);

    component.loadRandomPhotos();

    expect(component.photos()).toEqual([existing, loaded]);
    expect(component.loading()).toBe(false);
  });

  it('addToFavorites should notify that the photo was added', () => {
    const { component, snackBar } = createComponent([], true);

    component.addToFavorites('abc');

    expect(snackBar.open).toHaveBeenCalledWith('Photo added to favorites', '', {
      duration: 1000,
    });
  });

  it('addToFavorites should notify when the photo was already favorited', () => {
    const { component, snackBar } = createComponent([], false);

    component.addToFavorites('abc');

    expect(snackBar.open).toHaveBeenCalledWith(
      'Photo already exists in favorites',
      '',
      { duration: 1000 },
    );
  });
});
