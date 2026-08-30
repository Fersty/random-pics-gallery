import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GalleryPageComponent } from './pages/gallery/gallery.component';
import { PhotosPageComponent } from './pages/photos/photos.component';
import { FavoritesPageComponent } from './pages/favorites/favorites.component';
import { ServicesModule } from '../services/services.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: GalleryPageComponent,
  },
  {
    path: 'photos/:id',
    component: PhotosPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
];

@NgModule({
  declarations: [
    GalleryPageComponent,
    PhotosPageComponent,
    FavoritesPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServicesModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    SharedModule,
  ],
  providers: [],
})
export class GalleryModule {}
