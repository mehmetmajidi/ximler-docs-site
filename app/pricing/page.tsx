export default function PricingPage() {
     return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the perfect plan for your project. All plans include access to our powerful WebAssembly canvas engine.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                         <div className="text-center">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                              <div className="text-4xl font-bold text-gray-900 mb-4">
                                   $0<span className="text-lg text-gray-500">/month</span>
                              </div>
                              <p className="text-gray-600 mb-8">Perfect for getting started</p>
                         </div>
                         <ul className="space-y-4 mb-8">
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Basic canvas drawing</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Shape management</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Community support</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Documentation</span>
                              </li>
                         </ul>
                         <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">Get Started</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 p-8 relative">
                         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                         </div>
                         <div className="text-center">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                              <div className="text-4xl font-bold text-gray-900 mb-4">
                                   $29<span className="text-lg text-gray-500">/month</span>
                              </div>
                              <p className="text-gray-600 mb-8">For professional developers</p>
                         </div>
                         <ul className="space-y-4 mb-8">
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Everything in Free</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Advanced rendering</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Map engine</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">3D isometric rendering</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Priority support</span>
                              </li>
                         </ul>
                         <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">Start Pro Trial</button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                         <div className="text-center">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                              <div className="text-4xl font-bold text-gray-900 mb-4">
                                   $99<span className="text-lg text-gray-500">/month</span>
                              </div>
                              <p className="text-gray-600 mb-8">For large organizations</p>
                         </div>
                         <ul className="space-y-4 mb-8">
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Everything in Pro</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Custom integrations</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Dedicated support</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">SLA guarantee</span>
                              </li>
                              <li className="flex items-center">
                                   <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                             fillRule="evenodd"
                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                             clipRule="evenodd"
                                        />
                                   </svg>
                                   <span className="text-gray-700">Custom training</span>
                              </li>
                         </ul>
                         <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">Contact Sales</button>
                    </div>
               </div>

               <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                         <div className="text-left">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                         </div>
                         <div className="text-left">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                              <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
                         </div>
                         <div className="text-left">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
                         </div>
                    </div>
               </div>
          </div>
     );
}
