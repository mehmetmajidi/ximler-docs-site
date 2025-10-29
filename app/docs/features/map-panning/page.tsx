"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, MousePointer, Zap, Globe } from "lucide-react";

export default function MapPanningPage() {
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
                         <Globe className="w-8 h-8 text-blue-600 mr-3" />
                         <h1 className="text-4xl font-bold text-gray-900">Map Panning</h1>
                    </div>
                    <p className="text-xl text-gray-600">Interactive map panning with smooth mouse movement and pixel-perfect accuracy</p>
               </div>

               {/* Overview */}
               <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                    <p className="text-gray-700 mb-4">
                         Map panning allows users to navigate the map by dragging with their mouse. The panning system converts pixel movement to geographic coordinates, ensuring smooth and accurate
                         map navigation.
                    </p>
                    <div className="flex items-start space-x-4 text-sm text-gray-600">
                         <div className="flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-blue-600" />
                              Real-time coordinate conversion
                         </div>
                         <div className="flex items-center">
                              <MousePointer className="w-4 h-4 mr-2 text-blue-600" />
                              Smooth mouse tracking
                         </div>
                         <div className="flex items-center">
                              <Code className="w-4 h-4 mr-2 text-blue-600" />
                              Easy to implement
                         </div>
                    </div>
               </div>

               {/* How It Works */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Mouse Movement Tracking</h3>
                              <p className="text-gray-600">Track mouse position during drag events to calculate the pixel delta (difference in X and Y coordinates).</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Coordinate Conversion</h3>
                              <p className="text-gray-600">Convert pixel movement to geographic coordinates (latitude/longitude) based on current zoom level.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Map Update</h3>
                              <p className="text-gray-600">Update the map center and render new tiles at the new location.</p>
                         </div>
                    </div>
               </div>

               {/* API Usage */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Usage</h2>
                    <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                         <pre className="text-green-400">
                              {`// Pan map by pixel delta
engine.panMapByDelta(deltaX, deltaY, canvasWidth, canvasHeight);

// Parameters:
// - deltaX: Horizontal pixel movement
// - deltaY: Vertical pixel movement  
// - canvasWidth: Canvas width in pixels
// - canvasHeight: Canvas height in pixels`}
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
                                             activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
     const { panMapByDelta, renderMap, canvasRef } = useCanvasEngine();
     const [isPanning, setIsPanning] = useState(false);
     const [panStartPos, setPanStartPos] = useState({ x: 0, y: 0 });

     const handleMouseDown = useCallback((e) => {
          setIsPanning(true);
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          setPanStartPos({
               x: e.clientX - rect.left,
               y: e.clientY - rect.top,
          });
     }, []);

     const handleMouseMove = useCallback((e) => {
          if (isPanning) {
               const rect = canvasRef.current?.getBoundingClientRect();
               if (!rect) return;
               const currentX = e.clientX - rect.left;
               const currentY = e.clientY - rect.top;
               
               const deltaX = currentX - panStartPos.x;
               const deltaY = currentY - panStartPos.y;
               
               panMapByDelta(deltaX, deltaY, false);
               setPanStartPos({ x: currentX, y: currentY });
          }
     }, [isPanning, panStartPos, panMapByDelta]);

     const handleMouseUp = useCallback(() => {
          setIsPanning(false);
          renderMap();
     }, [renderMap]);

     return (
          <canvas
               ref={canvasRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
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
     const { panMapByDelta, renderMap, canvasRef } = useCanvasEngine();
     const [isPanning, setIsPanning] = useState(false);
     const [panStartPos, setPanStartPos] = useState({ x: 0, y: 0 });

     const handleMouseDown = useCallback((e) => {
          setIsPanning(true);
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          setPanStartPos({
               x: e.clientX - rect.left,
               y: e.clientY - rect.top,
          });
     }, []);

     const handleMouseMove = useCallback((e) => {
          if (isPanning) {
               const rect = canvasRef.current?.getBoundingClientRect();
               if (!rect) return;
               const currentX = e.clientX - rect.left;
               const currentY = e.clientY - rect.top;
               
               const deltaX = currentX - panStartPos.x;
               const deltaY = currentY - panStartPos.y;
               
               panMapByDelta(deltaX, deltaY, false);
               setPanStartPos({ x: currentX, y: currentY });
          }
     }, [isPanning, panStartPos, panMapByDelta]);

     const handleMouseUp = useCallback(() => {
          setIsPanning(false);
          renderMap();
     }, [renderMap]);

     return (
          <canvas
               ref={canvasRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
          />
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
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          :style="{ cursor: isPanning ? 'grabbing' : 'grab' }"
     />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isPanning = ref(false);
const panStartPos = reactive({ x: 0, y: 0 });

function handleMouseDown(e: MouseEvent) {
     isPanning.value = true;
     const rect = canvasRef.value?.getBoundingClientRect();
     if (!rect) return;
     panStartPos.x = e.clientX - rect.left;
     panStartPos.y = e.clientY - rect.top;
}

function handleMouseMove(e: MouseEvent) {
     if (isPanning.value) {
          const rect = canvasRef.value?.getBoundingClientRect();
          if (!rect) return;
          const currentX = e.clientX - rect.left;
          const currentY = e.clientY - rect.top;
          
          const deltaX = currentX - panStartPos.x;
          const deltaY = currentY - panStartPos.y;
          
          panMapByDelta(deltaX, deltaY, false);
          panStartPos.x = currentX;
          panStartPos.y = currentY;
     }
}

function handleMouseUp() {
     isPanning.value = false;
     renderMap();
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
               (mousedown)="handleMouseDown($event)"
               (mousemove)="handleMouseMove($event)"
               (mouseup)="handleMouseUp()"
               [style.cursor]="isPanning ? 'grabbing' : 'grab'"
          ></canvas>
     \`
})
export class MapComponent {
     @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
     
     isPanning = false;
     panStartPos = { x: 0, y: 0 };

     handleMouseDown(e: MouseEvent) {
          this.isPanning = true;
          const rect = this.canvas.nativeElement.getBoundingClientRect();
          this.panStartPos.x = e.clientX - rect.left;
          this.panStartPos.y = e.clientY - rect.top;
     }

     handleMouseMove(e: MouseEvent) {
          if (this.isPanning) {
               const rect = this.canvas.nativeElement.getBoundingClientRect();
               const currentX = e.clientX - rect.left;
               const currentY = e.clientY - rect.top;
               
               const deltaX = currentX - this.panStartPos.x;
               const deltaY = currentY - this.panStartPos.y;
               
               this.panMapByDelta(deltaX, deltaY, false);
               this.panStartPos.x = currentX;
               this.panStartPos.y = currentY;
          }
     }

     handleMouseUp() {
          this.isPanning = false;
          this.renderMap();
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
const ctx = canvas.getContext('2d');

let isPanning = false;
let panStartPos = { x: 0, y: 0 };

canvas.addEventListener('mousedown', (e) => {
     isPanning = true;
     const rect = canvas.getBoundingClientRect();
     panStartPos.x = e.clientX - rect.left;
     panStartPos.y = e.clientY - rect.top;
});

canvas.addEventListener('mousemove', (e) => {
     if (isPanning) {
          const rect = canvas.getBoundingClientRect();
          const currentX = e.clientX - rect.left;
          const currentY = e.clientY - rect.top;
          
          const deltaX = currentX - panStartPos.x;
          const deltaY = currentY - panStartPos.y;
          
          engine.panMapByDelta(deltaX, deltaY, canvas.width, canvas.height);
          
          panStartPos.x = currentX;
          panStartPos.y = currentY;
     }
});

canvas.addEventListener('mouseup', () => {
     isPanning = false;
     engine.renderMap();
});

canvas.style.cursor = 'grab';`}
                                        </pre>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>

               {/* Key Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Conversion</h3>
                              <p className="text-gray-600">Converts pixel movement to real-world geographic coordinates with meter-level accuracy.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zoom Awareness</h3>
                              <p className="text-gray-600">Automatically adjusts panning speed based on current zoom level for natural feel.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Optimized</h3>
                              <p className="text-gray-600">Defers rendering until user completes the pan gesture for smooth interaction.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cross-Platform</h3>
                              <p className="text-gray-600">Works consistently across all browsers and operating systems.</p>
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
                                   <span>Don't render on every mousemove event - only render when user finishes panning</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>For better performance, defer map rendering until the user releases the mouse</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Implement proper cleanup in useEffect hooks to prevent memory leaks</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Use React's useCallback to prevent unnecessary re-renders</span>
                              </li>
                         </ul>
                    </div>
               </div>

               {/* Related Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                         <Link href="/docs/features/map-zoom" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Map Zoom</h3>
                              <p className="text-gray-600">Control zoom levels with mouse wheel and programmatic API</p>
                              <span className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center mt-2">Learn about Zoom →</span>
                         </Link>
                         <Link href="/docs/features/map-caching" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Map Caching</h3>
                              <p className="text-gray-600">Optimize performance with dual-layer tile caching</p>
                              <span className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center mt-2">Learn about Caching →</span>
                         </Link>
                    </div>
               </div>

               {/* CTA */}
               <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to implement map panning?</h2>
                    <p className="text-blue-100 mb-6">Check out the Next.js example for a complete implementation with zoom and panning</p>
                    <div className="flex justify-center gap-4">
                         <Link href="/docs/examples" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                              View Examples →
                         </Link>
                         <Link href="/docs/features/map-zoom" className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                              Learn About Zoom →
                         </Link>
                    </div>
               </div>
          </div>
     );
}
