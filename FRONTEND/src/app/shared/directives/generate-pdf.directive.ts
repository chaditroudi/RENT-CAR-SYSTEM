import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import jsPDF  from "jspdf";

import html2canvas from 'html2canvas';

@Directive({
  selector: "[appGeneratePdf]",
})
export class GeneratePdfDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {


    this.generatePDF();
  }
  @Input()
  contentToConvert: any;

  generatePDF() {
    var data = document.getElementById(this.contentToConvert);
    

    html2canvas(data,
      {
        width:800,
        height:600
      }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
