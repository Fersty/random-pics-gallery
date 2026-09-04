import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    window.localStorage.clear();
    service = new StorageService();
  });

  it('should write and read values as JSON', () => {
    service.write('demo', { a: 1, b: 'x' });

    expect(service.read<{ a: number; b: string }>('demo')).toEqual({ a: 1, b: 'x' });
  });

  it('should remove a key', () => {
    service.write('demo', ['one']);

    service.remove('demo');

    expect(service.read<string[]>('demo')).toBeNull();
  });
});
