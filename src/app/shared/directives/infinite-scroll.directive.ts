import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Output() scrolledDown = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  constructor() {
    const element = this.elementRef.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          this.scrolledDown.emit();
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.1,
      },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
