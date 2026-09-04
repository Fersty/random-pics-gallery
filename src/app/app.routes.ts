import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./gallery/pages/gallery/gallery.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./gallery/pages/photos/photos.component').then(
        (m) => m.PhotosPageComponent,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./gallery/pages/favorites/favorites.component').then(
        (m) => m.FavoritesPageComponent,
      ),
  },
];
