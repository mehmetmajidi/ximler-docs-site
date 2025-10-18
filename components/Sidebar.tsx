"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
     const pathname = usePathname();

     const isActive = (path: string) => {
          return pathname === path;
     };

     const isParentActive = (items: { href: string; label: string }[]) => {
          return items.some((item) => pathname === item.href);
     };

     const navItems = [
          { href: "/docs", label: "Getting Started" },
          { href: "/docs/installation", label: "Installation" },
          { href: "/docs/quick-start", label: "Quick Start" },
     ];

     const apiItems = [
          { href: "/docs/api/core", label: "Core Engine" },
          { href: "/docs/api/shapes", label: "Shape Management" },
          { href: "/docs/api/rendering", label: "Rendering" },
          { href: "/docs/api/map", label: "Map Engine" },
          { href: "/docs/api/isometric", label: "3D Isometric" },
     ];

     const featuresItems = [
          { href: "/docs/features/rendering", label: "Advanced Rendering" },
          { href: "/docs/features/grid", label: "Architectural Grid" },
          { href: "/docs/features/view", label: "View Controller" },
          { href: "/docs/features/performance", label: "Performance" },
     ];

     const examplesItems = [
          { href: "/docs/examples/basic", label: "Basic Examples" },
          { href: "/docs/examples/interactive", label: "Interactive Examples" },
          { href: "/docs/examples/frameworks", label: "Framework Integration" },
          { href: "/docs/examples/applications", label: "Real-World Apps" },
     ];

     const integrationItems = [
          { href: "/docs/integration/react", label: "React" },
          { href: "/docs/integration/vue", label: "Vue.js" },
          { href: "/docs/integration/angular", label: "Angular" },
          { href: "/docs/integration/nextjs", label: "Next.js" },
     ];

     const frameworkItems = [
          { href: "/docs/react", label: "React" },
          { href: "/docs/vue", label: "Vue.js" },
          { href: "/docs/angular", label: "Angular" },
          { href: "/docs/nextjs", label: "Next.js" },
          { href: "/docs/vanilla", label: "Vanilla JS" },
     ];

     const demoItems = [
          { href: "/demo", label: "Interactive Demo" },
          { href: "/docs/examples", label: "Examples" },
     ];

     return (
          <aside className="w-64 bg-white shadow-lg h-full overflow-hidden">
               <div className="p-6 h-full flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
                    <nav className="space-y-2 flex-1 overflow-y-auto">
                         {/* Main Navigation */}
                         {navItems.map((item) => (
                              <Link
                                   key={item.href}
                                   href={item.href}
                                   className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                        isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                                   }`}
                              >
                                   {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                   {item.label}
                              </Link>
                         ))}

                         {/* API Reference Section */}
                         <div className="pt-4">
                              <h3 className={`text-sm font-medium mb-2 ${isParentActive(apiItems) ? "text-blue-700" : "text-gray-900"}`}>API Reference</h3>
                              {apiItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                             isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                   >
                                        {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {/* Features Section */}
                         <div className="pt-4">
                              <h3 className={`text-sm font-medium mb-2 ${isParentActive(featuresItems) ? "text-blue-700" : "text-gray-900"}`}>Features</h3>
                              {featuresItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                             isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                   >
                                        {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {/* Examples Section */}
                         <div className="pt-4">
                              <h3 className={`text-sm font-medium mb-2 ${isParentActive(examplesItems) ? "text-blue-700" : "text-gray-900"}`}>Examples</h3>
                              {examplesItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                             isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                   >
                                        {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {/* Integration Section */}
                         <div className="pt-4">
                              <h3 className={`text-sm font-medium mb-2 ${isParentActive(integrationItems) ? "text-blue-700" : "text-gray-900"}`}>Integration</h3>
                              {integrationItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                             isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                   >
                                        {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {/* Demos Section */}
                         <div className="pt-4">
                              <h3 className={`text-sm font-medium mb-2 ${isParentActive(demoItems) ? "text-blue-700" : "text-gray-900"}`}>Demos</h3>
                              {demoItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-3 py-2 text-sm rounded-md transition-colors relative ${
                                             isActive(item.href) ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                   >
                                        {isActive(item.href) && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>}
                                        {item.label}
                                   </Link>
                              ))}
                         </div>
                    </nav>
               </div>
          </aside>
     );
}
