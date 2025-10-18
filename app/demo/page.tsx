"use client";

import Link from "next/link";
import { ArrowLeft, Play, Code, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
     const [copiedCode, setCopiedCode] = useState(false);

     const copyCode = () => {
          navigator.clipboard.writeText(demoCode);
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
     };

     const demoCode = `<!DOCTYPE html>
<html>
<head>
    <title>Ximler Demo</title>
    <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; }
        .toolbar { margin-bottom: 20px; }
        .toolbar button { margin-right: 10px; padding: 8px 16px; }
        canvas { border: 1px solid #ccc; cursor: crosshair; }
        .info { margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Ximler Demo</h1>
        
        <div class="toolbar">
            <button onclick="setTool('rectangle')">Rectangle</button>
            <button onclick="setTool('circle')">Circle</button>
            <button onclick="setTool('line')">Line</button>
            <button onclick="setTool('ellipse')">Ellipse</button>
            <button onclick="clearCanvas()">Clear</button>
        </div>
        
        <canvas id="canvas" width="800" height="600"></canvas>
        
        <div class="info">
            <h3>Instructions:</h3>
            <ul>
                <li>Select a tool from the toolbar</li>
                <li>Click and drag on the canvas to create shapes</li>
                <li>Use Clear to remove all shapes</li>
            </ul>
            <p><strong>Shapes created:</strong> <span id="shapeCount">0</span></p>
        </div>
    </div>

    <script type="module">
        let engine;
        let currentTool = 'rectangle';
        let isDrawing = false;
        let startX, startY;
        let shapeCount = 0;

        async function initCanvas() {
            try {
                // Load Ximler
                const Module = await import('./ximler.js');
                const XimlerModule = Module.default;
                engine = new XimlerModule.XimlerModule();
                
                // Get canvas element
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                
                // Initialize engine
                engine.initialize(canvas.width, canvas.height);
                engine.canvas = canvas;
                engine.ctx = ctx;
                
                // Set up mouse events
                canvas.addEventListener('mousedown', handleMouseDown);
                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseup', handleMouseUp);
                
                console.log('Ximler initialized successfully');
            } catch (error) {
                console.error('Failed to initialize Ximler:', error);
                document.getElementById('canvas').style.background = '#ffebee';
                document.querySelector('.info').innerHTML = 
                    '<h3 style="color: red;">Error Loading Ximler</h3>' +
                    '<p>Make sure ximler.js and ximler.wasm are in the same directory.</p>';
            }
        }

        function setTool(tool) {
            currentTool = tool;
            document.querySelectorAll('.toolbar button').forEach(btn => {
                btn.style.backgroundColor = '';
            });
            event.target.style.backgroundColor = '#007bff';
            event.target.style.color = 'white';
        }

        function handleMouseDown(e) {
            isDrawing = true;
            const rect = e.target.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        }

        function handleMouseMove(e) {
            if (!isDrawing) return;
            
            const rect = e.target.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            // Clear and redraw
            engine.clearCanvas();
            
            // Redraw existing shapes
            const shapes = engine.getAllShapes();
            shapes.forEach(shape => {
                engine.addShape(shape.type, shape.x, shape.y, shape.width, shape.height);
            });
            
            // Add preview shape
            engine.addShape(currentTool, startX, startY, currentX - startX, currentY - startY);
            engine.render();
        }

        function handleMouseUp(e) {
            if (!isDrawing) return;
            
            isDrawing = false;
            const rect = e.target.getBoundingClientRect();
            const endX = e.clientX - rect.left;
            const endY = e.clientY - rect.top;
            
            // Add final shape
            engine.addShape(currentTool, startX, startY, endX - startX, endY - startY);
            engine.render();
            
            // Update shape count
            shapeCount++;
            document.getElementById('shapeCount').textContent = shapeCount;
        }

        function clearCanvas() {
            engine.clearCanvas();
            shapeCount = 0;
            document.getElementById('shapeCount').textContent = shapeCount;
        }

        // Initialize when page loads
        initCanvas();
    </script>
</body>
</html>`;

     return (
          <div className="min-h-screen bg-gray-50">
               <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="mb-8">
                         <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                              <ArrowLeft className="w-4 h-4 mr-2" />
                              Back to Home
                         </Link>
                         <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Demo</h1>
                         <p className="text-xl text-gray-600">Try Ximler in action with this interactive demo.</p>
                    </div>

                    {/* Demo Instructions */}
                    <div className="card mb-8 bg-blue-50 border-blue-200">
                         <div className="flex items-center mb-4">
                              <Play className="w-6 h-6 text-blue-600 mr-3" />
                              <h2 className="text-xl font-semibold text-gray-900">How to Run the Demo</h2>
                         </div>
                         <div className="space-y-4">
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">1. Download the Demo</h3>
                                   <p className="text-gray-700 mb-2">
                                        Copy the code below and save it as <code className="bg-gray-100 px-2 py-1 rounded">demo.html</code>
                                   </p>
                              </div>
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">2. Place WebAssembly Files</h3>
                                   <p className="text-gray-700 mb-2">
                                        Make sure <code className="bg-gray-100 px-2 py-1 rounded">ximler.js</code> and
                                        <code className="bg-gray-100 px-2 py-1 rounded">ximler.wasm</code> are in the same directory
                                   </p>
                              </div>
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">3. Start a Local Server</h3>
                                   <p className="text-gray-700 mb-2">WebAssembly requires HTTP/HTTPS. Start a local server:</p>
                                   <div className="bg-gray-900 rounded-lg p-4">
                                        <pre className="text-green-400 text-sm">
                                             <code>python3 -m http.server 8000</code>
                                        </pre>
                                   </div>
                              </div>
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">4. Open in Browser</h3>
                                   <p className="text-gray-700">
                                        Navigate to <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000/demo.html</code>
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Demo Code */}
                    <div className="card mb-8">
                         <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                   <Code className="w-6 h-6 mr-3 text-primary-600" />
                                   Demo Code
                              </h2>
                              <button onClick={copyCode} className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                   {copiedCode ? <Check className="w-4 h-4 text-green-600 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                   {copiedCode ? "Copied!" : "Copy Code"}
                              </button>
                         </div>

                         <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-green-400 text-sm">
                                   <code>{demoCode}</code>
                              </pre>
                         </div>
                    </div>

                    {/* Features Demonstrated */}
                    <div className="card mb-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-6">Features Demonstrated</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                   <h3 className="font-semibold text-gray-900 mb-3">Shape Creation</h3>
                                   <ul className="space-y-2 text-gray-600">
                                        <li>• Rectangle drawing</li>
                                        <li>• Circle creation</li>
                                        <li>• Line drawing</li>
                                        <li>• Ellipse shapes</li>
                                   </ul>
                              </div>
                              <div>
                                   <h3 className="font-semibold text-gray-900 mb-3">Interactive Features</h3>
                                   <ul className="space-y-2 text-gray-600">
                                        <li>• Real-time preview</li>
                                        <li>• Mouse event handling</li>
                                        <li>• Canvas clearing</li>
                                        <li>• Shape counting</li>
                                   </ul>
                              </div>
                              <div>
                                   <h3 className="font-semibold text-gray-900 mb-3">WebAssembly Integration</h3>
                                   <ul className="space-y-2 text-gray-600">
                                        <li>• Module loading</li>
                                        <li>• Engine initialization</li>
                                        <li>• Canvas context binding</li>
                                        <li>• Error handling</li>
                                   </ul>
                              </div>
                              <div>
                                   <h3 className="font-semibold text-gray-900 mb-3">User Interface</h3>
                                   <ul className="space-y-2 text-gray-600">
                                        <li>• Tool selection</li>
                                        <li>• Visual feedback</li>
                                        <li>• Status information</li>
                                        <li>• Responsive design</li>
                                   </ul>
                              </div>
                         </div>
                    </div>

                    {/* Troubleshooting */}
                    <div className="card mb-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
                         <div className="space-y-4">
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">Canvas appears red</h3>
                                   <p className="text-gray-600 text-sm">
                                        This indicates the WebAssembly files couldn't be loaded. Check that
                                        <code className="bg-gray-100 px-1 rounded">ximler.js</code> and
                                        <code className="bg-gray-100 px-1 rounded">ximler.wasm</code> are in the same directory as your HTML file.
                                   </p>
                              </div>
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">Shapes not appearing</h3>
                                   <p className="text-gray-600 text-sm">Make sure you're serving the files over HTTP/HTTPS, not opening the HTML file directly in the browser.</p>
                              </div>
                              <div>
                                   <h3 className="font-medium text-gray-900 mb-2">Console errors</h3>
                                   <p className="text-gray-600 text-sm">
                                        Open browser developer tools (F12) and check the console for detailed error messages. Common issues include CORS errors or missing WebAssembly support.
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Next Steps */}
                    <div className="card bg-primary-50 border-primary-200">
                         <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                         <p className="text-gray-700 mb-4">Now that you've seen Ximler in action, explore these resources:</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Link href="/docs/quick-start" className="p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors">
                                   <h3 className="font-medium text-gray-900 mb-1">Quick Start Guide</h3>
                                   <p className="text-sm text-gray-600">Learn the basics step by step</p>
                              </Link>
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
                         </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                         <Link href="/docs" className="btn-secondary flex-1 text-center">
                              ← Documentation
                         </Link>
                         <Link href="/docs/quick-start" className="btn-primary flex-1 text-center">
                              Quick Start Guide →
                         </Link>
                    </div>
               </div>
          </div>
     );
}
