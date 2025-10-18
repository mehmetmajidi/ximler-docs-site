"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, Code, Zap, Palette, Globe, ChevronDown, ChevronRight } from "lucide-react";

const navigation = [
     {
          name: "Getting Started",
          href: "/docs",
          icon: BookOpen,
          children: [
               { name: "Installation", href: "/docs/installation" },
               { name: "Quick Start", href: "/docs/quick-start" },
               { name: "Basic Usage", href: "/docs/basic-usage" },
          ],
     },
     {
          name: "API Reference",
          href: "/docs/api",
          icon: Code,
          children: [
               { name: "Core Engine", href: "/docs/api/core" },
               { name: "Shape Management", href: "/docs/api/shapes" },
               { name: "Rendering", href: "/docs/api/rendering" },
               { name: "Map Engine", href: "/docs/api/map" },
               { name: "3D Isometric", href: "/docs/api/isometric" },
          ],
     },
     {
          name: "Features",
          href: "/docs/features",
          icon: Zap,
          children: [
               { name: "Advanced Rendering", href: "/docs/features/rendering" },
               { name: "Architectural Grid", href: "/docs/features/grid" },
               { name: "View Controller", href: "/docs/features/view" },
               { name: "Performance", href: "/docs/features/performance" },
          ],
     },
     {
          name: "Examples",
          href: "/docs/examples",
          icon: Palette,
          children: [
               { name: "Basic Examples", href: "/docs/examples/basic" },
               { name: "Interactive Examples", href: "/docs/examples/interactive" },
               { name: "Framework Integration", href: "/docs/examples/frameworks" },
               { name: "Real-World Apps", href: "/docs/examples/applications" },
          ],
     },
     {
          name: "Integration",
          href: "/docs/integration",
          icon: Globe,
          children: [
               { name: "React", href: "/docs/integration/react" },
               { name: "Vue.js", href: "/docs/integration/vue" },
               { name: "Angular", href: "/docs/integration/angular" },
               { name: "Next.js", href: "/docs/integration/nextjs" },
          ],
     },
];

export default function Navigation() {
     const [isOpen, setIsOpen] = useState(false);
     const [expandedItems, setExpandedItems] = useState<string[]>([]);
     const pathname = usePathname();

     const toggleExpanded = (itemName: string) => {
          setExpandedItems((prev) => (prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName]));
     };

     return (
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
               <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                         {/* Logo */}
                         <Link href="/" className="flex items-center space-x-2">
                              <img src="/logo.svg" alt="Ximler Logo" className="h-8 w-auto" />
                         </Link>

                         {/* Desktop Navigation */}
                         <div className="hidden lg:flex items-center space-x-8">
                              <Link href="/docs" className="text-gray-700 hover:text-primary-600 transition-colors">
                                   Documentation
                              </Link>
                              <Link href="/demo" className="text-gray-700 hover:text-primary-600 transition-colors">
                                   Demos
                              </Link>
                              <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
                                   Pricing
                              </Link>
                              <Link href="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                                   Profile
                              </Link>
                         </div>

                         {/* Auth Buttons */}
                         <div className="hidden lg:flex items-center space-x-4">
                              <Link href="/auth" className="text-gray-700 hover:text-primary-600 transition-colors">
                                   Sign In
                              </Link>
                              <Link href="/demo" className="btn-primary">
                                   Try Demo
                              </Link>
                         </div>

                         {/* Mobile menu button */}
                         <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100">
                              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                         <div className="lg:hidden border-t border-gray-200 py-4">
                              <div className="space-y-2">
                                   <Link href="/docs" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                        Documentation
                                   </Link>
                                   <Link href="/demo" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                        Demos
                                   </Link>
                                   <Link href="/pricing" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                        Pricing
                                   </Link>
                                   <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                        Profile
                                   </Link>
                                   <div className="pt-4 border-t border-gray-200 space-y-2">
                                        <Link href="/auth" className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                             Sign In
                                        </Link>
                                        <Link href="/demo" className="btn-primary w-full text-center block" onClick={() => setIsOpen(false)}>
                                             Try Demo
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
          </nav>
     );
}
