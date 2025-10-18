"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

interface ConditionalLayoutProps {
     children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
     const pathname = usePathname();

     // Show sidebar only for documentation pages
     const showSidebar = pathname.startsWith("/docs") || pathname.startsWith("/demo");

     if (showSidebar) {
          return (
               <div className="flex pt-16 h-screen">
                    <Sidebar />
                    <main className="flex-1 p-8 overflow-y-auto">{children}</main>
               </div>
          );
     }

     // For other pages (home, pricing, etc.), show full width content
     return (
          <div className="pt-16">
               <main className="min-h-screen">{children}</main>
          </div>
     );
}
