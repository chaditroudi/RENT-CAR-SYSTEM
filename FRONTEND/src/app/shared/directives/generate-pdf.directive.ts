import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { Car } from 'src/app/core/models/car.model';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Directive({
  selector: '[appGeneratePdf]',
})
export class GeneratePdfDirective {
  @Input() contentToConvert: string;
  @Input() contentToConvertContract: string;

  
  @Input() printRented: string;
  @Input() printA: string;
  @Input()printVCarInss:string;
  @Input()printVCarRegist:string;
  @Input() dataR: Car[] = [];
  @Input() dataA: Car[] = [];
  @Input() dataValidIns: Car[] = [];
  @Input() dataValidReg: Car[] = [];

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    this.generatePDF();
  }

  generatePDF() {
    const printRentedElement = document.getElementById(this.printRented);
    const printAElement = document.getElementById(this.printA);
    const contentToConvertElement = document.getElementById(this.contentToConvert);
    const contentToConvertCElement = document.getElementById(this.contentToConvertContract);
    const printVCarInss = document.getElementById(this.printVCarInss);
    const printVCarRegist = document.getElementById(this.printVCarRegist);

    if (printRentedElement) {
      this.generateTablePDF(this.dataR, 'rented_car_reports.pdf');
    } else if (printAElement) {
      this.generateTablePDF(this.dataA, 'available_car_reports.pdf');
    } else if (contentToConvertElement) {
      this.generateContentPDF(contentToConvertElement);
    }
    else if (contentToConvertCElement) {
      this.generateContentPDF(contentToConvertCElement);
    }
    else if(printVCarInss){
      this.exportValidCar(this.dataValidIns)
    }
    else if(printVCarRegist){
      this.exportValidCar(this.dataValidReg)
    }
  }

  private generateTablePDF(data: Car[], fileName: string) {
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    doc.autoTable({
      head: [['Code', 'Car', 'Year', 'Plate', 'Daily']],
      body: data.map((car) => [car.code, car.car, car.year, car.plate, car.daily]),
    });
    doc.save(fileName);
  }

  private generateContentPDF(contentToConvert: HTMLElement) {
    html2canvas(contentToConvert).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  }


  exportValidCar(dataValidIns) {
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    doc.autoTable({
      head: [['Code', 'Car', 'Year', 'Plate']],
      body: dataValidIns.map((car) => [car.code, car.car, car.year, car.plate]),
    });

    doc.save('car_insurance.pdf');
  }
}
