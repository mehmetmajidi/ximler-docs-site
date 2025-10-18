import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, Terminal, Globe } from "lucide-react";

export default function InstallationPage() {
     const steps = [
          {
               title: "Download Ximler",
               description: "Get the latest WebAssembly build files",
               code: `# Download the latest release
wget https://github.com/ximler/releases/latest/download/ximler.zip

# Or use curl
curl -L -o ximler.zip https://github.com/ximler/releases/latest/download/ximler.zip

# Extract the files
unzip ximler.zip`,
          },
          {
               title: "Include in Your Project",
               description: "Add Ximler files to your project directory",
               code: `# Copy files to your project
cp ximler.js your-project/public/
cp ximler.wasm your-project/public/

# Or for Node.js projects
cp ximler.js your-project/src/
cp ximler.wasm your-project/src/`,
          },
          {
               title: "Install via NPM (Optional)",
               description: "Use the official NPM package for easier integration",
               code: `# Install via NPM
npm install @ximler/canvas-engine

# Or with Yarn
yarn add @ximler/canvas-engine

# Or with pnpm
pnpm add @ximler/canvas-engine`,
          },
          {
               title: "Verify Installation",
               description: "Check that files are accessible",
               code: `# Check files exist
ls -la ximler.js ximler.wasm

# Should show:
# -rw-r--r-- ximler.js
# -rw-r--r-- ximler.wasm`,
          },
     ];

     const requirements = [
          { name: "Modern Browser", version: "Chrome 57+, Firefox 52+, Safari 11+", status: "required" },
          { name: "WebAssembly Support", version: "Built-in", status: "required" },
          { name: "HTTP Server", version: "Any", status: "required" },
          { name: "Node.js (Optional)", version: "14.0+", status: "optional" },
          { name: "Package Manager (Optional)", version: "npm/yarn/pnpm", status: "optional" },
     ];

     return (
          <div className="min-h-screen bg-gray-50">
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="mb-8">
                         <Link href="/docs" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                              <ArrowLeft className="w-4 h-4 mr-2" />
                              Back to Documentation
                         </Link>
                         <h1 className="text-4xl font-bold text-gray-900 mb-4">Installation Guide</h1>
                         <p className="text-xl text-gray-600">Get Ximler up and running in your development environment.</p>
                    </div>

                    {/* System Requirements */}
                    <div className="card mb-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                              <Download className="w-6 h-6 mr-3 text-primary-600" />
                              Requirements
                         </h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {requirements.map((req) => (
                                   <div key={req.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                             <h3 className="font-medium text-gray-900">{req.name}</h3>
                                             <p className="text-sm text-gray-600">Version {req.version}</p>
                                        </div>
                                        <div className="flex items-center">
                                             <CheckCircle className={`w-5 h-5 mr-2 ${req.status === "required" ? "text-green-500" : "text-blue-500"}`} />
                                             <span className={`text-sm font-medium ${req.status === "required" ? "text-green-600" : "text-blue-600"}`}>{req.status}</span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Installation Steps */}
                    <div className="space-y-8">
                         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                              <Terminal className="w-6 h-6 mr-3 text-primary-600" />
                              Installation Methods
                         </h2>

                         {steps.map((step, index) => (
                              <div key={step.title} className="card">
                                   <div className="flex items-start">
                                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4 mt-1">{index + 1}</div>
                                        <div className="flex-1">
                                             <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                                             <p className="text-gray-600 mb-4">{step.description}</p>
                                             <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                                  <pre className="text-green-400 text-sm">
                                                       <code>{step.code}</code>
                                                  </pre>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* Verification */}
                    <div className="card mt-8 bg-green-50 border-green-200">
                         <div className="flex items-center mb-4">
                              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                              <h3 className="text-xl font-semibold text-gray-900">Verify Installation</h3>
                         </div>
                         <p className="text-gray-700 mb-4">After completing the installation, verify that everything is working correctly:</p>
                         <div className="bg-gray-900 rounded-lg p-4 mb-4">
                              <pre className="text-green-400 text-sm">
                                   <code>{`# Check files exist
ls -la ximler.js ximler.wasm

# Test in browser console
const Module = await import('./ximler.js');
console.log('Ximler loaded successfully!');`}</code>
                              </pre>
                         </div>
                         <p className="text-gray-700">
                              If you see the expected output, your installation is complete!
                              <Link href="/docs/quick-start" className="text-primary-600 hover:text-primary-700 font-medium">
                                   Continue to Quick Start →
                              </Link>
                         </p>
                    </div>

                    {/* Troubleshooting */}
                    <div className="card mt-8">
                         <h3 className="text-xl font-semibold text-gray-900 mb-4">Troubleshooting</h3>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="font-medium text-gray-900 mb-2">Files not found</h4>
                                   <p className="text-gray-600 text-sm">
                                        Make sure you've downloaded and extracted the Ximler files correctly. Check that <code className="bg-gray-100 px-2 py-1 rounded">ximler.js</code> and{" "}
                                        <code className="bg-gray-100 px-2 py-1 rounded">ximler.wasm</code> are in the correct directory.
                                   </p>
                              </div>
                              <div>
                                   <h4 className="font-medium text-gray-900 mb-2">WebAssembly not loading</h4>
                                   <p className="text-gray-600 text-sm">
                                        Ensure files are served over HTTP/HTTPS (not file://) and check browser console for errors. Make sure your browser supports WebAssembly.
                                   </p>
                              </div>
                              <div>
                                   <h4 className="font-medium text-gray-900 mb-2">CORS errors</h4>
                                   <p className="text-gray-600 text-sm">If loading from a different domain, configure CORS headers on your server or use a local development server.</p>
                              </div>
                              <div>
                                   <h4 className="font-medium text-gray-900 mb-2">NPM package issues</h4>
                                   <p className="text-gray-600 text-sm">
                                        If using the NPM package, make sure to import it correctly: <code className="bg-gray-100 px-2 py-1 rounded">import Ximler from '@ximler/canvas-engine'</code>
                                   </p>
                              </div>
                         </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                         <Link href="/docs/quick-start" className="btn-primary flex-1 text-center">
                              Next: Quick Start Guide
                         </Link>
                         <Link href="/demo" className="btn-secondary flex-1 text-center">
                              Try Live Demo
                         </Link>
                    </div>
               </div>
          </div>
     );
}
