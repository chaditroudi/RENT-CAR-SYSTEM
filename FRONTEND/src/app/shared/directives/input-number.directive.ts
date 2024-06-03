import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective implements OnInit {
  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.formatNumber(this.el.value);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.value = this.formatNumber(value);
    this.control.control.patchValue(this.unformatNumber(this.el.value));
  }

  private formatNumber(value: string): string {
    let result = value.replace(/[^0-9.,]/g, '');
    result = result.replace(/,/g, '.');
    result = result.replace(/\.(?=.*\.)/g, '');
    return result;
  }

  private unformatNumber(value: string): string {
    return value.replace(/[^0-9.]/g, '');
  }
}