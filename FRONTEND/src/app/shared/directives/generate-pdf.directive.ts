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
    

      html2canvas(data).then(canvas => {
        const a4AspectRatio = 350 / 250;
        const canvasAspectRatio = canvas.width / canvas.height;
        let fileWidth, fileHeight;
    
        if (canvasAspectRatio > a4AspectRatio) {
          fileWidth = 210;
          fileHeight = (canvas.height * fileWidth) / canvas.width;
        } else {
          fileHeight = 297;
          fileWidth = (canvas.width * fileHeight) / canvas.height;
        }
    
        const fileURI = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const xPosition = (210 - fileWidth) / 2;
        const yPosition = (297 - fileHeight) / 2;
    
        pdf.addImage(fileURI, 'PNG', xPosition, yPosition, fileWidth, fileHeight);
        pdf.save('report_contract.pdf');
      });
  }
}
