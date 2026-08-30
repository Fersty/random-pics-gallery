import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
  standalone: false,
})
export class InfiniteScrollDirective {
  public prevScrollTop = 0;

  @Output() scrolledDown: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('scroll', ['$event']) scrolling(e: Event) {
    const target = e.target as HTMLElement;
    const { offsetHeight, scrollTop, scrollHeight } = target;
    if (
      scrollTop - this.prevScrollTop > 10 &&
      scrollTop > 0 &&
      Math.trunc(scrollHeight - scrollTop) <= offsetHeight + 1
    ) {
      this.prevScrollTop = scrollTop;
      this.scrolledDown.emit();
    }
  }
}
