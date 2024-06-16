import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as Hammer from 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements AfterViewInit {
  @ViewChild('backgroundCanvas', { static: true }) backgroundCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('drawingCanvas', { static: true }) drawingCanvas: ElementRef<HTMLCanvasElement>;

  @Input()
  idContract:string;
  
  private bgCtx: CanvasRenderingContext2D;
  private drawCtx: CanvasRenderingContext2D;
  private color: string = '#000000';

  private zoomLevel: number = 1;
  brushSize: number = 5;
  opacity: number = 1;
  isErasing: boolean = false;

  constructor(private http: HttpClient,private readonly contractService:ContractService) {}

  ngAfterViewInit(): void {
    this.bgCtx = this.backgroundCanvas.nativeElement.getContext('2d');
    this.drawCtx = this.drawingCanvas.nativeElement.getContext('2d');
    this.loadImages();
    this.setupTouchEvents();
  }

  loadImages(): void {
    const carOutImg = new Image();
    const carBackImg = new Image();

    carOutImg.onload = () => {
      this.bgCtx.drawImage(carOutImg, 0, 50, this.backgroundCanvas.nativeElement.width / 2, this.backgroundCanvas.nativeElement.height - 50);
      this.bgCtx.font = '20px Arial';
      this.bgCtx.textAlign = 'center';
    };

    carBackImg.onload = () => {
      this.bgCtx.drawImage(carBackImg, this.backgroundCanvas.nativeElement.width / 2, 50, this.backgroundCanvas.nativeElement.width / 2, this.backgroundCanvas.nativeElement.height - 50);
      this.bgCtx.font = '20px Arial';
      this.bgCtx.textAlign = 'center';
      // this.bgCtx.fillText((3 * this.backgroundCanvas.nativeElement.width) / 4, 30);
    };

    carOutImg.src = '/assets/images/car/car_out.png';
    carBackImg.src = '/assets/images/car/car_back.png';
  }

  setupTouchEvents(): void {
    const mc = new Hammer.Manager(this.drawingCanvas.nativeElement);
    const pan = new Hammer.Pan();
    mc.add([pan]);

    let lastX = 0;
    let lastY = 0;
    let isDrawing = false;

    mc.on('panstart', (event: HammerInput) => {
      const rect = this.drawingCanvas.nativeElement.getBoundingClientRect();
      lastX = event.center.x - rect.left;
      lastY = event.center.y - rect.top;
      isDrawing = true;
    });

    mc.on('panmove', (event: HammerInput) => {
      if (!isDrawing) return;

      const rect = this.drawingCanvas.nativeElement.getBoundingClientRect();
      const currentX = event.center.x - rect.left;
      const currentY = event.center.y - rect.top;

      this.drawCtx.beginPath();
      this.drawCtx.moveTo(lastX, lastY);
      this.drawCtx.lineTo(currentX, currentY);
      this.drawCtx.strokeStyle = this.isErasing ? '#FFFFFF' : this.color;
      this.drawCtx.lineWidth = this.brushSize;
      this.drawCtx.globalAlpha = this.opacity;
      this.drawCtx.globalCompositeOperation = this.isErasing ? 'destination-out' : 'source-over';
      this.drawCtx.lineCap = this.brushShape;
      this.drawCtx.stroke();

      lastX = currentX;
      lastY = currentY;
    });

    mc.on('panend', () => {
      isDrawing = false;
    });
  }

  brushShape: CanvasLineCap = 'round';

  setColor(color: string): void {
    this.color = color;
  }

  setBrushSize(size: number): void {
    this.brushSize = size;
  }

  setBrushShape(shape: CanvasLineCap): void {
    this.brushShape = shape;
  }

  resetDrawing(): void {
    const canvas = this.drawingCanvas.nativeElement;
    this.drawCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setOpacity(opacity: number): void {
    this.opacity = opacity;
  }

  toggleEraser(): void {
    this.isErasing = !this.isErasing;
  }

  zoomIn(): void {
    this.zoomLevel += 0.1;
    this.scaleCanvas();
  }

  zoomOut(): void {
    this.zoomLevel -= 0.1;
    this.scaleCanvas();
  }

  scaleCanvas(): void {
    const canvas = this.drawingCanvas.nativeElement;
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    canvas.width *= this.zoomLevel;
    canvas.height *= this.zoomLevel;

    const scaledWidth = canvas.width;
    const scaledHeight = canvas.height;

    this.bgCtx.clearRect(0, 0, scaledWidth, scaledHeight);

    const carOutImg = new Image();
    const carBackImg = new Image();

    carOutImg.onload = () => {
      this.bgCtx.drawImage(carOutImg, 0, 50, scaledWidth / 2, scaledHeight - 50);
      this.bgCtx.font = '20px Arial';
      this.bgCtx.textAlign = 'center';
      this.bgCtx.fillText('Car out', scaledWidth / 4, 30);
    };

    carBackImg.onload = () => {
      this.bgCtx.drawImage(carBackImg, scaledWidth / 2, 50, scaledWidth / 2, scaledHeight - 50);
      this.bgCtx.font = '20px Arial';
      this.bgCtx.textAlign = 'center';
      this.bgCtx.fillText('Car back', (3 * scaledWidth) / 4, 30);
    };

    carOutImg.src = '/assets/images/car/car_out.png';
    carBackImg.src = '/assets/images/car/car_back.png';
  }
  saveImage(): void {
    const mergedCanvas = document.createElement('canvas');
    mergedCanvas.width = this.backgroundCanvas.nativeElement.width;
    mergedCanvas.height = this.backgroundCanvas.nativeElement.height;
    const mergedCtx = mergedCanvas.getContext('2d');
  
    // Draw background
    mergedCtx.drawImage(this.backgroundCanvas.nativeElement, 0, 0);
    // Draw drawings on top
    mergedCtx.drawImage(this.drawingCanvas.nativeElement, 0, 0);
  
    
    

    mergedCanvas.toBlob((b)=>{
        const formData = new FormData();
        formData.append('files', b,'canva.png'


        );   
      
        this.contractService.updateImage(this.idContract,formData).subscribe(
          (response) => {
            console.log('Image saved to MongoDB:', response);
          },
          (error) => {
            console.error('Error saving image to MongoDB:', error);
          }
        );
      
      })

    // Send FormData to server
   
  }

  dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
