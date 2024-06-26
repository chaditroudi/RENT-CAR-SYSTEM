import * as Hammer from 'hammerjs';
import { HttpClient } from '@angular/common/http';
import { ContractService } from 'src/app/core/services/contract.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements AfterViewInit, OnInit {
  @ViewChild('backgroundCanvas', { static: true }) backgroundCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('drawingCanvas', { static: true }) drawingCanvas: ElementRef<HTMLCanvasElement>;

  @Input() idContract: string;
  
  private bgCtx: CanvasRenderingContext2D;
  private drawCtx: CanvasRenderingContext2D;
  private color: string = '#000000';
  private zoomLevel: number = 1;
  brushSize: number = 5;
  opacity: number = 1;
  isErasing: boolean = false;
  brushShape: CanvasLineCap = 'round';

  

  constructor(
    
    public activeModal:NgbActiveModal,
    private http: HttpClient, private storageServ: StorageService, private readonly contractService: ContractService) {}

  ngOnInit(): void {
    this.loadContractImages();
  }

  ngAfterViewInit(): void {
    // Get the contexts after the view has initialized
    this.bgCtx = this.backgroundCanvas.nativeElement.getContext('2d');
    this.drawCtx = this.drawingCanvas.nativeElement.getContext('2d');
  
    // Load images and setup touch events
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
    };

    carOutImg.src = '/assets/images/car/car_out.png';
    carBackImg.src = '/assets/images/car/car_back.png';
  }

  setupTouchEvents(): void {
    const mc = new Hammer.Manager(this.drawingCanvas.nativeElement);
    const pan = new Hammer.Pan();
    mc.add(pan);
  
    let isDrawing = false;
    let lastX: number;
    let lastY: number;
  
    mc.on('panstart', (event: HammerInput) => {
      isDrawing = true;
      const rect = this.drawingCanvas.nativeElement.getBoundingClientRect();
      lastX = (event.center.x - rect.left) * (this.drawingCanvas.nativeElement.width / rect.width);
      lastY = (event.center.y - rect.top) * (this.drawingCanvas.nativeElement.height / rect.height);
  
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(lastX, lastY);
    });
  
    mc.on('panmove', (event: HammerInput) => {
      if (!isDrawing) return;
  
      const rect = this.drawingCanvas.nativeElement.getBoundingClientRect();
      const currentX = (event.center.x - rect.left) * (this.drawingCanvas.nativeElement.width / rect.width);
      const currentY = (event.center.y - rect.top) * (this.drawingCanvas.nativeElement.height / rect.height);
  
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
    const drawingCanvas = this.drawingCanvas.nativeElement;
    const backgroundCanvas = this.backgroundCanvas.nativeElement;
  
    const originalDrawingWidth = drawingCanvas.width;
    const originalDrawingHeight = drawingCanvas.height;
  
    // Scale drawing canvas
    drawingCanvas.width *= this.zoomLevel;
    drawingCanvas.height *= this.zoomLevel;
  
    // Scale background canvas
    backgroundCanvas.width *= this.zoomLevel;
    backgroundCanvas.height *= this.zoomLevel;
  
    // Clear and redraw background
    this.bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    this.loadImages(); // Redraw the images onto the scaled background canvas
  
    // Redraw existing drawing onto scaled canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = originalDrawingWidth;
    tempCanvas.height = originalDrawingHeight;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(drawingCanvas, 0, 0);
  
    // Clear and redraw scaled drawing canvas
    const scaledCtx = drawingCanvas.getContext('2d');
    scaledCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    scaledCtx.drawImage(tempCanvas, 0, 0, originalDrawingWidth, originalDrawingHeight, 0, 0, drawingCanvas.width, drawingCanvas.height);
  }
  
  images: string[] = [];

  loadContractImages(): void {
    this.contractService.getImages(this.idContract).subscribe(
      (response) => {
        this.images = response.files;
        this.loadImages();
      },
      (error) => {
        console.error('Error loading contract images:', error);
      }
    );
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

    mergedCanvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('files', blob, 'canvas.png');

      this.contractService.updateImage(this.idContract, formData).subscribe(
        (response) => {
          console.log('Image saved to MongoDB:', response);
          this.loadContractImages();
        },
        (error) => {
          console.error('Error saving image to MongoDB:', error);
        }
      );
    });
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
