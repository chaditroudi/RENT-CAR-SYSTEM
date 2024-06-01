// custom-font.service.ts
import { Injectable } from '@angular/core';
import jsPDF  from "jspdf";
import * as AmiriFont from '../directives/Amiri-Regular-normal.js';

@Injectable({
  providedIn: 'root'
})
  export class FontService {
  constructor() {
    this.loadFont();
  }

  private loadFont(): void {
    AmiriFont(jsPDF.API);
  }
}
