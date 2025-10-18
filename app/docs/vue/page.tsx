"use client";

import { useState } from "react";
import { Code, Copy, Check, Play } from "lucide-react";

export default function VuePage() {
     const [copiedCode, setCopiedCode] = useState<string | null>(null);

     const copyToClipboard = (code: string, id: string) => {
          navigator.clipboard.writeText(code);
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
     };

     const vueComposableCode = `import { ref, onMounted, computed } from 'vue';

export function useXimler() {
     const engine = ref(null);
     const isLoaded = ref(false);
     const canvasRef = ref(null);

     const loadEngine = async () => {
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
               engine.value = engineInstance;
               isLoaded.value = true;
          } catch (error) {
               console.error('Failed to load Ximler:', error);
          }
     };

     const initializeCanvas = (width, height) => {
          if (engine.value && canvasRef.value) {
               engine.value.initialize(width, height);
               engine.value.setCanvas(canvasRef.value);
          }
     };

     const addShape = (type, x, y, width, height) => {
          if (engine.value) {
               return engine.value.addShape(type, x, y, width, height);
          }
          return null;
     };

     const clearCanvas = () => {
          if (engine.value) {
               engine.value.clearCanvas();
          }
     };

     onMounted(() => {
          loadEngine();
     });

     return {
          engine,
          isLoaded,
          canvasRef,
          initializeCanvas,
          addShape,
          clearCanvas
     };
}`;

     const vueComponentCode = `<template>
  <div class="space-y-4">
    <div v-if="!isLoaded" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading Ximler...</p>
      </div>
    </div>

    <div v-else>
      <div class="flex gap-2 mb-4">
        <button 
          @click="currentTool = 'rectangle'"
          :class="[
            'px-4 py-2 rounded',
            currentTool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          ]"
        >
          Rectangle
        </button>
        <button 
          @click="currentTool = 'circle'"
          :class="[
            'px-4 py-2 rounded',
            currentTool === 'circle' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          ]"
        >
          Circle
        </button>
        <button 
          @click="clearCanvas"
          class="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>
      
      <canvas
        ref="canvasRef"
        :width="800"
        :height="600"
        class="border border-gray-300 rounded-lg shadow-sm cursor-crosshair"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useXimler } from './useXimler';

const { 
  engine, 
  isLoaded, 
  canvasRef, 
  initializeCanvas, 
  addShape, 
  clearCanvas 
} = useXimler();

const currentTool = ref('rectangle');
const isDrawing = ref(false);
const startPos = ref(null);

const handleMouseDown = (e) => {
  if (!isLoaded.value) return;
  
  const rect = canvasRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  isDrawing.value = true;
  startPos.value = { x, y };
};

const handleMouseUp = (e) => {
  if (!isDrawing.value || !startPos.value) return;
  
  const rect = canvasRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const width = Math.abs(x - startPos.value.x);
  const height = Math.abs(y - startPos.value.y);
  const shapeX = Math.min(x, startPos.value.x);
  const shapeY = Math.min(y, startPos.value.y);
  
  addShape(currentTool.value, shapeX, shapeY, width, height);
  
  isDrawing.value = false;
  startPos.value = null;
};

watch(isLoaded, (loaded) => {
  if (loaded && canvasRef.value) {
    const canvas = canvasRef.value;
    initializeCanvas(canvas.width, canvas.height);
  }
});
</script>`;

     const vueInstallationCode = `# Install Vue 3
npm install vue@next

# Or with Vite
npm create vue@latest my-vue-app
cd my-vue-app

# Copy Ximler files to public folder
cp ximler.js public/
cp ximler.wasm public/`;

     return (
          <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Vue.js Integration</h1>
                    <p className="text-xl text-gray-600">Learn how to integrate Ximler with Vue.js applications using Composition API</p>
               </div>

               <div className="space-y-8">
                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vue Composable</h2>
                         <p className="text-gray-600 mb-4">Create a Vue composable to manage Ximler engine state and operations.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(vueComposableCode, "vue-composable")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "vue-composable" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{vueComposableCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vue Component</h2>
                         <p className="text-gray-600 mb-4">A complete Vue component using Composition API with the custom composable.</p>

                         <div className="bg-gray-900 rounded-lg p-6 relative">
                              <button onClick={() => copyToClipboard(vueComponentCode, "vue-component")} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white">
                                   {copiedCode === "vue-component" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <pre className="text-green-400 text-sm overflow-x-auto">
                                   <code>{vueComponentCode}</code>
                              </pre>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
                         <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-green-900 mb-2">Setup Commands</h3>
                              <div className="bg-gray-900 rounded p-4 mb-4">
                                   <code className="text-green-400">{vueInstallationCode}</code>
                              </div>

                              <h3 className="text-lg font-semibold text-green-900 mb-2">Files Required</h3>
                              <ul className="list-disc list-inside text-green-800 space-y-1">
                                   <li>ximler.js</li>
                                   <li>ximler.wasm</li>
                              </ul>
                         </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Demo</h2>
                         <div className="bg-gray-100 rounded-lg p-6 text-center">
                              <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-4">Interactive Vue.js demo coming soon!</p>
                              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">View Demo</button>
                         </div>
                    </section>
               </div>
          </div>
     );
}
