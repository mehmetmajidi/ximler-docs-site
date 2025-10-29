"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
     const pathname = usePathname();
     const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

     const navItems = [
          { href: "/docs", label: "Getting Started" },
          { href: "/docs/installation", label: "Installation" },
          { href: "/docs/quick-start", label: "Quick Start" },
     ];

     const apiItems = [
          { href: "/docs/api/map-tile-manager", label: "MapTileManager" }, //DONE
     ];

     const featuresItems = [
          { href: "/docs/features/map-panning", label: "Map Panning" }, //DONE
          { href: "/docs/features/map-zoom", label: "Map Zoom" }, //DONE
          { href: "/docs/features/map-caching", label: "Map Caching" }, //DONE
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

     const isActive = (path: string) => {
          return pathname === path;
     };

     const isParentActive = (items: { href: string; label: string }[]) => {
          return items.some((item) => pathname === item.href);
     };

     // Initialize open sections based on active path
     useEffect(() => {
          const sections: Record<string, boolean> = {};

          if (isParentActive(apiItems)) sections["api"] = true;
          if (isParentActive(featuresItems)) sections["features"] = true;
          if (isParentActive(examplesItems)) sections["examples"] = true;
          if (isParentActive(integrationItems)) sections["integration"] = true;
          if (isParentActive(demoItems)) sections["demos"] = true;

          setOpenSections(sections);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [pathname]);

     const toggleSection = (sectionKey: string) => {
          setOpenSections((prev) => {
               const newState: Record<string, boolean> = {};
               // اگر section در حال باز است، ببندش، در غیر این صورت آن را باز کن و بقیه را ببند
               if (!prev[sectionKey]) {
                    newState[sectionKey] = true;
               }
               return newState;
          });
     };

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
                              <button
                                   onClick={() => toggleSection("api")}
                                   className={`w-full flex items-center justify-between text-sm font-medium mb-2 px-3 py-2 rounded-md transition-colors ${
                                        isParentActive(apiItems) ? "text-blue-700 hover:bg-blue-50" : "text-gray-900 hover:bg-gray-100"
                                   }`}
                              >
                                   <span>API Reference</span>
                                   {openSections["api"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              {openSections["api"] && (
                                   <div className="ml-2 space-y-1">
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
                              )}
                         </div>

                         {/* Features Section */}
                         <div className="pt-4">
                              <button
                                   onClick={() => toggleSection("features")}
                                   className={`w-full flex items-center justify-between text-sm font-medium mb-2 px-3 py-2 rounded-md transition-colors ${
                                        isParentActive(featuresItems) ? "text-blue-700 hover:bg-blue-50" : "text-gray-900 hover:bg-gray-100"
                                   }`}
                              >
                                   <span>Features</span>
                                   {openSections["features"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              {openSections["features"] && (
                                   <div className="ml-2 space-y-1">
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
                              )}
                         </div>

                         {/* Examples Section */}
                         <div className="pt-4">
                              <button
                                   onClick={() => toggleSection("examples")}
                                   className={`w-full flex items-center justify-between text-sm font-medium mb-2 px-3 py-2 rounded-md transition-colors ${
                                        isParentActive(examplesItems) ? "text-blue-700 hover:bg-blue-50" : "text-gray-900 hover:bg-gray-100"
                                   }`}
                              >
                                   <span>Examples</span>
                                   {openSections["examples"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              {openSections["examples"] && (
                                   <div className="ml-2 space-y-1">
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
                              )}
                         </div>

                         {/* Integration Section */}
                         <div className="pt-4">
                              <button
                                   onClick={() => toggleSection("integration")}
                                   className={`w-full flex items-center justify-between text-sm font-medium mb-2 px-3 py-2 rounded-md transition-colors ${
                                        isParentActive(integrationItems) ? "text-blue-700 hover:bg-blue-50" : "text-gray-900 hover:bg-gray-100"
                                   }`}
                              >
                                   <span>Integration</span>
                                   {openSections["integration"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              {openSections["integration"] && (
                                   <div className="ml-2 space-y-1">
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
                              )}
                         </div>

                         {/* Demos Section */}
                         <div className="pt-4">
                              <button
                                   onClick={() => toggleSection("demos")}
                                   className={`w-full flex items-center justify-between text-sm font-medium mb-2 px-3 py-2 rounded-md transition-colors ${
                                        isParentActive(demoItems) ? "text-blue-700 hover:bg-blue-50" : "text-gray-900 hover:bg-gray-100"
                                   }`}
                              >
                                   <span>Demos</span>
                                   {openSections["demos"] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              </button>
                              {openSections["demos"] && (
                                   <div className="ml-2 space-y-1">
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
                              )}
                         </div>
                    </nav>
               </div>
          </aside>
     );
}
