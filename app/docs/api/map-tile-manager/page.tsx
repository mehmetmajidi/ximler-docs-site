"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, Database, Map, Settings, Layers, Zap } from "lucide-react";

export default function MapTileManagerPage() {
     const [activeSection, setActiveSection] = useState("overview");

     const sections = [
          { id: "overview", label: "Overview" },
          { id: "provider", label: "Provider Management" },
          { id: "tiles", label: "Tile Operations" },
          { id: "cache", label: "Cache Management" },
          { id: "coordinates", label: "Coordinate Conversion" },
          { id: "callbacks", label: "Event Callbacks" },
     ];

     return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               {/* Header */}
               <div className="mb-8">
                    <Link href="/docs/api/map" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                         <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                         Back to Map Engine API
                    </Link>
                    <div className="flex items-center mb-4">
                         <Database className="w-8 h-8 text-blue-600 mr-3" />
                         <h1 className="text-4xl font-bold text-gray-900">MapTileManager</h1>
                    </div>
                    <p className="text-xl text-gray-600">Complete API reference for managing map tiles, caching, and coordinate conversions</p>
               </div>

               {/* Quick Info */}
               <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                    <div className="flex items-start space-x-4">
                         <Code className="w-6 h-6 text-blue-600 mt-1" />
                         <div>
                              <h2 className="text-lg font-semibold text-gray-900 mb-2">C++ Class</h2>
                              <p className="text-gray-700 mb-3">
                                   <code className="bg-white px-2 py-1 rounded text-sm">MapEngine::Core::MapTileManager</code>
                              </p>
                              <p className="text-sm text-gray-600">
                                   Handles loading, caching, and rendering of map tiles from various providers including OpenStreetMap, Google Maps, Bing Maps, and custom providers.
                              </p>
                         </div>
                    </div>
               </div>

               {/* Navigation Tabs */}
               <div className="mb-8">
                    <nav className="border-b border-gray-200">
                         <div className="flex space-x-8 overflow-x-auto">
                              {sections.map((section) => (
                                   <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                             activeSection === section.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                   >
                                        {section.label}
                                   </button>
                              ))}
                         </div>
                    </nav>
               </div>

               {/* Overview Section */}
               {activeSection === "overview" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <p className="text-gray-700 mb-4">
                                        <code className="bg-gray-100 px-2 py-1 rounded">MapTileManager</code> is the core class responsible for managing map tiles in XIMLER. It provides a
                                        comprehensive interface for:
                                   </p>
                                   <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Loading tiles from multiple providers (OpenStreetMap, Google Maps, Bing Maps, Custom)</li>
                                        <li>Intelligent LRU-based memory caching for fast tile access</li>
                                        <li>Coordinate conversion between geographic coordinates and tile coordinates</li>
                                        <li>Tile URL generation for different map providers</li>
                                        <li>Event callbacks for tile loading and errors</li>
                                        <li>Cache statistics and management</li>
                                   </ul>
                              </div>
                         </div>

                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Class Structure</h2>
                              <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                                   <pre className="text-green-400">
                                        {`namespace MapEngine::Core {

enum class TileProvider {
    OPENSTREETMAP,
    GOOGLE_MAPS,
    BING_MAPS,
    CUSTOM
};

struct TileData {
    int x, y, zoom;
    std::string url;
    bool loaded;
    bool loading;
    std::string imageData;
    double timestamp;
};

class MapTileManager {
public:
    // Constructor
    MapTileManager();
    
    // Provider configuration
    void setProvider(TileProvider provider);
    TileProvider getProvider() const;
    
    // Tile operations
    void loadTile(int x, int y, int zoom);
    TileData* getTile(int x, int y, int zoom);
    
    // Cache management
    void clearCache();
    int getCacheTileCount() const;
    
    // And more...
};
}`}
                                   </pre>
                              </div>
                         </div>

                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                   <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <Map className="w-6 h-6 text-blue-600 mb-3" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Providers</h3>
                                        <p className="text-gray-600">Support for OpenStreetMap, Google Maps, Bing Maps, and custom tile providers with API key management.</p>
                                   </div>
                                   <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <Zap className="w-6 h-6 text-yellow-600 mb-3" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">LRU Caching</h3>
                                        <p className="text-gray-600">Intelligent Least Recently Used cache algorithm for optimal memory management and fast tile access.</p>
                                   </div>
                                   <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <Layers className="w-6 h-6 text-green-600 mb-3" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coordinate Conversion</h3>
                                        <p className="text-gray-600">Convert between geographic coordinates (lat/lng) and tile coordinates (x/y/zoom).</p>
                                   </div>
                                   <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <Settings className="w-6 h-6 text-purple-600 mb-3" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Configuration</h3>
                                        <p className="text-gray-600">Configurable tile size, zoom levels, cache size, and coordinate systems.</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Provider Management Section */}
               {activeSection === "provider" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Provider Management</h2>
                              <p className="text-gray-600 mb-6">Configure and manage different map tile providers including OpenStreetMap, Google Maps, Bing Maps, and custom providers.</p>

                              {/* setProvider */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <div className="flex items-start justify-between mb-4">
                                        <div>
                                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">setProvider(TileProvider provider)</code>
                                             </h3>
                                             <p className="text-gray-600">Set the tile provider for map tiles.</p>
                                        </div>
                                   </div>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`// Set provider type
manager.setProvider(TileProvider::OPENSTREETMAP);
manager.setProvider(TileProvider::GOOGLE_MAPS);
manager.setProvider(TileProvider::BING_MAPS);
manager.setProvider(TileProvider::CUSTOM);`}
                                        </pre>
                                   </div>
                                   <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                                        <p className="text-sm text-gray-700">
                                             <strong>Note:</strong> Changing the provider will update the URL template and attribution automatically.
                                        </p>
                                   </div>
                              </div>

                              {/* getProvider */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">TileProvider getProvider() const</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Get the current tile provider.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`TileProvider provider = manager.getProvider();
if (provider == TileProvider::OPENSTREETMAP) {
    // Handle OpenStreetMap
}`}
                                        </pre>
                                   </div>
                              </div>

                              {/* setCustomProvider */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">setCustomProvider(const std::string& urlTemplate)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">
                                        Set a custom tile provider with a URL template. Use placeholders <code className="bg-gray-100 px-1 rounded">{"{x}"}</code>,{" "}
                                        <code className="bg-gray-100 px-1 rounded">{"{y}"}</code>, <code className="bg-gray-100 px-1 rounded">{"{z}"}</code> for tile coordinates.
                                   </p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`// Custom provider URL template
manager.setCustomProvider("https://example.com/tiles/{z}/{x}/{y}.png");

// Template placeholders:
// {x} - tile X coordinate
// {y} - tile Y coordinate  
// {z} - zoom level
// {quadkey} - Bing Maps quad key (for Bing provider)
// {s} - subdomain (for load balancing)`}
                                        </pre>
                                   </div>
                              </div>

                              {/* API Key Management */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">API Key Management</h3>
                                   <div className="space-y-4">
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">setGoogleMapsApiKey(const std::string& apiKey)</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Set Google Maps API key for accessing Google Maps tiles.</p>
                                             <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                                  <pre className="text-green-400">{`manager.setGoogleMapsApiKey("YOUR_GOOGLE_API_KEY");`}</pre>
                                             </div>
                                        </div>
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">setBingMapsApiKey(const std::string& apiKey)</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Set Bing Maps API key for accessing Bing Maps tiles.</p>
                                             <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                                  <pre className="text-green-400">{`manager.setBingMapsApiKey("YOUR_BING_API_KEY");`}</pre>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Tile Operations Section */}
               {activeSection === "tiles" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tile Operations</h2>
                              <p className="text-gray-600 mb-6">Load, retrieve, and manage individual map tiles.</p>

                              {/* loadTile */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void loadTile(int x, int y, int zoom)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Load a specific tile by its tile coordinates. The tile will be fetched from the network and cached.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`// Load a specific tile
int tileX = 301;
int tileY = 384;
int zoom = 10;

manager.loadTile(tileX, tileY, zoom);`}
                                        </pre>
                                   </div>
                              </div>

                              {/* getTile */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">TileData* getTile(int x, int y, int zoom)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">
                                        Retrieve a tile from cache. Returns <code className="bg-gray-100 px-1 rounded">nullptr</code> if the tile is not cached.
                                   </p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`TileData* tile = manager.getTile(tileX, tileY, zoom);
if (tile && tile->loaded) {
    // Tile is available and loaded
    std::string url = tile->url;
    std::string imageData = tile->imageData;
}
`}
                                        </pre>
                                   </div>
                                   <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                                        <p className="text-sm text-gray-700">
                                             <strong>Note:</strong> This method updates the tile's last accessed timestamp for LRU cache management.
                                        </p>
                                   </div>
                              </div>

                              {/* loadVisibleTiles */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void loadVisibleTiles()</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Load all tiles visible in the current viewport based on the set center, zoom, and viewport size.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`// Set viewport and load visible tiles
manager.setCenter(40.7128, -74.0060);  // NYC
manager.setZoom(10);
manager.setViewport(Rectangle(0, 0, 800, 600));
manager.loadVisibleTiles();  // Loads all visible tiles`}
                                        </pre>
                                   </div>
                              </div>

                              {/* isTileLoaded / isTileLoading */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Tile Status Checks</h3>
                                   <div className="space-y-4">
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">bool isTileLoaded(int x, int y, int zoom) const</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Check if a tile is fully loaded and ready to use.</p>
                                        </div>
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">bool isTileLoading(int x, int y, int zoom) const</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Check if a tile is currently being loaded from the network.</p>
                                        </div>
                                        <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                             <pre className="text-green-400">
                                                  {`if (manager.isTileLoading(tileX, tileY, zoom)) {
    // Tile is being downloaded
} else if (manager.isTileLoaded(tileX, tileY, zoom)) {
    // Tile is ready
} else {
    // Tile needs to be loaded
    manager.loadTile(tileX, tileY, zoom);
}`}
                                             </pre>
                                        </div>
                                   </div>
                              </div>

                              {/* generateTileUrl */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">std::string generateTileUrl(int x, int y, int zoom) const</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Generate the URL for a specific tile based on the current provider configuration.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`std::string url = manager.generateTileUrl(301, 384, 10);
// Returns: "https://tile.openstreetmap.org/10/301/384.png"
// (depending on provider)`}
                                        </pre>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Cache Management Section */}
               {activeSection === "cache" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cache Management</h2>
                              <p className="text-gray-600 mb-6">Manage the LRU-based memory cache for optimal performance and memory usage.</p>

                              {/* clearCache */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void clearCache()</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Clear all cached tiles from memory. This does not affect IndexedDB cache.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`// Clear all cached tiles
manager.clearCache();`}
                                        </pre>
                                   </div>
                              </div>

                              {/* setCacheSize */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void setCacheSize(int maxTiles)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">
                                        Set the maximum number of tiles to keep in memory cache. When the limit is reached, LRU eviction removes the least recently used tiles.
                                   </p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`// Set cache size to 100 tiles (default)
manager.setCacheSize(100);

// Increase cache for more tiles
manager.setCacheSize(200);`}
                                        </pre>
                                   </div>
                                   <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                                        <p className="text-sm text-gray-700">
                                             <strong>Warning:</strong> Larger cache sizes use more memory. Balance between performance and memory usage.
                                        </p>
                                   </div>
                              </div>

                              {/* getCacheTileCount */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">int getCacheTileCount() const</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Get the current number of tiles in the cache.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`int count = manager.getCacheTileCount();
std::cout << "Cached tiles: " << count << std::endl;`}
                                        </pre>
                                   </div>
                              </div>

                              {/* cleanupCache */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void cleanupCache()</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Manually trigger cache cleanup. This will remove tiles exceeding the cache size limit using LRU eviction.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`// Force cache cleanup
manager.cleanupCache();`}
                                        </pre>
                                   </div>
                              </div>

                              {/* getStats */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Cache Statistics</h3>
                                   <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                             <code className="text-blue-600">TileStats getStats() const</code>
                                        </h4>
                                        <p className="text-gray-600 mb-4">Get comprehensive cache and tile loading statistics.</p>
                                        <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                             <pre className="text-green-400">
                                                  {`TileStats stats = manager.getStats();

// Stats structure:
struct TileStats {
    int totalTiles;        // Total tiles in cache + loading
    int loadedTiles;       // Tiles fully loaded
    int loadingTiles;     // Tiles currently loading
    int cacheHits;        // Cache hits count
    int cacheMisses;      // Cache misses count
    double cacheHitRate;  // Hit rate percentage
};

std::cout << "Cache hits: " << stats.cacheHits << std::endl;
std::cout << "Hit rate: " << stats.cacheHitRate << "%" << std::endl;`}
                                             </pre>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Coordinate Conversion Section */}
               {activeSection === "coordinates" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coordinate Conversion</h2>
                              <p className="text-gray-600 mb-6">Convert between geographic coordinates (latitude/longitude) and tile coordinates (x/y/zoom).</p>

                              {/* geoToTile */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">Vector2D geoToTile(double lat, double lng, int zoom) const</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Convert geographic coordinates (latitude, longitude) to tile coordinates (x, y) at a specific zoom level.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`// Convert NYC coordinates to tile coordinates
Vector2D tileCoords = manager.geoToTile(40.7128, -74.0060, 10);
double tileX = tileCoords.x;  // e.g., 301.5
double tileY = tileCoords.y;   // e.g., 384.2

// Get integer tile coordinates
int tileXInt = static_cast<int>(std::floor(tileX));
int tileYInt = static_cast<int>(std::floor(tileY));`}
                                        </pre>
                                   </div>
                              </div>

                              {/* tileToGeo */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">GeoCoordinate tileToGeo(int x, int y, int zoom) const</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Convert tile coordinates (x, y) at a zoom level to geographic coordinates (latitude, longitude).</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`// Convert tile coordinates to geographic coordinates
GeoCoordinate geo = manager.tileToGeo(301, 384, 10);
double lat = geo.latitude;   // e.g., 40.7128
double lng = geo.longitude; // e.g., -74.0060`}
                                        </pre>
                                   </div>
                              </div>

                              {/* QuadKey Conversion */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Bing Maps QuadKey Conversion</h3>
                                   <div className="space-y-4">
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">std::string tileToQuadKey(int x, int y, int zoom) const</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Convert tile coordinates to Bing Maps quad key format.</p>
                                        </div>
                                        <div>
                                             <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                  <code className="text-blue-600">void quadKeyToTile(const std::string& quadKey, int& x, int& y, int& zoom) const</code>
                                             </h4>
                                             <p className="text-gray-600 mb-2">Convert Bing Maps quad key back to tile coordinates.</p>
                                        </div>
                                        <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                             <pre className="text-green-400">
                                                  {`// Convert to QuadKey for Bing Maps
std::string quadKey = manager.tileToQuadKey(301, 384, 10);
// Returns: "03201023223000331001" (example)

// Convert back
int x, y, zoom;
manager.quadKeyToTile(quadKey, x, y, zoom);
// x = 301, y = 384, zoom = 10`}
                                             </pre>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Event Callbacks Section */}
               {activeSection === "callbacks" && (
                    <div className="space-y-8">
                         <div>
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Callbacks</h2>
                              <p className="text-gray-600 mb-6">Register callbacks to be notified when tiles are loaded or encounter errors.</p>

                              {/* setTileLoadedCallback */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void setTileLoadedCallback(std::function&lt;void(const TileData&)&gt; callback)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Set a callback function that will be called when a tile finishes loading.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto mb-4">
                                        <pre className="text-green-400">
                                             {`manager.setTileLoadedCallback([](const TileData& tile) {
    std::cout << "Tile loaded: " << tile.x << "," << tile.y 
              << " at zoom " << tile.zoom << std::endl;
    
    // Tile is now ready to use
    if (tile.loaded) {
        // Render tile image
        renderTile(tile.imageData);
    }
});`}
                                        </pre>
                                   </div>
                              </div>

                              {/* setTileErrorCallback */}
                              <div className="bg-white rounded-lg border border-gray-200 p-6">
                                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        <code className="text-blue-600">void setTileErrorCallback(std::function&lt;void(const TileData&, const std::string&)&gt; callback)</code>
                                   </h3>
                                   <p className="text-gray-600 mb-4">Set a callback function that will be called when a tile fails to load.</p>
                                   <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                                        <pre className="text-green-400">
                                             {`manager.setTileErrorCallback([](const TileData& tile, const std::string& error) {
    std::cerr << "Error loading tile " << tile.x << "," << tile.y 
              << ": " << error << std::endl;
    
    // Handle error (e.g., retry, show placeholder)
    handleTileError(tile, error);
});`}
                                        </pre>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {/* Configuration Methods */}
               <div className="mt-12 bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Methods</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                         <div>
                              <code className="text-blue-600">setTileSize(int size)</code>
                              <p className="text-gray-600 text-xs mt-1">Set tile size in pixels (default: 256)</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setMinZoom(int zoom)</code>
                              <p className="text-gray-600 text-xs mt-1">Set minimum zoom level (default: 0)</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setMaxZoom(int zoom)</code>
                              <p className="text-gray-600 text-xs mt-1">Set maximum zoom level (default: 19)</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setCenter(double lat, double lng)</code>
                              <p className="text-gray-600 text-xs mt-1">Set map center coordinates</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setZoom(int zoom)</code>
                              <p className="text-gray-600 text-xs mt-1">Set current zoom level</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setViewport(const Rectangle& viewport)</code>
                              <p className="text-gray-600 text-xs mt-1">Set viewport rectangle</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setCoordinateSystem(const MapCoordinateSystem&)</code>
                              <p className="text-gray-600 text-xs mt-1">Set coordinate system configuration</p>
                         </div>
                         <div>
                              <code className="text-blue-600">setAttribution(const std::string&)</code>
                              <p className="text-gray-600 text-xs mt-1">Set attribution text for map provider</p>
                         </div>
                    </div>
               </div>

               {/* Usage Example */}
               <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Usage Example</h2>
                    <div className="bg-gray-900 rounded-lg p-6 text-sm overflow-x-auto">
                         <pre className="text-green-400 text-xs">
                              {`#include "map_tile_manager.h"
using namespace MapEngine::Core;

// Create manager
MapTileManager manager;

// Configure provider
manager.setProvider(TileProvider::OPENSTREETMAP);
manager.setCenter(40.7128, -74.0060);  // NYC
manager.setZoom(10);
manager.setCacheSize(100);

// Set up callbacks
manager.setTileLoadedCallback([](const TileData& tile) {
    std::cout << "Tile loaded: " << tile.url << std::endl;
});

// Load visible tiles
manager.setViewport(Rectangle(0, 0, 800, 600));
manager.loadVisibleTiles();

// Get specific tile
TileData* tile = manager.getTile(301, 384, 10);
if (tile && tile->loaded) {
    // Use tile data
    renderTile(tile->imageData);
}

// Get statistics
TileStats stats = manager.getStats();
std::cout << "Cache hit rate: " << stats.cacheHitRate << "%" << std::endl;`}
                         </pre>
                    </div>
               </div>

               {/* CTA */}
               <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to use MapTileManager?</h2>
                    <p className="text-blue-100 mb-6">Check out the map caching documentation for integration examples</p>
                    <Link href="/docs/features/map-caching" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                         View Map Caching →
                    </Link>
               </div>
          </div>
     );
}
