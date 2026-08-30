import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FavoritesPageComponent } from './favorites.component';
import { GalleryModule } from '../../gallery.module';
import { FavoritesService } from '../../../services/favorites.service';
import { Photo } from '../../../interfaces/photo.interface';

function createComponent(favorites: Photo[]) {
  const router = { navigate: vi.fn() };
  const favoritesService = { getFavorites: vi.fn(() => of(favorites)) };

  TestBed.configureTestingModule({
    imports: [GalleryModule],
    providers: [
      { provide: Router, useValue: router },
      { provide: FavoritesService, useValue: favoritesService },
    ],
  });

  const component = TestBed.createComponent(
    FavoritesPageComponent,
  ).componentInstance;
  return { component, router, favoritesService };
}

describe('FavoritesPageComponent', () => {
  it('ngOnInit should load favorites as 200x300 thumbnails', () => {
    const photos: Photo[] = [{ id: 'a', url: 'u1' }];
    const { component, favoritesService } = createComponent(photos);

    component.ngOnInit();

    expect(favoritesService.getFavorites).toHaveBeenCalledWith(200, 300);
    expect(component.favoritePhotos()).toEqual(photos);
  });

  it('openPhoto should navigate to the photo detail route', () => {
    const { component, router } = createComponent([]);

    component.openPhoto('abc');

    expect(router.navigate).toHaveBeenCalledWith(['/photos', 'abc']);
  });
});
