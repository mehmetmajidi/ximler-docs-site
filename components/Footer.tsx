import Link from "next/link";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
     return (
          <footer className="bg-gray-900 text-white">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                         {/* Logo and Description */}
                         <div className="col-span-1 md:col-span-2">
                              <div className="flex items-center space-x-2 mb-4">
                                   <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-white" />
                                   </div>
                                   <span className="text-xl font-bold">Ximler</span>
                              </div>
                              <p className="text-gray-300 mb-4 max-w-md">High-performance canvas drawing engine powered by WebAssembly. Build interactive graphics applications with ease.</p>
                              <div className="flex space-x-4">
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Github className="w-5 h-5" />
                                   </a>
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                   </a>
                                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                   </a>
                              </div>
                         </div>

                         {/* Documentation */}
                         <div>
                              <h3 className="text-lg font-semibold mb-4">Documentation</h3>
                              <ul className="space-y-2">
                                   <li>
                                        <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                                             Getting Started
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="/docs/api" className="text-gray-300 hover:text-white transition-colors">
                                             API Reference
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="/docs/examples" className="text-gray-300 hover:text-white transition-colors">
                                             Examples
                                        </Link>
                                   </li>
                                   <li>
                                        <Link href="/docs/integration" className="text-gray-300 hover:text-white transition-colors">
                                             Integration
                                        </Link>
                                   </li>
                              </ul>
                         </div>

                         {/* Resources */}
                         <div>
                              <h3 className="text-lg font-semibold mb-4">Resources</h3>
                              <ul className="space-y-2">
                                   <li>
                                        <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
                                             Live Demo
                                        </Link>
                                   </li>
                                   <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                             GitHub Repository
                                        </a>
                                   </li>
                                   <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                             Changelog
                                        </a>
                                   </li>
                                   <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                             Support
                                        </a>
                                   </li>
                              </ul>
                         </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8">
                         <div className="flex flex-col md:flex-row justify-between items-center">
                              <p className="text-gray-400 text-sm">© 2024 Ximler. All rights reserved.</p>
                              <div className="flex space-x-6 mt-4 md:mt-0">
                                   <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Privacy Policy
                                   </a>
                                   <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Terms of Service
                                   </a>
                                   <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        License
                                   </a>
                              </div>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
