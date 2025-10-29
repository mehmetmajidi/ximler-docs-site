"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, Search, Zap, Globe, MapPin } from "lucide-react";

export default function MapGeocodingPage() {
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
                         <Search className="w-8 h-8 text-green-600 mr-3" />
                         <h1 className="text-4xl font-bold text-gray-900">Map Geocoding</h1>
                    </div>
                    <p className="text-xl text-gray-600">Search for locations by name and navigate to them on the map using OpenStreetMap Nominatim API</p>
               </div>

               {/* Overview */}
               <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                    <p className="text-gray-700 mb-4">
                         Map geocoding allows users to search for locations by city name, country, or any address query. The system uses OpenStreetMap's Nominatim API to convert location names into
                         geographic coordinates, then automatically centers the map on the found location.
                    </p>
                    <div className="flex items-start space-x-4 text-sm text-gray-600">
                         <div className="flex items-center">
                              <Zap className="w-4 h-4 mr-2 text-green-600" />
                              Real-time location search
                         </div>
                         <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-green-600" />
                              Automatic map navigation
                         </div>
                         <div className="flex items-center">
                              <Code className="w-4 h-4 mr-2 text-green-600" />
                              Promise-based API
                         </div>
                    </div>
               </div>

               {/* How It Works */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Location Query</h3>
                              <p className="text-gray-600">User enters a location name (city, country, address) in the search box.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Geocoding Request</h3>
                              <p className="text-gray-600">
                                   The system sends an HTTP request to OpenStreetMap Nominatim API with the query, which returns geographic coordinates (latitude/longitude) and display name.
                              </p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. JSON Parsing</h3>
                              <p className="text-gray-600">The response JSON is parsed in C++ to extract latitude, longitude, and display name.</p>
                         </div>
                         <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Map Navigation</h3>
                              <p className="text-gray-600">The map center is automatically updated to the found location, and the map is re-rendered with new tiles.</p>
                         </div>
                    </div>
               </div>

               {/* API Usage */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Usage</h2>
                    <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                         <pre className="text-green-400">
                              {`// Search for a location
const result = await engine.searchLocation("New York");

// Returns Promise with:
// {
//   latitude: 40.7128,
//   longitude: -74.0060,
//   displayName: "New York, United States"
// }

// Set callbacks for async geocoding
engine.setGeocodeSuccessCallback((result) => {
     console.log("Found:", result.latitude, result.longitude);
     // Automatically centers map on result
});

engine.setGeocodeErrorCallback((error) => {
     console.error("Search failed:", error);
});

// Trigger search
engine.searchLocation("Paris");`}
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
                                             {`import { useState, useCallback } from 'react';
import { useCanvasEngine } from './hooks/useCanvasEngine';

function MapComponent() {
     const { searchLocation, setMapCenter, renderMap } = useCanvasEngine();
     const [query, setQuery] = useState('');
     const [isSearching, setIsSearching] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const handleSearch = useCallback(async () => {
          if (!query.trim()) return;
          
          setIsSearching(true);
          setError(null);
          
          try {
               const result = await searchLocation(query);
               console.log('Found location:', result);
               
               // Map is automatically centered by searchLocation
               // Optionally update center manually
               setMapCenter(result.latitude, result.longitude);
               renderMap();
          } catch (err) {
               setError(err instanceof Error ? err.message : 'Search failed');
          } finally {
               setIsSearching(false);
          }
     }, [query, searchLocation, setMapCenter, renderMap]);

     return (
          <div>
               <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search city or country..."
               />
               <button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
               </button>
               {error && <div className="error">{error}</div>}
               <canvas ref={canvasRef} />
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
                                             {`'use client';

import { useState, useCallback } from 'react';
import { useCanvasEngine } from '@/hooks/useCanvasEngine';

export default function MapPage() {
     const { searchLocation, renderMap } = useCanvasEngine();
     const [query, setQuery] = useState('');
     const [isSearching, setIsSearching] = useState(false);

     const handleSearch = useCallback(async (searchQuery: string) => {
          if (!searchQuery.trim()) return;
          
          setIsSearching(true);
          
          try {
               const result = await searchLocation(searchQuery);
               console.log('Location found:', result);
               
               // Map automatically centers on result
               setTimeout(() => renderMap(), 100);
          } catch (error) {
               console.error('Search failed:', error);
          } finally {
               setIsSearching(false);
          }
     }, [searchLocation, renderMap]);

     return (
          <div className="relative">
               <div className="absolute top-4 left-4 z-50">
                    <input
                         type="text"
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                         placeholder="Search city or country..."
                         className="px-4 py-2 border rounded-lg"
                    />
                    <button
                         onClick={() => handleSearch(query)}
                         disabled={isSearching}
                         className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                         {isSearching ? 'Searching...' : 'Search'}
                    </button>
               </div>
               <canvas ref={canvasRef} />
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
          <div class="search-container">
               <input
                    v-model="query"
                    @keydown.enter="handleSearch"
                    placeholder="Search city or country..."
               />
               <button @click="handleSearch" :disabled="isSearching">
                    {{ isSearching ? 'Searching...' : 'Search' }}
               </button>
          </div>
          <canvas ref="canvasRef"></canvas>
     </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCanvasEngine } from './composables/useCanvasEngine';

const { searchLocation, renderMap } = useCanvasEngine();
const query = ref('');
const isSearching = ref(false);

const handleSearch = async () => {
     if (!query.value.trim()) return;
     
     isSearching.value = true;
     
     try {
          const result = await searchLocation(query.value);
          console.log('Found:', result);
          
          // Map automatically centers on result
          setTimeout(() => renderMap(), 100);
     } catch (error) {
          console.error('Search failed:', error);
     } finally {
          isSearching.value = false;
     }
};
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
import { CanvasEngineService } from './services/canvas-engine.service';

@Component({
     selector: 'app-map',
     template: \`
          <div>
               <input
                    [(ngModel)]="query"
                    (keydown.enter)="handleSearch()"
                    placeholder="Search city or country..."
               />
               <button (click)="handleSearch()" [disabled]="isSearching">
                    {{ isSearching ? 'Searching...' : 'Search' }}
               </button>
               <canvas #canvas></canvas>
          </div>
     \`
})
export class MapComponent {
     query = '';
     isSearching = false;

     constructor(private engineService: CanvasEngineService) {}

     async handleSearch() {
          if (!this.query.trim()) return;
          
          this.isSearching = true;
          
          try {
               const result = await this.engineService.searchLocation(this.query);
               console.log('Found:', result);
               
               // Map automatically centers on result
               setTimeout(() => this.engineService.renderMap(), 100);
          } catch (error) {
               console.error('Search failed:', error);
          } finally {
               this.isSearching = false;
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
                                             {`// Initialize engine
const Module = await XimlerModule();
const engine = new Module.CanvasEngineModule();

// Set up success callback
engine.setGeocodeSuccessCallback((result) => {
     console.log('Location found:', result);
     console.log('Latitude:', result.latitude);
     console.log('Longitude:', result.longitude);
     console.log('Name:', result.displayName);
     
     // Map is automatically centered on result
     engine.renderMap();
});

// Set up error callback
engine.setGeocodeErrorCallback((error) => {
     console.error('Search failed:', error);
});

// Handle search
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let isSearching = false;

searchButton.addEventListener('click', async () => {
     const query = searchInput.value.trim();
     if (!query || isSearching) return;
     
     isSearching = true;
     searchButton.disabled = true;
     searchButton.textContent = 'Searching...';
     
     try {
          engine.searchLocation(query);
          // Result will come via callback
     } catch (error) {
          console.error('Search error:', error);
     } finally {
          setTimeout(() => {
               isSearching = false;
               searchButton.disabled = false;
               searchButton.textContent = 'Search';
          }, 1000);
     }
});

// Or use Promise-based approach if your hook supports it
async function searchWithPromise(query) {
     // This requires a wrapper that converts callbacks to promises
     return new Promise((resolve, reject) => {
          engine.setGeocodeSuccessCallback(resolve);
          engine.setGeocodeErrorCallback(reject);
          engine.searchLocation(query);
     });
}`}
                                        </pre>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>

               {/* Key Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                         <div className="flex items-start">
                              <div className="flex-shrink-0">
                                   <Globe className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="ml-4">
                                   <h3 className="text-lg font-semibold text-gray-900">OpenStreetMap Integration</h3>
                                   <p className="text-gray-600">Uses OpenStreetMap's Nominatim API for accurate, free geocoding without API keys.</p>
                              </div>
                         </div>
                         <div className="flex items-start">
                              <div className="flex-shrink-0">
                                   <Search className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="ml-4">
                                   <h3 className="text-lg font-semibold text-gray-900">Flexible Search</h3>
                                   <p className="text-gray-600">Search by city name, country, address, or any location query that Nominatim understands.</p>
                              </div>
                         </div>
                         <div className="flex items-start">
                              <div className="flex-shrink-0">
                                   <MapPin className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="ml-4">
                                   <h3 className="text-lg font-semibold text-gray-900">Automatic Navigation</h3>
                                   <p className="text-gray-600">Found locations automatically center the map and trigger re-rendering.</p>
                              </div>
                         </div>
                         <div className="flex items-start">
                              <div className="flex-shrink-0">
                                   <Code className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="ml-4">
                                   <h3 className="text-lg font-semibold text-gray-900">Promise-Based API</h3>
                                   <p className="text-gray-600">Modern async/await support with error handling built-in.</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Best Practices */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 space-y-4">
                         <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Input Validation</h3>
                              <p className="text-gray-700">Always validate search queries before sending them to avoid empty or invalid requests.</p>
                         </div>
                         <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Loading States</h3>
                              <p className="text-gray-700">Display loading indicators during search to improve user experience.</p>
                         </div>
                         <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Error Handling</h3>
                              <p className="text-gray-700">Implement proper error handling for network failures or location not found scenarios.</p>
                         </div>
                         <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Debouncing</h3>
                              <p className="text-gray-700">Consider debouncing search inputs if implementing real-time search suggestions.</p>
                         </div>
                         <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Rate Limiting</h3>
                              <p className="text-gray-700">Nominatim API has rate limits - implement proper request throttling for production use.</p>
                         </div>
                    </div>
               </div>

               {/* Related Features */}
               <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Features</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                         <Link href="/docs/features/map-panning" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <h3 className="font-semibold text-gray-900 mb-2">Map Panning</h3>
                              <p className="text-sm text-gray-600">Navigate the map by dragging</p>
                         </Link>
                         <Link href="/docs/features/map-zoom" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <h3 className="font-semibold text-gray-900 mb-2">Map Zoom</h3>
                              <p className="text-sm text-gray-600">Zoom in and out of locations</p>
                         </Link>
                         <Link href="/docs/features/map-caching" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                              <h3 className="font-semibold text-gray-900 mb-2">Map Caching</h3>
                              <p className="text-sm text-gray-600">Cache tiles for performance</p>
                         </Link>
                    </div>
               </div>
          </div>
     );
}
