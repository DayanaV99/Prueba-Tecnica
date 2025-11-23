import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[favoriteHighlight]',
  standalone: true
})
export class FavoriteHighlightDirective implements OnChanges {

  @Input() favoriteHighlight = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.transition = '0.3s ease';
    this.el.nativeElement.style.backgroundColor =
      this.favoriteHighlight ? '#fff3cd' : 'transparent';
  }
}
