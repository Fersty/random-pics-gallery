import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryHeaderComponent } from './components/gallery-header/gallery-header.component';
import { PhotoThumbnailComponent } from './components/photo-thumbnail/photo-thumbnail.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    GalleryHeaderComponent,
    PhotoThumbnailComponent,
    InfiniteScrollDirective,
  ],
  imports: [CommonModule, RouterModule, MatButtonModule],
  providers: [],
  exports: [
    GalleryHeaderComponent,
    PhotoThumbnailComponent,
    InfiniteScrollDirective,
  ],
})
export class SharedModule {}
