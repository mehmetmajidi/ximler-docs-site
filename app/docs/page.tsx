import Link from "next/link";
import { BookOpen, Code, Zap, Palette, Globe, ArrowRight, Play } from "lucide-react";

export default function DocumentationPage() {
     return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               {/* Header */}
               <div className="mb-12">
                    <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                         <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                         Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
                    <p className="text-xl text-gray-600 max-w-3xl">Comprehensive guides, API reference, and examples to help you build amazing interactive graphics applications with Ximler.</p>
               </div>

               {/* Quick Links */}
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <Link href="/docs/installation" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                         <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                         <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation</h3>
                         <p className="text-gray-600">Get started with Ximler</p>
                    </Link>
                    <Link href="/docs/api" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                         <Code className="w-8 h-8 text-green-600 mb-4" />
                         <h3 className="text-lg font-semibold text-gray-900 mb-2">API Reference</h3>
                         <p className="text-gray-600">Complete API documentation</p>
                    </Link>
                    <Link href="/docs/examples" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                         <Palette className="w-8 h-8 text-purple-600 mb-4" />
                         <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
                         <p className="text-gray-600">Code examples and tutorials</p>
                    </Link>
                    <Link href="/demo" className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                         <Play className="w-8 h-8 text-orange-600 mb-4" />
                         <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Demo</h3>
                         <p className="text-gray-600">Try the engine in action</p>
                    </Link>
               </div>

               {/* Getting Started Section */}
               <div className="mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                         <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                   <BookOpen className="w-8 h-8 text-blue-600 mr-4" />
                                   <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
                                        <p className="text-gray-600">Learn the basics and get your first canvas application running</p>
                                   </div>
                              </div>
                              <Link href="/docs" className="text-blue-600 hover:text-blue-700 font-medium">
                                   View All →
                              </Link>
                         </div>
                         <div className="grid md:grid-cols-3 gap-6">
                              <Link href="/docs/installation" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation</h3>
                                   <p className="text-gray-600 mb-4">Set up Ximler in your project</p>
                                   <span className="text-blue-600 hover:text-blue-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/quick-start" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h3>
                                   <p className="text-gray-600 mb-4">Create your first canvas application</p>
                                   <span className="text-blue-600 hover:text-blue-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/basic-usage" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Usage</h3>
                                   <p className="text-gray-600 mb-4">Learn fundamental concepts</p>
                                   <span className="text-blue-600 hover:text-blue-700 font-medium">Read More →</span>
                              </Link>
                         </div>
                    </div>
               </div>

               {/* API Reference Section */}
               <div className="mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                         <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                   <Code className="w-8 h-8 text-green-600 mr-4" />
                                   <div>
                                        <h2 className="text-2xl font-bold text-gray-900">API Reference</h2>
                                        <p className="text-gray-600">Complete reference for all engine methods and properties</p>
                                   </div>
                              </div>
                              <Link href="/docs/api" className="text-green-600 hover:text-green-700 font-medium">
                                   View All →
                              </Link>
                         </div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <Link href="/docs/api/core" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Core Engine</h3>
                                   <p className="text-gray-600 mb-4">Main engine initialization and configuration</p>
                                   <span className="text-green-600 hover:text-green-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/api/shapes" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Shape Management</h3>
                                   <p className="text-gray-600 mb-4">Create and manipulate shapes</p>
                                   <span className="text-green-600 hover:text-green-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/api/rendering" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Rendering</h3>
                                   <p className="text-gray-600 mb-4">Advanced rendering techniques</p>
                                   <span className="text-green-600 hover:text-green-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/api/map" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Engine</h3>
                                   <p className="text-gray-600 mb-4">Geographic and coordinate systems</p>
                                   <span className="text-green-600 hover:text-green-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/api/isometric" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Isometric</h3>
                                   <p className="text-gray-600 mb-4">2.5D visualization and rendering</p>
                                   <span className="text-green-600 hover:text-green-700 font-medium">Read More →</span>
                              </Link>
                         </div>
                    </div>
               </div>

               {/* Features Section */}
               <div className="mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                         <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                   <Zap className="w-8 h-8 text-yellow-600 mr-4" />
                                   <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Features</h2>
                                        <p className="text-gray-600">Advanced capabilities and tools</p>
                                   </div>
                              </div>
                              <Link href="/docs/features" className="text-yellow-600 hover:text-yellow-700 font-medium">
                                   View All →
                              </Link>
                         </div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <Link href="/docs/features/rendering" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Rendering</h3>
                                   <p className="text-gray-600 mb-4">Gradients, patterns, and effects</p>
                                   <span className="text-yellow-600 hover:text-yellow-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/features/grid" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Architectural Grid</h3>
                                   <p className="text-gray-600 mb-4">Professional grid systems</p>
                                   <span className="text-yellow-600 hover:text-yellow-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/features/view" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">View Controller</h3>
                                   <p className="text-gray-600 mb-4">Camera and view management</p>
                                   <span className="text-yellow-600 hover:text-yellow-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/features/performance" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
                                   <p className="text-gray-600 mb-4">Optimization and best practices</p>
                                   <span className="text-yellow-600 hover:text-yellow-700 font-medium">Read More →</span>
                              </Link>
                         </div>
                    </div>
               </div>

               {/* Integration Section */}
               <div className="mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                         <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                   <Globe className="w-8 h-8 text-indigo-600 mr-4" />
                                   <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Framework Integration</h2>
                                        <p className="text-gray-600">Integrate Ximler with your favorite framework</p>
                                   </div>
                              </div>
                              <Link href="/docs/integration" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                   View All →
                              </Link>
                         </div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <Link href="/docs/integration/react" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">React</h3>
                                   <p className="text-gray-600 mb-4">React hooks and components</p>
                                   <span className="text-indigo-600 hover:text-indigo-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/integration/vue" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Vue.js</h3>
                                   <p className="text-gray-600 mb-4">Vue composables and directives</p>
                                   <span className="text-indigo-600 hover:text-indigo-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/integration/angular" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Angular</h3>
                                   <p className="text-gray-600 mb-4">Angular services and pipes</p>
                                   <span className="text-indigo-600 hover:text-indigo-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/integration/nextjs" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Next.js</h3>
                                   <p className="text-gray-600 mb-4">Next.js specific integration</p>
                                   <span className="text-indigo-600 hover:text-indigo-700 font-medium">Read More →</span>
                              </Link>
                         </div>
                    </div>
               </div>

               {/* Examples Section */}
               <div className="mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                         <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center">
                                   <Palette className="w-8 h-8 text-purple-600 mr-4" />
                                   <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Examples</h2>
                                        <p className="text-gray-600">Real-world applications and tutorials</p>
                                   </div>
                              </div>
                              <Link href="/docs/examples" className="text-purple-600 hover:text-purple-700 font-medium">
                                   View All →
                              </Link>
                         </div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              <Link href="/docs/examples/basic" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Examples</h3>
                                   <p className="text-gray-600 mb-4">Simple drawing and shapes</p>
                                   <span className="text-purple-600 hover:text-purple-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/examples/interactive" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Examples</h3>
                                   <p className="text-gray-600 mb-4">User interaction and events</p>
                                   <span className="text-purple-600 hover:text-purple-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/examples/frameworks" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Framework Integration</h3>
                                   <p className="text-gray-600 mb-4">Framework-specific examples</p>
                                   <span className="text-purple-600 hover:text-purple-700 font-medium">Read More →</span>
                              </Link>
                              <Link href="/docs/examples/applications" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-World Apps</h3>
                                   <p className="text-gray-600 mb-4">Complete application examples</p>
                                   <span className="text-purple-600 hover:text-purple-700 font-medium">Read More →</span>
                              </Link>
                         </div>
                    </div>
               </div>

               {/* Footer CTA */}
               <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                    <p className="text-blue-100 mb-6">Join thousands of developers building amazing graphics applications</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Link href="/docs/installation" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                              Get Started
                         </Link>
                         <Link href="/demo" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                              Try Demo
                         </Link>
                    </div>
               </div>
          </div>
     );
}
