"use client";

import { useState } from "react";
import { Code, Copy, Check, Play } from "lucide-react";

export default function ReactPage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyToClipboard = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const reactHookCode = `import { useState, useEffect, useRef, useCallback } from 'react';

export const useXimler = () => {
     const [engine, setEngine] = useState(null);
     const [isLoaded, setIsLoaded] = useState(false);
     const canvasRef = useRef(null);

     const loadEngine = useCallback(async () => {
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
               
               const engineInstance = new Module.CanvasEngineModule();
               setEngine(engineInstance);
               setIsLoaded(true);
          } catch (error) {
               console.error('Failed to load Ximler:', error);
          }
     }, []);

     const initializeCanvas = useCallback((width, height) => {
          if (engine && canvasRef.current) {
               engine.initialize(width, height);
               engine.setCanvas(canvasRef.current);
          }
     }, [engine]);

     const addShape = useCallback((type, x, y, width, height) => {
          if (engine) {
               return engine.addShape(type, x, y, width, height);
          }
          return null;
     }, [engine]);

     const clearCanvas = useCallback(() => {
          if (engine) {
               engine.clearCanvas();
          }
     }, [engine]);

     useEffect(() => {
          loadEngine();
     }, [loadEngine]);

     return {
          engine,
          isLoaded,
          canvasRef,
          initializeCanvas,
          addShape,
          clearCanvas
     };
};`;

     const reactComponentCode = `import React from 'react';
import { useXimler } from './useXimler';

const XimlerCanvas = () => {
     const { 
          engine, 
          isLoaded, 
          canvasRef, 
          initializeCanvas, 
          addShape, 
          clearCanvas 
     } = useXimler();

     const [currentTool, setCurrentTool] = useState('rectangle');
     const [isDrawing, setIsDrawing] = useState(false);
     const [startPos, setStartPos] = useState(null);

     useEffect(() => {
          if (isLoaded && canvasRef.current) {
               const canvas = canvasRef.current;
               initializeCanvas(canvas.width, canvas.height);
          }
     }, [isLoaded, initializeCanvas]);

     const handleMouseDown = (e) => {
          if (!isLoaded) return;
          
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          setIsDrawing(true);
          setStartPos({ x, y });
     };

     const handleMouseUp = (e) => {
          if (!isDrawing || !startPos) return;
          
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const width = Math.abs(x - startPos.x);
          const height = Math.abs(y - startPos.y);
          const shapeX = Math.min(x, startPos.x);
          const shapeY = Math.min(y, startPos.y);
          
          addShape(currentTool, shapeX, shapeY, width, height);
          
          setIsDrawing(false);
          setStartPos(null);
     };

     if (!isLoaded) {
          return (
               <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                         <p className="text-gray-600">Loading Ximler...</p>
                    </div>
               </div>
          );
     }

     return (
          <div className="space-y-4">
               <div className="flex gap-2">
                    <button 
                         onClick={() => setCurrentTool('rectangle')}
                         className={\`px-4 py-2 rounded \${currentTool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
                    >
                         Rectangle
                    </button>
                    <button 
                         onClick={() => setCurrentTool('circle')}
                         className={\`px-4 py-2 rounded \${currentTool === 'circle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
                    >
                         Circle
                    </button>
                    <button 
                         onClick={clearCanvas}
                         className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                         Clear
                    </button>
               </div>
               
               <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="border border-gray-300 rounded-lg shadow-sm cursor-crosshair"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
               />
          </div>
     );
};

export default XimlerCanvas;`;

     return (
          <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">React Integration</h1>
                    <p className="text-xl text-gray-600">Learn how to integrate Ximler with React applications</p>
               </div>

               <div className="space-y-8">
                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Custom Hook</h2>
                         <p className="text-gray-600 mb-4">Create a custom React hook to manage Ximler engine state and operations.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(reactHookCode, "react-hook")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "react-hook" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{reactHookCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">React Component</h2>
                         <p className="text-gray-600 mb-4">A complete React component that uses the custom hook for drawing operations.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(reactComponentCode, "react-component")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "react-component" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{reactComponentCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-blue-900 mb-2">Dependencies</h3>
                              <div className="bg-gray-900 rounded p-4 mb-4">
                                   <code className="text-green-400">npm install react react-dom</code>
                              </div>

                              <h3 className="text-lg font-semibold text-blue-900 mb-2">Files Required</h3>
                              <ul className="list-disc list-inside text-blue-800 space-y-1">
                                   <li>ximler.js</li>
                                   <li>ximler.wasm</li>
                              </ul>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Demo</h2>
                         <div className="bg-gray-100 rounded-lg p-6 text-center">
                              <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-4">Interactive React demo coming soon!</p>
                              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">View Demo</button>
                         </div>
                    </section>
               </div>
          </div>
     );
}
