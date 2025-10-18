"use client";

import { useState } from "react";
import { Code, Copy, Check, Play, ExternalLink } from "lucide-react";

export default function ExamplesPage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyToClipboard = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const basicExampleCode = `// Basic Rectangle Drawing
const engine = new XimlerModule.CanvasEngineModule();
engine.initialize(800, 600);
engine.setCanvas(canvasElement);

// Draw a rectangle
const shape = engine.addShape('rectangle', 100, 100, 200, 150);
console.log('Created shape:', shape);`;

     const advancedExampleCode = `// Advanced Shape Manipulation
class AdvancedCanvas {
     constructor(canvasId) {
          this.canvas = document.getElementById(canvasId);
          this.engine = new XimlerModule.CanvasEngineModule();
          this.shapes = [];
          this.selectedShape = null;
          
          this.init();
     }

     async init() {
          this.engine.initialize(this.canvas.width, this.canvas.height);
          this.engine.setCanvas(this.canvas);
          this.setupEventListeners();
     }

     setupEventListeners() {
          this.canvas.addEventListener('mousedown', (e) => {
               const rect = this.canvas.getBoundingClientRect();
               const x = e.clientX - rect.left;
               const y = e.clientY - rect.top;
               
               // Check if clicking on existing shape
               this.selectedShape = this.findShapeAt(x, y);
               
               if (!this.selectedShape) {
                    this.startDrawing(x, y);
               }
          });

          this.canvas.addEventListener('mousemove', (e) => {
               if (this.isDrawing) {
                    this.updatePreview(e);
               } else if (this.selectedShape) {
                    this.moveShape(e);
               }
          });

          this.canvas.addEventListener('mouseup', (e) => {
               if (this.isDrawing) {
                    this.finishDrawing(e);
               }
               this.selectedShape = null;
          });
     }

     findShapeAt(x, y) {
          // Simple hit detection (implement based on your needs)
          return this.shapes.find(shape => 
               x >= shape.x && x <= shape.x + shape.width &&
               y >= shape.y && y <= shape.y + shape.height
          );
     }

     startDrawing(x, y) {
          this.isDrawing = true;
          this.startPos = { x, y };
     }

     updatePreview(e) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Clear canvas and redraw all shapes
          this.engine.clearCanvas();
          this.redrawShapes();
          
          // Draw preview
          const width = Math.abs(x - this.startPos.x);
          const height = Math.abs(y - this.startPos.y);
          const shapeX = Math.min(x, this.startPos.x);
          const shapeY = Math.min(y, this.startPos.y);
          
          this.engine.addShape(this.currentTool, shapeX, shapeY, width, height);
     }

     finishDrawing(e) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const width = Math.abs(x - this.startPos.x);
          const height = Math.abs(y - this.startPos.y);
          const shapeX = Math.min(x, this.startPos.x);
          const shapeY = Math.min(y, this.startPos.y);
          
          const shape = this.engine.addShape(this.currentTool, shapeX, shapeY, width, height);
          this.shapes.push(shape);
          
          this.isDrawing = false;
          this.startPos = null;
     }

     moveShape(e) {
          if (!this.selectedShape) return;
          
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Update shape position
          this.selectedShape.x = x - this.selectedShape.width / 2;
          this.selectedShape.y = y - this.selectedShape.height / 2;
          
          // Redraw canvas
          this.redrawShapes();
     }

     redrawShapes() {
          this.engine.clearCanvas();
          this.shapes.forEach(shape => {
               this.engine.addShape(shape.type, shape.x, shape.y, shape.width, shape.height);
          });
     }
}`;

     const mapExampleCode = `// Map Engine Example
class MapCanvas {
     constructor(canvasId) {
          this.canvas = document.getElementById(canvasId);
          this.mapEngine = new XimlerModule.CanvasEngineModule();
          this.currentLocation = { lat: 41.0082, lng: 28.9784 }; // Istanbul
          this.zoomLevel = 10;
          
          this.init();
     }

     async init() {
          this.mapEngine.initialize(this.canvas.width, this.canvas.height);
          this.mapEngine.setCanvas(this.canvas);
          
          // Initialize map coordinate system
          this.mapEngine.setCoordinateSystem('LAT_LNG');
          this.mapEngine.setCenter(this.currentLocation.lat, this.currentLocation.lng);
          this.mapEngine.setZoom(this.zoomLevel);
          
          this.loadMapTiles();
          this.setupMapControls();
     }

     loadMapTiles() {
          // Load map tiles based on current location and zoom
          const tileUrl = \`https://mt1.google.com/vt/lyrs=m&x=\${this.tileX}&\${this.tileY}&z=\${this.zoomLevel}\`;
          
          this.mapEngine.loadMapTile(tileUrl, this.tileX, this.tileY, this.zoomLevel);
     }

     setupMapControls() {
          // Zoom controls
          const zoomInBtn = document.getElementById('zoom-in');
          const zoomOutBtn = document.getElementById('zoom-out');
          
          zoomInBtn.addEventListener('click', () => {
               this.zoomLevel = Math.min(this.zoomLevel + 1, 20);
               this.mapEngine.setZoom(this.zoomLevel);
               this.loadMapTiles();
          });
          
          zoomOutBtn.addEventListener('click', () => {
               this.zoomLevel = Math.max(this.zoomLevel - 1, 1);
               this.mapEngine.setZoom(this.zoomLevel);
               this.loadMapTiles();
          });

          // Pan controls
          this.canvas.addEventListener('mousedown', (e) => {
               this.isPanning = true;
               this.lastPanPos = { x: e.clientX, y: e.clientY };
          });

          this.canvas.addEventListener('mousemove', (e) => {
               if (this.isPanning) {
                    const deltaX = e.clientX - this.lastPanPos.x;
                    const deltaY = e.clientY - this.lastPanPos.y;
                    
                    this.mapEngine.pan(deltaX, deltaY);
                    this.lastPanPos = { x: e.clientX, y: e.clientY };
               }
          });

          this.canvas.addEventListener('mouseup', () => {
               this.isPanning = false;
          });
     }

     addMapMarker(lat, lng, label) {
          const pixelPos = this.mapEngine.latLngToPixel(lat, lng);
          const marker = this.mapEngine.addShape('circle', pixelPos.x - 5, pixelPos.y - 5, 10, 10);
          marker.setProperty('fillColor', '#ff0000');
          marker.setProperty('label', label);
          return marker;
     }

     measureDistance(lat1, lng1, lat2, lng2) {
          return this.mapEngine.measureDistance(lat1, lng1, lat2, lng2);
     }
}`;

     return (
          <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Examples & Use Cases</h1>
                    <p className="text-xl text-gray-600">Explore practical examples and real-world use cases for Ximler</p>
               </div>

               <div className="space-y-8">
                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic Drawing</h2>
                         <p className="text-gray-600 mb-4">Simple example showing how to create basic shapes with Ximler.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(basicExampleCode, "basic-example")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "basic-example" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{basicExampleCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Advanced Canvas</h2>
                         <p className="text-gray-600 mb-4">Advanced example with shape selection, movement, and preview functionality.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(advancedExampleCode, "advanced-example")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "advanced-example" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{advancedExampleCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Map Integration</h2>
                         <p className="text-gray-600 mb-4">Example showing how to use Ximler's map engine for geographic applications.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(mapExampleCode, "map-example")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "map-example" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{mapExampleCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interactive Demos</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                   <h3 className="text-lg font-semibold text-blue-900 mb-2">Drawing App</h3>
                                   <p className="text-blue-800 mb-4">Create shapes, move them around, and export your artwork.</p>
                                   <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Launch Demo
                                   </button>
                              </div>

                              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                   <h3 className="text-lg font-semibold text-green-900 mb-2">Map Viewer</h3>
                                   <p className="text-green-800 mb-4">Interactive map with markers, measurements, and layers.</p>
                                   <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Launch Demo
                                   </button>
                              </div>

                              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                                   <h3 className="text-lg font-semibold text-purple-900 mb-2">Architecture Tool</h3>
                                   <p className="text-purple-800 mb-4">Floor plan designer with 3D visualization.</p>
                                   <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Launch Demo
                                   </button>
                              </div>

                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                   <h3 className="text-lg font-semibold text-orange-900 mb-2">Game Engine</h3>
                                   <p className="text-orange-800 mb-4">2D game development with physics and animations.</p>
                                   <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Launch Demo
                                   </button>
                              </div>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">GitHub Examples</h2>
                         <div className="bg-gray-100 rounded-lg p-6">
                              <p className="text-gray-600 mb-4">Check out our GitHub repository for more complete examples and starter templates.</p>
                              <a
                                   href="https://github.com/ximler/canvas-engine"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                              >
                                   <ExternalLink className="w-4 h-4" />
                                   View on GitHub
                              </a>
                         </div>
                    </section>
               </div>
          </div>
     );
}
