"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, ZoomIn, Zap, Globe, MousePointer2 } from "lucide-react";

export default function MapZoomPage() {
     const [activeTab, setActiveTab] = useState("react");

     const tabs = [
          { id: "react", label: "React" },
          { id: "nextjs", label: "Next.js" },
          { id: "vue", label: "Vue" },
          { id: "angular", label: "Angular" },
          { id: "vanilla", label: "Vanilla JS" },
     ];

     return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               {/* Header */}
               <div className="mb-8">
                    <Link href="/docs" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                         <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                         Back to Documentation
                    </Link>
                    <div className="flex items-center mb-4">
                         <ZoomIn className="w-8 h-8 text-purple-600 mr-3" />
                         <h1 className="text-4xl font-bold text-gray-900">Map Zoom</h1>
                    </div>
                    <p className="text-xl text-gray-600">Interactive map zooming with mouse wheel and programmatic zoom control</p>
               </div>

               {/* Overview */}
               <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                    <p className="text-gray-700 mb-4">
                         Map zoom allows users to zoom in and out of the map using the mouse wheel or programmatic controls. The zoom system supports zoom levels from 1 to 20, with automatic tile
                         reloading at different zoom levels.
                    </p>
                    <div className="flex items-start space-x-4 text-sm text-gray-600">
                         <div className="flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-purple-600" />
                              Mouse wheel support
                         </div>
                         <div className="flex items-center">
                              <MousePointer2 className="w-4 h-4 mr-2 text-purple-600" />
                              Programmatic control
                         </div>
                         <div className="flex items-center">
                              <Code className="w-4 h-4 mr-2 text-purple-600" />
                              Zoom levels 1-20
                         </div>
                    </div>
               </div>

               {/* How It Works */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Zoom Level Management</h3>
                              <p className="text-gray-600">The zoom system maintains a zoom level (1-20) that determines the map's scale. Each zoom level doubles the tile resolution.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Mouse Wheel Detection</h3>
                              <p className="text-gray-600">Detect wheel events on the canvas and calculate the zoom direction based on deltaY value.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Tile Reloading</h3>
                              <p className="text-gray-600">When zoom changes, the system automatically recalculates visible tiles and loads new tiles at the appropriate zoom level.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Map Rendering</h3>
                              <p className="text-gray-600">After zoom changes, the map is re-rendered with the new zoom level and updated tile data.</p>
                         </div>
                    </div>
               </div>

               {/* API Usage */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Usage</h2>
                    <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                         <pre className="text-green-400">
                              {`// Set map zoom level
engine.setMapZoom(zoomLevel);

// Get current zoom level
const currentZoom = engine.getMapZoom();

// Parameters:
// - zoomLevel: Integer between 1 and 20 (1 = world view, 20 = street level)

// Example:
engine.setMapZoom(16); // Zoom to street level
const zoom = engine.getMapZoom(); // Returns current zoom level`}
                         </pre>
                    </div>
               </div>

               {/* Framework Examples with Tabs */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Framework Examples</h2>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                         <nav className="-mb-px flex space-x-8 overflow-x-auto">
                              {tabs.map((tab) => (
                                   <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                             activeTab === tab.id ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                   >
                                        {tab.label}
                                   </button>
                              ))}
                         </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                         {activeTab === "react" && (
                              <div>
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">React Implementation</h3>
                                   <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                        <pre className="text-green-400 text-xs">
                                             {`import { useState, useCallback } from 'react';
import { useCanvasEngine } from './hooks/useCanvasEngine';

function MapComponent() {
     const { engine, renderMap } = useCanvasEngine();
     const [zoom, setZoom] = useState(16);

     const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
          if (!engine) return;
          
          e.preventDefault();
          
          // Determine zoom direction
          const delta = e.deltaY > 0 ? -1 : 1;
          const newZoom = Math.max(1, Math.min(20, zoom + delta));
          
          if (newZoom !== zoom) {
               setZoom(newZoom);
               engine.setMapZoom(newZoom);
               // Render after a small delay to allow zoom to take effect
               setTimeout(() => renderMap(), 50);
          }
     }, [engine, zoom, renderMap]);

     return (
          <canvas
               onWheel={handleWheel}
               style={{ display: 'block' }}
          />
     );
}`}
                                        </pre>
                                   </div>
                              </div>
                         )}

                         {activeTab === "nextjs" && (
                              <div>
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Next.js Implementation</h3>
                                   <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                        <pre className="text-green-400 text-xs">
                                             {`// app/canvas/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useCanvasEngine } from '@/hooks/useCanvasEngine';

export default function CanvasPage() {
     const { engine, renderMap } = useCanvasEngine();
     const [mapZoom, setMapZoom] = useState(16);

     const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
          if (!engine) return;
          
          e.preventDefault();
          
          // Calculate new zoom level
          const delta = e.deltaY > 0 ? -1 : 1;
          const newZoom = Math.max(1, Math.min(20, mapZoom + delta));
          
          if (newZoom !== mapZoom) {
               setMapZoom(newZoom);
               engine.setMapZoom(newZoom);
               setTimeout(() => renderMap(), 50);
          }
     }, [engine, mapZoom, renderMap]);

     return (
          <div>
               <canvas
                    onWheel={handleWheel}
                    style={{ display: 'block', border: '2px solid #333' }}
               />
               <div className="mt-4">
                    <label>Zoom Level: {mapZoom}</label>
                    <input 
                         type="range" 
                         min="1" 
                         max="20" 
                         value={mapZoom}
                         onChange={(e) => {
                              const newZoom = parseInt(e.target.value);
                              setMapZoom(newZoom);
                              if (engine) {
                                   engine.setMapZoom(newZoom);
                                   setTimeout(() => renderMap(), 50);
                              }
                         }}
                    />
               </div>
          </div>
     );
}`}
                                        </pre>
                                   </div>
                              </div>
                         )}

                         {activeTab === "vue" && (
                              <div>
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Vue.js Implementation</h3>
                                   <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                        <pre className="text-green-400 text-xs">
                                             {`<template>
     <canvas
          ref="canvasRef"
          @wheel="handleWheel"
          :style="{ display: 'block' }"
     />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const zoom = ref(16);

function handleWheel(e: WheelEvent) {
     if (!engine) return;
     
     e.preventDefault();
     
     const delta = e.deltaY > 0 ? -1 : 1;
     const newZoom = Math.max(1, Math.min(20, zoom.value + delta));
     
     if (newZoom !== zoom.value) {
          zoom.value = newZoom;
          engine.setMapZoom(newZoom);
          setTimeout(() => renderMap(), 50);
     }
}
</script>`}
                                        </pre>
                                   </div>
                              </div>
                         )}

                         {activeTab === "angular" && (
                              <div>
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Angular Implementation</h3>
                                   <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                        <pre className="text-green-400 text-xs">
                                             {`import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
     selector: 'app-map',
     template: \`
          <canvas
               #canvas
               (wheel)="handleWheel($event)"
               [style.display]="'block'"
          ></canvas>
     \`
})
export class MapComponent {
     @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
     
     zoom = 16;

     handleWheel(e: WheelEvent) {
          if (!this.engine) return;
          
          e.preventDefault();
          
          const delta = e.deltaY > 0 ? -1 : 1;
          const newZoom = Math.max(1, Math.min(20, this.zoom + delta));
          
          if (newZoom !== this.zoom) {
               this.zoom = newZoom;
               this.engine.setMapZoom(newZoom);
               setTimeout(() => this.renderMap(), 50);
          }
     }
}`}
                                        </pre>
                                   </div>
                              </div>
                         )}

                         {activeTab === "vanilla" && (
                              <div>
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Vanilla JavaScript Implementation</h3>
                                   <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                        <pre className="text-green-400 text-xs">
                                             {`const canvas = document.getElementById('myCanvas');
let zoom = 16;

canvas.addEventListener('wheel', (e) => {
     e.preventDefault();
     
     const delta = e.deltaY > 0 ? -1 : 1;
     const newZoom = Math.max(1, Math.min(20, zoom + delta));
     
     if (newZoom !== zoom) {
          zoom = newZoom;
          engine.setMapZoom(newZoom);
          setTimeout(() => engine.renderMap(), 50);
     }
});

// Programmatic zoom control
function zoomIn() {
     const newZoom = Math.min(20, zoom + 1);
     zoom = newZoom;
     engine.setMapZoom(newZoom);
     setTimeout(() => engine.renderMap(), 50);
}

function zoomOut() {
     const newZoom = Math.max(1, zoom - 1);
     zoom = newZoom;
     engine.setMapZoom(newZoom);
     setTimeout(() => engine.renderMap(), 50);
}`}
                                        </pre>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>

               {/* Zoom Levels */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Zoom Levels</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                         <p className="text-gray-600 mb-4">Ximler supports zoom levels from 1 to 20, where:</p>
                         <div className="space-y-3">
                              <div className="flex items-start">
                                   <span className="font-semibold text-gray-900 w-24">Level 1-5:</span>
                                   <span className="text-gray-600">World/Country view - Very broad coverage</span>
                              </div>
                              <div className="flex items-start">
                                   <span className="font-semibold text-gray-900 w-24">Level 6-10:</span>
                                   <span className="text-gray-600">Regional view - Cities and regions</span>
                              </div>
                              <div className="flex items-start">
                                   <span className="font-semibold text-gray-900 w-24">Level 11-15:</span>
                                   <span className="text-gray-600">City/Neighborhood view - Streets visible</span>
                              </div>
                              <div className="flex items-start">
                                   <span className="font-semibold text-gray-900 w-24">Level 16-20:</span>
                                   <span className="text-gray-600">Street level - Individual buildings and details</span>
                              </div>
                         </div>
                         <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                   <strong>Default Zoom:</strong> The default zoom level is 16, which provides a good balance between detail and performance for most applications.
                              </p>
                         </div>
                    </div>
               </div>

               {/* Key Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mouse Wheel Support</h3>
                              <p className="text-gray-600">Smooth zooming using standard mouse wheel gestures with natural feel.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Programmatic Control</h3>
                              <p className="text-gray-600">Set zoom levels programmatically for buttons, sliders, or other UI controls.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Tile Loading</h3>
                              <p className="text-gray-600">Automatically loads appropriate tiles for the new zoom level.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zoom Constraints</h3>
                              <p className="text-gray-600">Built-in validation ensures zoom stays within the valid range (1-20).</p>
                         </div>
                    </div>
               </div>

               {/* Best Practices */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
                         <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Tips</h3>
                         <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Always prevent default wheel event behavior to avoid page scrolling</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Use a small delay (50ms) before rendering after zoom changes to allow engine state to update</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Store zoom state in your component to sync with UI controls (sliders, buttons)</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Consider debouncing rapid zoom changes if users are scrolling quickly</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Validate zoom level before setting to ensure it stays within 1-20 range</span>
                              </li>
                         </ul>
                    </div>
               </div>

               {/* Combined Usage Example */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Combined with Panning</h2>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                         <p className="text-gray-700 mb-4">
                              Zoom and panning work seamlessly together. Users can pan the map to navigate and zoom in/out to see more detail. Both features use the same rendering pipeline for optimal
                              performance.
                         </p>
                         <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mt-4">
                              <pre className="text-green-400 text-xs">
                                   {`// Combined zoom and panning in React
const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
     // Handle zoom
     const delta = e.deltaY > 0 ? -1 : 1;
     const newZoom = Math.max(1, Math.min(20, mapZoom + delta));
     if (newZoom !== mapZoom) {
          setMapZoom(newZoom);
          engine.setMapZoom(newZoom);
          setTimeout(() => renderMap(), 50);
     }
}, [engine, mapZoom, renderMap]);

const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
     // Handle panning
     if (isPanning) {
          const deltaX = e.clientX - panStartPos.x;
          const deltaY = e.clientY - panStartPos.y;
          panMapByDelta(deltaX, deltaY, false);
     }
}, [isPanning, panStartPos, panMapByDelta]);`}
                              </pre>
                         </div>
                    </div>
               </div>

               {/* Related Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                         <Link href="/docs/features/map-panning" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Map Panning</h3>
                              <p className="text-gray-600">Navigate maps with smooth drag interactions</p>
                              <span className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center mt-2">Learn about Panning →</span>
                         </Link>
                         <Link href="/docs/features/map-caching" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Map Caching</h3>
                              <p className="text-gray-600">Optimize performance with dual-layer tile caching</p>
                              <span className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center mt-2">Learn about Caching →</span>
                         </Link>
                    </div>
               </div>

               {/* CTA */}
               <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to implement map zooming?</h2>
                    <p className="text-purple-100 mb-6">Check out the Next.js example for a complete implementation with panning and zoom</p>
                    <div className="flex justify-center gap-4">
                         <Link href="/docs/examples" className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                              View Examples →
                         </Link>
                         <Link href="/docs/features/map-panning" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                              Learn About Panning →
                         </Link>
                    </div>
               </div>
          </div>
     );
}
