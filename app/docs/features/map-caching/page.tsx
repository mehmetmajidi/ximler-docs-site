"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, Database, Zap, Globe, HardDrive } from "lucide-react";

export default function MapCachingPage() {
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
                         <Database className="w-8 h-8 text-green-600 mr-3" />
                         <h1 className="text-4xl font-bold text-gray-900">Map Tile Caching</h1>
                    </div>
                    <p className="text-xl text-gray-600">Intelligent dual-layer caching system for lightning-fast map tile loading and offline access</p>
               </div>

               {/* Overview */}
               <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                    <p className="text-gray-700 mb-4">
                         XIMLER implements a sophisticated dual-layer caching system that dramatically improves map performance. The system combines memory cache (C++) for session-based fast access
                         and IndexedDB (JavaScript) for persistent storage across browser sessions. This ensures tiles load instantly on subsequent visits and works offline for previously viewed
                         areas.
                    </p>
                    <div className="flex items-start space-x-4 text-sm text-gray-600">
                         <div className="flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-green-600" />
                              Instant tile loading
                         </div>
                         <div className="flex items-center">
                              <Database className="w-4 h-4 mr-2 text-green-600" />
                              Persistent storage
                         </div>
                         <div className="flex items-center">
                              <Code className="w-4 h-4 mr-2 text-green-600" />
                              Automatic & transparent
                         </div>
                    </div>
               </div>

               {/* How It Works */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Memory Cache (C++ Layer)</h3>
                              <p className="text-gray-600 mb-2">
                                   Fast in-memory LRU (Least Recently Used) cache that stores the most recently accessed tiles during the current session. This provides instant access to tiles that
                                   have been loaded in the current browser session.
                              </p>
                              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                                   <li>Stores up to 100 tiles by default</li>
                                   <li>LRU eviction policy for memory management</li>
                                   <li>Automatic cache updates on tile access</li>
                              </ul>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. IndexedDB Cache (JavaScript Layer)</h3>
                              <p className="text-gray-600 mb-2">
                                   Persistent browser storage that saves tiles to disk, allowing them to persist across browser sessions. This enables offline map viewing for previously visited areas
                                   and eliminates redundant network requests.
                              </p>
                              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                                   <li>Stored locally in user's browser data directory</li>
                                   <li>Survives browser restarts and system reboots</li>
                                   <li>Transparent to developers - works automatically</li>
                              </ul>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Cache Lookup Flow</h3>
                              <p className="text-gray-600">
                                   When a tile is requested, the system first checks memory cache (fastest), then IndexedDB (fast), and finally makes a network request only if the tile isn't cached.
                                   Newly downloaded tiles are automatically stored in both caches.
                              </p>
                         </div>
                    </div>
               </div>

               {/* Cache Flow Diagram */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Cache Lookup Flow</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                         <div className="flex flex-col space-y-4">
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                   <div className="flex items-center">
                                        <Globe className="w-5 h-5 text-green-600 mr-3" />
                                        <span className="font-semibold text-gray-900">1. Tile Request</span>
                                   </div>
                              </div>
                              <div className="flex justify-center">
                                   <ArrowRight className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                   <div className="flex items-center">
                                        <Zap className="w-5 h-5 text-blue-600 mr-3" />
                                        <span className="font-semibold text-gray-900">2. Check Memory Cache (C++)</span>
                                   </div>
                                   <p className="text-sm text-gray-600 mt-2 ml-8">If found → Return instantly</p>
                              </div>
                              <div className="flex justify-center">
                                   <ArrowRight className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                   <div className="flex items-center">
                                        <Database className="w-5 h-5 text-purple-600 mr-3" />
                                        <span className="font-semibold text-gray-900">3. Check IndexedDB Cache</span>
                                   </div>
                                   <p className="text-sm text-gray-600 mt-2 ml-8">If found → Load from disk, update memory cache</p>
                              </div>
                              <div className="flex justify-center">
                                   <ArrowRight className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                   <div className="flex items-center">
                                        <HardDrive className="w-5 h-5 text-orange-600 mr-3" />
                                        <span className="font-semibold text-gray-900">4. Network Request</span>
                                   </div>
                                   <p className="text-sm text-gray-600 mt-2 ml-8">If not cached → Download, save to both caches</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* API Usage */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Usage</h2>
                    <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto mb-4">
                         <pre className="text-green-400">
                              {`// Caching is automatic - no code needed!
// Tiles are automatically cached when loaded

// Optional: Clear memory cache
engine.clearMapCache();

// Optional: Get cache statistics
const stats = engine.getCacheStats();
// Returns: { memoryCacheSize, indexedDBCount, hitRate }
`}
                         </pre>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                         <p className="text-sm text-gray-700">
                              <strong>Note:</strong> Caching works automatically in the background. You typically don't need to interact with the cache API unless you want to clear it or check
                              statistics.
                         </p>
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
                                             activeTab === tab.id ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                                             {`import { useCanvasEngine } from './hooks/useCanvasEngine';

function MapComponent() {
     const { renderMap, clearMapCache, getTileUrl } = useCanvasEngine();

     // Caching is automatic!
     // Just render the map - tiles will be cached automatically
     const handleRenderMap = () => {
          renderMap(); // Tiles cached automatically
     };

     // Optional: Clear cache when needed
     const handleClearCache = () => {
          clearMapCache(); // Clears both memory and IndexedDB cache
     };

     return (
          <div>
               <button onClick={handleRenderMap}>
                    Render Map (Auto-Cached)
               </button>
               <button onClick={handleClearCache}>
                    Clear Cache
               </button>
          </div>
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
                                             {`// app/map/page.tsx
'use client';

import { useCanvasEngine } from '@/hooks/useCanvasEngine';

export default function MapPage() {
     const { 
          renderMap, 
          setMapCenter, 
          setMapZoom,
          clearMapCache 
     } = useCanvasEngine();

     // Caching is fully automatic
     // No additional code needed!
     
     const initializeMap = () => {
          setMapCenter(40.7128, -74.0060); // NYC
          setMapZoom(10);
          renderMap(); // First render downloads tiles
          // Subsequent renders use cached tiles automatically!
     };

     return (
          <div>
               <button onClick={initializeMap}>
                    Load Map (Auto-Cached)
               </button>
               <button onClick={clearMapCache}>
                    Clear All Cache
               </button>
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
     <div>
          <button @click="renderMap">
               Render Map (Auto-Cached)
          </button>
          <button @click="clearCache">
               Clear Cache
          </button>
     </div>
</template>

<script setup lang="ts">
import { useCanvasEngine } from './composables/useCanvasEngine';

const { renderMap, clearMapCache } = useCanvasEngine();

// Caching happens automatically!
// Tiles are cached on first load
// and reused on subsequent renders

function clearCache() {
     clearMapCache(); // Clear both caches
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
                                             {`import { Component } from '@angular/core';

@Component({
     selector: 'app-map',
     template: \`
          <div>
               <button (click)="renderMap()">
                    Render Map (Auto-Cached)
               </button>
               <button (click)="clearCache()">
                    Clear Cache
               </button>
          </div>
     \`
})
export class MapComponent {
     // Caching is automatic!
     // Just use the engine normally
     
     renderMap() {
          this.engine.renderMap(); 
          // Tiles cached automatically
     }

     clearCache() {
          this.engine.clearMapCache(); 
          // Clears both caches
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
                                             {`// Caching is fully automatic!
// Just render the map as normal

const canvas = document.getElementById('myCanvas');
const engine = new CanvasEngineModule('my-app');

// First render downloads and caches tiles
engine.setMapCenter(40.7128, -74.0060);
engine.setMapZoom(10);
engine.renderMap();

// Subsequent renders use cached tiles automatically
// No additional code needed!

// Optional: Clear cache
function clearCache() {
     engine.clearMapCache(); 
     // Clears both memory and IndexedDB cache
}

// Optional: Check cache status
const stats = engine.getCacheStats();
console.log('Memory cache:', stats.memoryCacheSize);
console.log('IndexedDB cache:', stats.indexedDBCount);`}
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
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dual-Layer Architecture</h3>
                              <p className="text-gray-600">Combines fast memory cache for active session and persistent IndexedDB for cross-session storage.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">LRU Eviction</h3>
                              <p className="text-gray-600">Intelligent Least Recently Used algorithm automatically manages memory, keeping frequently accessed tiles available.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Offline Support</h3>
                              <p className="text-gray-600">Previously viewed map areas work offline thanks to persistent IndexedDB storage.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Management</h3>
                              <p className="text-gray-600">Zero configuration required - caching works transparently in the background without any developer intervention.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bandwidth Savings</h3>
                              <p className="text-gray-600">Eliminates redundant network requests by reusing cached tiles, reducing bandwidth usage significantly.</p>
                         </div>
                         <div className="bg-white rounded-lg border border-gray-200 p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Boost</h3>
                              <p className="text-gray-600">Cached tiles load instantly, providing smooth map navigation and zoom interactions.</p>
                         </div>
                    </div>
               </div>

               {/* Best Practices */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-4">
                         <h3 className="text-xl font-semibold text-gray-900 mb-3">Cache Management</h3>
                         <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>
                                        <strong>Let it work automatically:</strong> The caching system is designed to work without intervention. Only clear cache when necessary (e.g., after major map
                                        updates).
                                   </span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>
                                        <strong>Clear cache strategically:</strong> Use <code className="bg-gray-100 px-1 rounded">clearMapCache()</code> to free up storage space if users report
                                        memory issues.
                                   </span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>
                                        <strong>Monitor cache size:</strong> For applications with heavy map usage, consider implementing periodic cache cleanup for very old tiles.
                                   </span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>
                                        <strong>Leverage offline capabilities:</strong> Inform users they can view previously visited areas offline thanks to IndexedDB caching.
                                   </span>
                              </li>
                         </ul>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                         <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Tips</h3>
                         <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>Cache works best when users frequently revisit the same areas - encourage focused map exploration for better cache hit rates.</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>First-time map loads will be slower as tiles download, but subsequent renders in the same session are nearly instant.</span>
                              </li>
                              <li className="flex items-start">
                                   <span className="mr-2">•</span>
                                   <span>The memory cache is limited to 100 tiles - ensure your map rendering doesn't exceed this for optimal performance.</span>
                              </li>
                         </ul>
                    </div>
               </div>

               {/* Storage Location */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Storage Details</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                         <h3 className="text-xl font-semibold text-gray-900 mb-3">Where Are Tiles Cached?</h3>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="font-semibold text-gray-800 mb-2">Memory Cache (C++)</h4>
                                   <p className="text-gray-600">Stored in RAM during the active browser session. Automatically cleared when the page/tab is closed.</p>
                              </div>
                              <div>
                                   <h4 className="font-semibold text-gray-800 mb-2">IndexedDB (JavaScript)</h4>
                                   <p className="text-gray-600 mb-2">Stored locally in the user's browser data directory:</p>
                                   <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                                        <li>
                                             <strong>Chrome/Edge:</strong> <code className="bg-gray-100 px-1 rounded">~/.config/google-chrome/Default/IndexedDB/</code>
                                        </li>
                                        <li>
                                             <strong>Firefox:</strong> <code className="bg-gray-100 px-1 rounded">~/.mozilla/firefox/[profile]/storage/</code>
                                        </li>
                                        <li>
                                             <strong>Safari:</strong> Stored in Safari's private data directory
                                        </li>
                                   </ul>
                                   <p className="text-gray-600 mt-2">Tiles persist across browser sessions and survive system reboots until manually cleared by the user or browser storage cleanup.</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* CTA */}
               <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to use intelligent caching?</h2>
                    <p className="text-green-100 mb-6">Caching works automatically - just render your map and enjoy instant tile loading!</p>
                    <Link href="/docs/examples" className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                         View Examples →
                    </Link>
               </div>
          </div>
     );
}
