import { InfiniteScrollDirective } from './infinite-scroll.directive';

function scrollEvent(
  scrollTop: number,
  scrollHeight: number,
  offsetHeight: number,
): Event {
  return {
    target: { scrollTop, scrollHeight, offsetHeight },
  } as unknown as Event;
}

describe('InfiniteScrollDirective', () => {
  let directive: InfiniteScrollDirective;

  beforeEach(() => {
    directive = new InfiniteScrollDirective();
  });

  it('should emit scrolledDown when scrolling down near the bottom', () => {
    const emitSpy = vi.fn();
    directive.scrolledDown.subscribe(emitSpy);

    directive.scrolling(scrollEvent(190, 200, 10));

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit when not close enough to the bottom', () => {
    const emitSpy = vi.fn();
    directive.scrolledDown.subscribe(emitSpy);

    directive.scrolling(scrollEvent(100, 200, 10));

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not emit when scrolling up', () => {
    directive.prevScrollTop = 190;
    const emitSpy = vi.fn();
    directive.scrolledDown.subscribe(emitSpy);

    directive.scrolling(scrollEvent(180, 200, 10));

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not emit at the very top of the container', () => {
    const emitSpy = vi.fn();
    directive.scrolledDown.subscribe(emitSpy);

    directive.scrolling(scrollEvent(0, 10, 10));

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
