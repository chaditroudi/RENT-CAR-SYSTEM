import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDecimalFormat]'
})
export class DecimalFormatDirective {


  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.decimalPipe.transform(this.el.value, '1.2-2');
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    this.el.value = value.replace(/[^0-9]/g, '');
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.el.value = this.decimalPipe.transform(value, '1.2-2');
  }

}
