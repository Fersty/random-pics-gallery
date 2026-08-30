import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PhotosPageComponent } from './photos.component';
import { GalleryModule } from '../../gallery.module';
import { GalleryRequestsService } from '../../../services/gallery-requests.service';
import { FavoritesService } from '../../../services/favorites.service';
import { Photo } from '../../../interfaces/photo.interface';

function createComponent(id: string | null, photo: Photo, isFavorited: boolean) {
  const router = { navigate: vi.fn() };
  const galleryRequestsService = { loadPhotoById: vi.fn(() => of(photo)) };
  const favoritesService = {
    isFavorited: vi.fn(() => isFavorited),
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  };

  TestBed.configureTestingModule({
    imports: [GalleryModule],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => id } } } },
      { provide: Router, useValue: router },
      { provide: GalleryRequestsService, useValue: galleryRequestsService },
      { provide: FavoritesService, useValue: favoritesService },
    ],
  });

  const component = TestBed.createComponent(PhotosPageComponent).componentInstance;
  return { component, router, galleryRequestsService, favoritesService };
}

describe('PhotosPageComponent', () => {
  const photo: Photo = { id: 'abc', url: 'url/abc' };

  it('should redirect to / when there is no id in the route', () => {
    const { component, router, galleryRequestsService } = createComponent(null, photo, false);

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(galleryRequestsService.loadPhotoById).not.toHaveBeenCalled();
  });

  it('should load the photo and its favorited state when an id is present', () => {
    const { component, galleryRequestsService, favoritesService } = createComponent('abc', photo, true);

    component.ngOnInit();

    expect(galleryRequestsService.loadPhotoById).toHaveBeenCalledWith('abc');
    expect(component.photo()).toEqual(photo);
    expect(favoritesService.isFavorited).toHaveBeenCalledWith('abc');
    expect(component.isPhotoFavorited()).toBe(true);
  });

  it('addToFavorite should mark the current photo as favorited', () => {
    const { component, favoritesService } = createComponent('abc', photo, false);
    component.ngOnInit();

    component.addToFavorite();

    expect(component.isPhotoFavorited()).toBe(true);
    expect(favoritesService.addToFavorites).toHaveBeenCalledWith('abc');
  });

  it('deleteFromFavorite should unmark the current photo as favorited', () => {
    const { component, favoritesService } = createComponent('abc', photo, true);
    component.ngOnInit();

    component.deleteFromFavorite();

    expect(component.isPhotoFavorited()).toBe(false);
    expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith('abc');
  });
});
