import { firstValueFrom } from 'rxjs';
import { GalleryRequestsService } from './gallery-requests.service';

describe('GalleryRequestsService', () => {
  let service: GalleryRequestsService;

  beforeEach(() => {
    service = new GalleryRequestsService();
  });

  it('loadPhotos should return exactly the requested number of photos', async () => {
    const photos = await firstValueFrom(service.loadPhotos(5));
    expect(photos.length).toBe(5);
  });

  it('loadPhotos should build each photo url from its own id', async () => {
    const photos = await firstValueFrom(service.loadPhotos(3));
    for (const photo of photos) {
      expect(photo.url).toContain(`/seed/${photo.id}/`);
    }
  });

  it('loadPhotoById should embed the given id in the url', async () => {
    const photo = await firstValueFrom(service.loadPhotoById('abc'));
    expect(photo.url).toContain('/seed/abc/');
  });

  it('loadPhotoById should use the given width/height in the url', async () => {
    const photo = await firstValueFrom(service.loadPhotoById('abc', 111, 222));
    expect(photo.url).toContain('/111/222');
  });
});
