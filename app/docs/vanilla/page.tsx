"use client";

import { useState } from "react";
import { Code, Copy, Check, Play } from "lucide-react";

export default function VanillaJSPage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyToClipboard = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const vanillaJSCode = `class XimlerCanvas {
     constructor(containerId) {
          this.container = document.getElementById(containerId);
          this.engine = null;
          this.isLoaded = false;
          this.currentTool = 'rectangle';
          this.isDrawing = false;
          this.startPos = null;
          
          this.init();
     }

     async init() {
          await this.loadEngine();
          this.createCanvas();
          this.setupEventListeners();
     }

     async loadEngine() {
          try {
               const XimlerModule = await import('/ximler.js');
               const Module = await XimlerModule.default({
                    locateFile: (path) => {
                         if (path.endsWith('.wasm')) {
                              return '/ximler.wasm';
                         }
                         return path;
                    },
               });
               
               this.engine = new Module.CanvasEngineModule();
               this.isLoaded = true;
               console.log('Ximler engine loaded successfully');
          } catch (error) {
               console.error('Failed to load Ximler:', error);
          }
     }

     createCanvas() {
          // Create toolbar
          const toolbar = document.createElement('div');
          toolbar.className = 'flex gap-2 mb-4';
          
          const rectangleBtn = document.createElement('button');
          rectangleBtn.textContent = 'Rectangle';
          rectangleBtn.className = 'px-4 py-2 rounded bg-blue-500 text-white';
          rectangleBtn.onclick = () => this.setTool('rectangle');
          
          const circleBtn = document.createElement('button');
          circleBtn.textContent = 'Circle';
          circleBtn.className = 'px-4 py-2 rounded bg-gray-200';
          circleBtn.onclick = () => this.setTool('circle');
          
          const clearBtn = document.createElement('button');
          clearBtn.textContent = 'Clear';
          clearBtn.className = 'px-4 py-2 rounded bg-red-500 text-white';
          clearBtn.onclick = () => this.clearCanvas();
          
          toolbar.appendChild(rectangleBtn);
          toolbar.appendChild(circleBtn);
          toolbar.appendChild(clearBtn);
          
          // Create canvas
          this.canvas = document.createElement('canvas');
          this.canvas.width = 800;
          this.canvas.height = 600;
          this.canvas.className = 'border border-gray-300 rounded-lg shadow-sm cursor-crosshair';
          
          // Create loading indicator
          this.loadingDiv = document.createElement('div');
          this.loadingDiv.className = 'flex items-center justify-center h-96';
          this.loadingDiv.innerHTML = \`
               <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p class="text-gray-600">Loading Ximler...</p>
               </div>
          \`;
          
          this.container.appendChild(toolbar);
          this.container.appendChild(this.loadingDiv);
     }

     setupEventListeners() {
          if (this.isLoaded && this.canvas) {
               this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
               this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
               
               // Initialize canvas
               this.engine.initialize(this.canvas.width, this.canvas.height);
               this.engine.setCanvas(this.canvas);
               
               // Replace loading with canvas
               this.container.replaceChild(this.canvas, this.loadingDiv);
          }
     }

     setTool(tool) {
          this.currentTool = tool;
          
          // Update button styles
          const buttons = this.container.querySelectorAll('button');
          buttons.forEach(btn => {
               btn.className = btn.className.replace('bg-blue-500 text-white', 'bg-gray-200');
          });
          
          event.target.className = event.target.className.replace('bg-gray-200', 'bg-blue-500 text-white');
     }

     handleMouseDown(e) {
          if (!this.isLoaded) return;
          
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          this.isDrawing = true;
          this.startPos = { x, y };
     }

     handleMouseUp(e) {
          if (!this.isDrawing || !this.startPos) return;
          
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const width = Math.abs(x - this.startPos.x);
          const height = Math.abs(y - this.startPos.y);
          const shapeX = Math.min(x, this.startPos.x);
          const shapeY = Math.min(y, this.startPos.y);
          
          this.engine.addShape(this.currentTool, shapeX, shapeY, width, height);
          
          this.isDrawing = false;
          this.startPos = null;
     }

     clearCanvas() {
          if (this.engine) {
               this.engine.clearCanvas();
          }
     }
}

// Initialize the canvas
document.addEventListener('DOMContentLoaded', () => {
     new XimlerCanvas('canvas-container');
});`;

     const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Ximler Vanilla JS Demo</title>
     <style>
          body {
               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
               margin: 0;
               padding: 20px;
               background-color: #f9fafb;
          }
          
          .container {
               max-width: 1000px;
               margin: 0 auto;
               background: white;
               padding: 20px;
               border-radius: 8px;
               box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          h1 {
               color: #1f2937;
               margin-bottom: 20px;
          }
          
          button {
               border: none;
               cursor: pointer;
               transition: all 0.2s;
          }
          
          button:hover {
               opacity: 0.8;
          }
          
          canvas {
               display: block;
               margin: 0 auto;
          }
          
          @keyframes spin {
               from { transform: rotate(0deg); }
               to { transform: rotate(360deg); }
          }
          
          .animate-spin {
               animation: spin 1s linear infinite;
          }
     </style>
</head>
<body>
     <div class="container">
          <h1>Ximler Canvas Demo</h1>
          <div id="canvas-container"></div>
     </div>
     
     <script type="module" src="ximler-canvas.js"></script>
</body>
</html>`;

     const vanillaJSInstallationCode = `# Create project directory
mkdir ximler-vanilla-demo
cd ximler-vanilla-demo

# Copy Ximler files
cp ximler.js ./
cp ximler.wasm ./

# Create HTML file
touch index.html

# Create JavaScript file
touch ximler-canvas.js

# Serve with any HTTP server
python3 -m http.server 8080
# or
npx serve .
# or
php -S localhost:8080`;

     return (
          <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Vanilla JavaScript Integration</h1>
                    <p className="text-xl text-gray-600">Learn how to integrate Ximler with pure JavaScript without any frameworks</p>
               </div>

               <div className="space-y-8">
                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">JavaScript Class</h2>
                         <p className="text-gray-600 mb-4">A complete JavaScript class that manages Ximler engine and canvas interactions.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(vanillaJSCode, "vanilla-js")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "vanilla-js" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{vanillaJSCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">HTML Template</h2>
                         <p className="text-gray-600 mb-4">Simple HTML template with embedded CSS for styling.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(htmlCode, "html-template")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "html-template" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{htmlCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
                         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Setup Commands</h3>
                              <div className="bg-gray-900 rounded p-4 mb-4">
                                   <code className="text-green-400">{vanillaJSInstallationCode}</code>
                              </div>

                              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Files Required</h3>
                              <ul className="list-disc list-inside text-yellow-800 space-y-1">
                                   <li>ximler.js</li>
                                   <li>ximler.wasm</li>
                                   <li>index.html</li>
                                   <li>ximler-canvas.js</li>
                              </ul>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Demo</h2>
                         <div className="bg-gray-100 rounded-lg p-6 text-center">
                              <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-4">Interactive Vanilla JS demo coming soon!</p>
                              <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">View Demo</button>
                         </div>
                    </section>
               </div>
          </div>
     );
}
