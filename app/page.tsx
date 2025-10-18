import Link from "next/link";
import { ArrowRight, Play, Code, Zap, Palette, Globe, Star, Users, Download, Shield, Clock, Layers, Target, Award, CheckCircle, TrendingUp, Rocket } from "lucide-react";

export default function HomePage() {
     const structuredData = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Ximler",
          "description": "High-performance canvas drawing engine powered by WebAssembly for building interactive graphics applications",
          "url": "https://ximler.com",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web Browser",
          "offers": {
               "@type": "Offer",
               "price": "0",
               "priceCurrency": "USD",
               "description": "Free forever plan available"
          },
          "author": {
               "@type": "Organization",
               "name": "Ximler Team"
          },
          "programmingLanguage": ["JavaScript", "TypeScript", "C++", "WebAssembly"],
          "featureList": [
               "WebAssembly-powered performance",
               "Advanced graphics capabilities",
               "Framework agnostic",
               "TypeScript support",
               "Real-time rendering",
               "Interactive drawing tools",
               "3D isometric rendering",
               "Map integration",
               "Architectural grid system"
          ],
          "screenshot": "https://ximler.com/logo.svg",
          "softwareVersion": "2.0",
          "datePublished": "2024-01-01",
          "dateModified": "2024-01-15"
     };

     return (
          <>
               <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
               />
               <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
               
               {/* Hero Section */}
               <div className="relative overflow-hidden">
                    {/* Background Pattern */}
{/*                     <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
 */}                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                         <div className="text-center">
                              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                                   <Star className="w-4 h-4 mr-2" />
                                   Trusted by 10,000+ developers worldwide
                              </div>
                              
                              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                   High-Performance
                                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"> Canvas Engine</span>
                              </h1>
                              
                              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                                   Build stunning interactive graphics applications with <strong>Ximler</strong> - the only WebAssembly-powered canvas engine that delivers 
                                   <span className="text-blue-600 font-semibold"> near-native performance</span> in the browser
                              </p>
                              
                              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                   <Link href="/docs" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        <Code className="w-5 h-5 mr-2" />
                                        Get Started Free
                                   </Link>
                                   <Link href="/demo" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center hover:shadow-lg">
                                        <Play className="w-5 h-5 mr-2" />
                                        Try Live Demo
                                   </Link>
                              </div>
                              
                              {/* Trust Indicators */}
                              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
                                   <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        No credit card required
                                   </div>
                                   <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        Open source & MIT licensed
                                   </div>
                                   <div className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                        Enterprise ready
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Performance Stats */}
               <div className="py-16 bg-white border-y border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                              <div className="p-6">
                                   <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10x</div>
                                   <div className="text-gray-600 font-medium">Faster than JavaScript</div>
                              </div>
                              <div className="p-6">
                                   <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">99.9%</div>
                                   <div className="text-gray-600 font-medium">Browser Compatibility</div>
                              </div>
                              <div className="p-6">
                                   <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50ms</div>
                                   <div className="text-gray-600 font-medium">Average Load Time</div>
                              </div>
                              <div className="p-6">
                                   <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">2MB</div>
                                   <div className="text-gray-600 font-medium">Bundle Size</div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Features Section */}
               <div className="py-24 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Ximler?</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                   Built with cutting-edge web technologies for maximum performance, developer experience, and scalability
                              </p>
                         </div>
                         
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Zap className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">WebAssembly Powered</h3>
                                   <p className="text-gray-600 leading-relaxed">Near-native performance with C++ compiled to WebAssembly. Experience up to 10x faster rendering compared to traditional JavaScript canvas libraries.</p>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Palette className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Graphics</h3>
                                   <p className="text-gray-600 leading-relaxed">Rich graphics capabilities including gradients, patterns, filters, blend modes, and 3D isometric rendering for professional applications.</p>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Globe className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Framework Agnostic</h3>
                                   <p className="text-gray-600 leading-relaxed">Works seamlessly with React, Vue, Angular, Next.js, Svelte, and vanilla JavaScript. Choose your preferred framework.</p>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Code className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Integration</h3>
                                   <p className="text-gray-600 leading-relaxed">Simple API with comprehensive documentation, TypeScript support, and extensive examples to get you started quickly.</p>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Shield className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Production Ready</h3>
                                   <p className="text-gray-600 leading-relaxed">Battle-tested in real-world applications with enterprise-grade reliability, security, and performance optimizations.</p>
                              </div>
                              
                              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Users className="w-8 h-8 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Active Community</h3>
                                   <p className="text-gray-600 leading-relaxed">Join thousands of developers building amazing applications. Get help from our active community and expert team.</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Use Cases Section */}
               <div className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Perfect for Every Use Case</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                   From simple drawings to complex interactive applications, Ximler scales with your needs
                              </p>
                         </div>
                         
                         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                              <div className="text-center group">
                                   <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Layers className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Data Visualization</h3>
                                   <p className="text-gray-600">Create interactive charts, graphs, and dashboards with smooth animations and real-time updates.</p>
                              </div>
                              
                              <div className="text-center group">
                                   <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Design</h3>
                                   <p className="text-gray-600">Build design tools, editors, and creative applications with precision and performance.</p>
                              </div>
                              
                              <div className="text-center group">
                                   <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Globe className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Mapping & GIS</h3>
                                   <p className="text-gray-600">Develop geographic applications with coordinate systems, tile rendering, and spatial analysis.</p>
                              </div>
                              
                              <div className="text-center group">
                                   <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-10 h-10 text-white" />
                                   </div>
                                   <h3 className="text-xl font-bold text-gray-900 mb-3">Gaming & Animation</h3>
                                   <p className="text-gray-600">Create 2D games, animations, and interactive experiences with high frame rates and smooth performance.</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Technical Specifications */}
               <div className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Excellence</h2>
                              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                                   Built with modern web standards and optimized for performance
                              </p>
                         </div>
                         
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                   <Clock className="w-12 h-12 text-blue-400 mb-6" />
                                   <h3 className="text-xl font-bold mb-4">Performance Optimized</h3>
                                   <ul className="space-y-2 text-blue-100">
                                        <li>• WebAssembly for near-native speed</li>
                                        <li>• Hardware-accelerated rendering</li>
                                        <li>• Efficient memory management</li>
                                        <li>• Optimized for 60fps animations</li>
                                   </ul>
                              </div>
                              
                              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                   <Shield className="w-12 h-12 text-green-400 mb-6" />
                                   <h3 className="text-xl font-bold mb-4">Enterprise Ready</h3>
                                   <ul className="space-y-2 text-blue-100">
                                        <li>• TypeScript support</li>
                                        <li>• Comprehensive error handling</li>
                                        <li>• Security best practices</li>
                                        <li>• Production monitoring</li>
                                   </ul>
                              </div>
                              
                              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                   <TrendingUp className="w-12 h-12 text-purple-400 mb-6" />
                                   <h3 className="text-xl font-bold mb-4">Scalable Architecture</h3>
                                   <ul className="space-y-2 text-blue-100">
                                        <li>• Modular design</li>
                                        <li>• Plugin ecosystem</li>
                                        <li>• Custom extensions</li>
                                        <li>• Future-proof API</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Stats Section */}
               <div className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-20">
                              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted by Developers Worldwide</h2>
                              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                   Join the growing community of developers building amazing applications with Ximler
                              </p>
                         </div>
                         
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                              <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                                   <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50K+</div>
                                   <div className="text-gray-700 font-semibold">Downloads</div>
                                   <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
                              </div>
                              <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                                   <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">2.5K+</div>
                                   <div className="text-gray-700 font-semibold">Projects</div>
                                   <div className="text-sm text-gray-500 mt-1">Active repositories</div>
                              </div>
                              <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                                   <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">150+</div>
                                   <div className="text-gray-700 font-semibold">Contributors</div>
                                   <div className="text-sm text-gray-500 mt-1">Open source community</div>
                              </div>
                              <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                                   <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">99.9%</div>
                                   <div className="text-gray-700 font-semibold">Uptime</div>
                                   <div className="text-sm text-gray-500 mt-1">SLA guarantee</div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* CTA Section */}
               <div className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
{/*                     <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
 */}                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
                         <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                              Join thousands of developers who are already building incredible graphics applications with Ximler. 
                              Start your journey today and experience the power of WebAssembly graphics.
                         </p>
                         
                         <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                              <Link href="/docs" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                   <Rocket className="w-5 h-5 mr-2" />
                                   Start Building Now
                              </Link>
                              <Link href="/pricing" className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:shadow-xl">
                                   <Award className="w-5 h-5 mr-2" />
                                   View Pricing Plans
                              </Link>
                         </div>
                         
                         <div className="text-blue-100 text-sm">
                              <p>✨ Free forever plan available • 🚀 No setup fees • 💳 Cancel anytime</p>
                         </div>
                    </div>
               </div>

               {/* Footer */}
               <div className="bg-gray-900 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="grid md:grid-cols-4 gap-12">
                              <div className="md:col-span-2">
                                   <h3 className="text-2xl font-bold mb-6">Ximler</h3>
                                   <p className="text-gray-400 mb-6 leading-relaxed">
                                        High-performance canvas drawing engine powered by WebAssembly. 
                                        Build amazing interactive graphics applications with near-native performance in the browser.
                                   </p>
                                   <div className="flex space-x-4">
                                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                             <span className="sr-only">GitHub</span>
                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                             </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                             <span className="sr-only">Twitter</span>
                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                             </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                             <span className="sr-only">Discord</span>
                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                  <path d="M16.942 4.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.272.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-8.662zM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045z"/>
                                             </svg>
                                        </a>
                                   </div>
                              </div>
                              
                              <div>
                                   <h4 className="text-lg font-semibold text-gray-300 mb-6">Documentation</h4>
                                   <ul className="space-y-3">
                                        <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Getting Started</Link></li>
                                        <li><Link href="/docs/api" className="text-gray-400 hover:text-white transition-colors">API Reference</Link></li>
                                        <li><Link href="/docs/examples" className="text-gray-400 hover:text-white transition-colors">Examples</Link></li>
                                        <li><Link href="/docs/integration" className="text-gray-400 hover:text-white transition-colors">Framework Integration</Link></li>
                                   </ul>
                              </div>
                              
                              <div>
                                   <h4 className="text-lg font-semibold text-gray-300 mb-6">Resources</h4>
                                   <ul className="space-y-3">
                                        <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Live Demo</Link></li>
                                        <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
                                   </ul>
                              </div>
                         </div>
                         
                         <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                              <p className="text-gray-400">&copy; 2024 Ximler. All rights reserved.</p>
                              <div className="flex space-x-6 mt-4 md:mt-0">
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                              </div>
                         </div>
                    </div>
               </div>
               </div>
          </>
     );
}