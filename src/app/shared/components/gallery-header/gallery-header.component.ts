import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gallery-header',
  templateUrl: './gallery-header.component.html',
  styleUrls: ['./gallery-header.component.scss'],
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHeaderComponent {}
