"use client";

import { useState } from "react";
import { Code, Copy, Check, Play } from "lucide-react";

export default function AngularPage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyToClipboard = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const angularServiceCode = `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XimlerService {
  private engineSubject = new BehaviorSubject<any>(null);
  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  
  public engine$ = this.engineSubject.asObservable();
  public isLoaded$ = this.isLoadedSubject.asObservable();

  constructor() {
    this.loadEngine();
  }

  private async loadEngine(): Promise<void> {
    try {
      const XimlerModule = await import('/ximler.js');
      const Module = await XimlerModule.default({
        locateFile: (path: string) => {
          if (path.endsWith('.wasm')) {
            return '/ximler.wasm';
          }
          return path;
        },
      });
      
      const engineInstance = new Module.CanvasEngineModule();
      this.engineSubject.next(engineInstance);
      this.isLoadedSubject.next(true);
    } catch (error) {
      console.error('Failed to load Ximler:', error);
    }
  }

  initializeCanvas(width: number, height: number): void {
    const engine = this.engineSubject.value;
    if (engine) {
      engine.initialize(width, height);
    }
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    const engine = this.engineSubject.value;
    if (engine) {
      engine.setCanvas(canvas);
    }
  }

  addShape(type: string, x: number, y: number, width: number, height: number): any {
    const engine = this.engineSubject.value;
    if (engine) {
      return engine.addShape(type, x, y, width, height);
    }
    return null;
  }

  clearCanvas(): void {
    const engine = this.engineSubject.value;
    if (engine) {
      engine.clearCanvas();
    }
  }
}`;

     const angularComponentCode = `import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { XimlerService } from './ximler.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ximler-canvas',
  template: \`
    <div class="space-y-4">
      <div *ngIf="!(isLoaded$ | async)" class="flex items-center justify-center h-96">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading Ximler...</p>
        </div>
      </div>

      <div *ngIf="isLoaded$ | async">
        <div class="flex gap-2 mb-4">
          <button 
            (click)="currentTool = 'rectangle'"
            [class]="currentTool === 'rectangle' ? 'px-4 py-2 rounded bg-blue-500 text-white' : 'px-4 py-2 rounded bg-gray-200'"
          >
            Rectangle
          </button>
          <button 
            (click)="currentTool = 'circle'"
            [class]="currentTool === 'circle' ? 'px-4 py-2 rounded bg-blue-500 text-white' : 'px-4 py-2 rounded bg-gray-200'"
          >
            Circle
          </button>
          <button 
            (click)="clearCanvas()"
            class="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear
          </button>
        </div>
        
        <canvas
          #canvasRef
          [width]="800"
          [height]="600"
          class="border border-gray-300 rounded-lg shadow-sm cursor-crosshair"
          (mousedown)="handleMouseDown($event)"
          (mouseup)="handleMouseUp($event)"
        ></canvas>
      </div>
    </div>
  \`,
  styles: [\`
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  \`]
})
export class XimlerCanvasComponent implements OnInit {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  engine$: Observable<any>;
  isLoaded$: Observable<boolean>;
  
  currentTool = 'rectangle';
  isDrawing = false;
  startPos: { x: number; y: number } | null = null;

  constructor(private ximlerService: XimlerService) {
    this.engine$ = this.ximlerService.engine$;
    this.isLoaded$ = this.ximlerService.isLoaded$;
  }

  ngOnInit(): void {
    this.isLoaded$.subscribe(isLoaded => {
      if (isLoaded && this.canvasRef) {
        const canvas = this.canvasRef.nativeElement;
        this.ximlerService.initializeCanvas(canvas.width, canvas.height);
        this.ximlerService.setCanvas(canvas);
      }
    });
  }

  handleMouseDown(event: MouseEvent): void {
    if (!this.isLoaded$.value) return;
    
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.isDrawing = true;
    this.startPos = { x, y };
  }

  handleMouseUp(event: MouseEvent): void {
    if (!this.isDrawing || !this.startPos) return;
    
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const width = Math.abs(x - this.startPos.x);
    const height = Math.abs(y - this.startPos.y);
    const shapeX = Math.min(x, this.startPos.x);
    const shapeY = Math.min(y, this.startPos.y);
    
    this.ximlerService.addShape(this.currentTool, shapeX, shapeY, width, height);
    
    this.isDrawing = false;
    this.startPos = null;
  }

  clearCanvas(): void {
    this.ximlerService.clearCanvas();
  }
}`;

     const angularInstallationCode = `# Install Angular CLI
npm install -g @angular/cli

# Create new Angular project
ng new my-angular-app
cd my-angular-app

# Copy Ximler files to src/assets
cp ximler.js src/assets/
cp ximler.wasm src/assets/

# Update angular.json to include assets
# Add to "assets" array: "src/assets/ximler.js", "src/assets/ximler.wasm"`;

     return (
          <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Angular Integration</h1>
                    <p className="text-xl text-gray-600">Learn how to integrate Ximler with Angular applications using services and dependency injection</p>
               </div>

               <div className="space-y-8">
                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Angular Service</h2>
                         <p className="text-gray-600 mb-4">Create an Angular service to manage Ximler engine state using RxJS observables.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(angularServiceCode, "angular-service")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "angular-service" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{angularServiceCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Angular Component</h2>
                         <p className="text-gray-600 mb-4">A complete Angular component that uses the service for drawing operations.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(angularComponentCode, "angular-component")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "angular-component" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{angularComponentCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
                         <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-red-900 mb-2">Setup Commands</h3>
                              <div className="bg-gray-900 rounded p-4 mb-4">
                                   <code className="text-green-400">{angularInstallationCode}</code>
                              </div>

                              <h3 className="text-lg font-semibold text-red-900 mb-2">Files Required</h3>
                              <ul className="list-disc list-inside text-red-800 space-y-1">
                                   <li>ximler.js</li>
                                   <li>ximler.wasm</li>
                              </ul>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Demo</h2>
                         <div className="bg-gray-100 rounded-lg p-6 text-center">
                              <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-4">Interactive Angular demo coming soon!</p>
                              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">View Demo</button>
                         </div>
                    </section>
               </div>
          </div>
     );
}
