import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
     title: "Ximler - High-Performance Canvas Engine | WebAssembly Graphics",
     description:
          "Build stunning interactive graphics applications with Ximler - the only WebAssembly-powered canvas engine delivering near-native performance. Perfect for data visualization, gaming, mapping, and design tools.",
     keywords: [
          "canvas engine",
          "webassembly",
          "wasm",
          "graphics",
          "drawing",
          "interactive",
          "performance",
          "javascript",
          "typescript",
          "react",
          "vue",
          "angular",
          "nextjs",
          "data visualization",
          "gaming",
          "mapping",
          "design tools",
          "ximler",
     ],
     authors: [{ name: "Ximler Team" }],
     creator: "Ximler",
     publisher: "Ximler",
     robots: {
          index: true,
          follow: true,
          googleBot: {
               index: true,
               follow: true,
               "max-video-preview": -1,
               "max-image-preview": "large",
               "max-snippet": -1,
          },
     },
     icons: {
          icon: "/favicon.svg",
          shortcut: "/favicon.svg",
          apple: "/favicon.svg",
     },
     openGraph: {
          title: "Ximler - High-Performance Canvas Engine | WebAssembly Graphics",
          description: "Build stunning interactive graphics applications with Ximler - the only WebAssembly-powered canvas engine delivering near-native performance.",
          type: "website",
          siteName: "Ximler",
          locale: "en_US",
          images: [
               {
                    url: "/logo.svg",
                    width: 1200,
                    height: 630,
                    alt: "Ximler - High-Performance Canvas Engine",
               },
          ],
     },
     twitter: {
          card: "summary_large_image",
          title: "Ximler - High-Performance Canvas Engine",
          description: "Build stunning interactive graphics applications with WebAssembly-powered performance.",
          images: ["/logo.svg"],
     },
     alternates: {
          canonical: "https://ximler.com",
     },
     category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en">
               <head>
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" href="/favicon.svg" type="image/svg+xml" />
               </head>
               <body className={inter.className}>
                    <div className="min-h-screen bg-gray-50">
                         <Navigation />
                         <ConditionalLayout>{children}</ConditionalLayout>
                    </div>
               </body>
          </html>
     );
}
