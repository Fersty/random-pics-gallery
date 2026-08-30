import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRequestsService } from './gallery-requests.service';
import { FavoritesService } from './favorites.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GalleryRequestsService, FavoritesService],
  exports: [],
})
export class ServicesModule {}
