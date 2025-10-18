"use client";

import Link from "next/link";
import { ArrowLeft, Play, Code, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function QuickStartPage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyCode = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const basicExample = `<!DOCTYPE html>
<html>
<head>
    <title>Ximler Quick Start</title>
</head>
<body>
    <canvas id="canvas" width="800" height="600"></canvas>
    
    <script type="module">
        async function initCanvas() {
            // Load Ximler
            const Module = await import('./ximler.js');
            const XimlerModule = Module.default;
            const engine = new XimlerModule.XimlerModule();
            
            // Get canvas element
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            
            // Initialize engine
            engine.initialize(canvas.width, canvas.height);
            engine.canvas = canvas;
            engine.ctx = ctx;
            
            // Create shapes
            engine.addShape('rectangle', 100, 100, 200, 150);
            engine.addShape('circle', 400, 200, 75);
            engine.addShape('line', 50, 300, 350, 400);
            
            // Render
            engine.render();
        }
        
        initCanvas();
    </script>
</body>
</html>`;

     const reactExample = `import React, { useEffect, useRef } from 'react';

const XimlerCanvas = () => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const initEngine = async () => {
            const Module = await import('./ximler.js');
            const XimlerModule = Module.default;
            const engine = new XimlerModule.XimlerModule();
            
            const canvas = canvasRef.current;
            engine.initialize(canvas.width, canvas.height);
            engine.canvas = canvas;
            engine.ctx = canvas.getContext('2d');
            
            engineRef.current = engine;
        };

        initEngine();
    }, []);

    const addShape = () => {
        if (engineRef.current) {
            engineRef.current.addShape('rectangle', 100, 100, 200, 150);
            engineRef.current.render();
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600} />
            <button onClick={addShape}>Add Rectangle</button>
        </div>
    );
};

export default XimlerCanvas;`;

     return (
          <div className="min-h-screen bg-gray-50">
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="mb-8">
                         <Link href="/docs" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                              <ArrowLeft className="w-4 h-4 mr-2" />
                              Back to Documentation
                         </Link>
                         <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Start Guide</h1>
                         <p className="text-xl text-gray-600">Get up and running with Ximler in just a few minutes.</p>
                    </div>

                    {/* Prerequisites */}
                    <div className="card mb-8 bg-blue-50 border-blue-200">
                         <div className="flex items-center mb-4">
                              <Play className="w-6 h-6 text-blue-600 mr-3" />
                              <h2 className="text-xl font-semibold text-gray-900">Prerequisites</h2>
                         </div>
                         <p className="text-gray-700 mb-4">Before you start, make sure you have completed the installation steps:</p>
                         <ul className="list-disc list-inside text-gray-700 space-y-2">
                              <li>
                                   Ximler downloaded and installed (see{" "}
                                   <Link href="/docs/installation" className="text-primary-600 hover:text-primary-700">
                                        Installation Guide
                                   </Link>
                                   )
                              </li>
                              <li>
                                   WebAssembly files: <code className="bg-gray-100 px-2 py-1 rounded">ximler.js</code> and <code className="bg-gray-100 px-2 py-1 rounded">ximler.wasm</code>
                              </li>
                              <li>A local HTTP server (required for WebAssembly)</li>
                         </ul>
                    </div>

                    {/* Basic Example */}
                    <div className="card mb-8">
                         <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                   <Code className="w-6 h-6 mr-3 text-primary-600" />
                                   Basic HTML Example
                              </h2>
                              <button onClick={() => copyCode(basicExample, "basic")} className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                   {copiedCode === "basic" ? <Check className="w-4 h-4 text-green-600 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                   {copiedCode === "basic" ? "Copied!" : "Copy Code"}
                              </button>
                         </div>

                         <p className="text-gray-600 mb-4">This example shows how to create a simple canvas with basic shapes:</p>

                         <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-green-400 text-sm">
                                   <code>{basicExample}</code>
                              </pre>
                         </div>

                         <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-medium text-gray-900 mb-2">What this code does:</h3>
                              <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                                   <li>Loads the Ximler WebAssembly module</li>
                                   <li>Creates an engine instance and initializes it</li>
                                   <li>Connects the engine to an HTML canvas element</li>
                                   <li>Creates three different shapes (rectangle, circle, line)</li>
                                   <li>Renders all shapes to the canvas</li>
                              </ol>
                         </div>
                    </div>

                    {/* React Example */}
                    <div className="card mb-8">
                         <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                   <Code className="w-6 h-6 mr-3 text-primary-600" />
                                   React Integration
                              </h2>
                              <button onClick={() => copyCode(reactExample, "react")} className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                   {copiedCode === "react" ? <Check className="w-4 h-4 text-green-600 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                   {copiedCode === "react" ? "Copied!" : "Copy Code"}
                              </button>
                         </div>

                         <p className="text-gray-600 mb-4">Here's how to integrate Ximler with React:</p>

                         <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-green-400 text-sm">
                                   <code>{reactExample}</code>
                              </pre>
                         </div>

                         <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-medium text-gray-900 mb-2">Key points:</h3>
                              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                   <li>
                                        Use <code className="bg-gray-100 px-1 rounded">useRef</code> to reference the canvas element
                                   </li>
                                   <li>
                                        Initialize the engine in <code className="bg-gray-100 px-1 rounded">useEffect</code>
                                   </li>
                                   <li>Store the engine instance in a ref for later use</li>
                                   <li>Call engine methods from event handlers</li>
                              </ul>
                         </div>
                    </div>

                    {/* Running the Examples */}
                    <div className="card mb-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-4">Running the Examples</h2>

                         <div className="space-y-4">
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">1. Start a Local Server</h3>
                                   <p className="text-gray-600 mb-2">WebAssembly requires files to be served over HTTP/HTTPS. Start a local server:</p>
                                   <div className="bg-gray-900 rounded-lg p-4">
                                        <pre className="text-green-400 text-sm">
                                             <code># Using Python python3 -m http.server 8000 # Using Node.js npx serve . -p 8000 # Using PHP php -S localhost:8000</code>
                                        </pre>
                                   </div>
                              </div>

                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">2. Open in Browser</h3>
                                   <p className="text-gray-600 mb-2">Navigate to your HTML file in the browser:</p>
                                   <div className="bg-gray-100 rounded-lg p-4">
                                        <code className="text-gray-800">http://localhost:8000/your-file.html</code>
                                   </div>
                              </div>

                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">3. Check Console</h3>
                                   <p className="text-gray-600">Open browser developer tools (F12) and check the console for any errors. You should see shapes rendered on the canvas.</p>
                              </div>
                         </div>
                    </div>

                    {/* Next Steps */}
                    <div className="card bg-primary-50 border-primary-200">
                         <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                         <p className="text-gray-700 mb-4">Now that you have Ximler running, explore these resources:</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Link href="/docs/api/core" className="p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                                   <h3 className="font-medium text-gray-900 mb-1">API Reference</h3>
                                   <p className="text-sm text-gray-600">Complete API documentation</p>
                              </Link>
                              <Link href="/docs/examples/basic" className="p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                                   <h3 className="font-medium text-gray-900 mb-1">More Examples</h3>
                                   <p className="text-sm text-gray-600">Advanced examples and tutorials</p>
                              </Link>
                              <Link href="/docs/integration/react" className="p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                                   <h3 className="font-medium text-gray-900 mb-1">Framework Integration</h3>
                                   <p className="text-sm text-gray-600">React, Vue, Angular guides</p>
                              </Link>
                              <Link href="/demo" className="p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                                   <h3 className="font-medium text-gray-900 mb-1">Live Demo</h3>
                                   <p className="text-sm text-gray-600">Try interactive features</p>
                              </Link>
                         </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                         <Link href="/docs/installation" className="btn-secondary flex-1 text-center">
                              ← Installation Guide
                         </Link>
                         <Link href="/docs/api/core" className="btn-primary flex-1 text-center">
                              API Reference →
                         </Link>
                    </div>
               </div>
          </div>
     );
}
