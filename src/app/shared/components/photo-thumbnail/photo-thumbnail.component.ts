import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Photo } from '../../../interfaces/photo.interface';

@Component({
  selector: 'app-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoThumbnailComponent {
  @Input({ required: true }) photo!: Photo;
  @Output() photoClick = new EventEmitter<string>();
}
