"use client";

import { useState } from "react";
import Link from "next/link";
import { User, CreditCard, Settings, Download, Calendar, Crown, Shield, Zap, CheckCircle, XCircle, Clock, AlertCircle, Edit3, Bell, Key, Globe, Database, BarChart3 } from "lucide-react";

export default function ProfilePage() {
     const [activeTab, setActiveTab] = useState("overview");

     // Mock user data - در واقعیت این داده‌ها از API می‌آیند
     const userData = {
          name: "John Doe",
          email: "john.doe@example.com",
          avatar: "/api/placeholder/100/100",
          subscription: {
               plan: "Pro", // Free, Pro, Enterprise
               status: "active", // active, expired, cancelled
               startDate: "2024-01-01",
               endDate: "2024-12-31",
               autoRenew: true,
               price: 29,
               currency: "USD",
          },
          usage: {
               projects: 15,
               maxProjects: 100,
               storage: 2.5, // GB
               maxStorage: 50, // GB
               apiCalls: 12500,
               maxApiCalls: 100000,
          },
          paymentHistory: [
               {
                    id: "inv_001",
                    date: "2024-01-01",
                    amount: 29,
                    status: "paid",
                    description: "Pro Plan - Monthly",
               },
               {
                    id: "inv_002",
                    date: "2023-12-01",
                    amount: 29,
                    status: "paid",
                    description: "Pro Plan - Monthly",
               },
               {
                    id: "inv_003",
                    date: "2023-11-01",
                    amount: 29,
                    status: "paid",
                    description: "Pro Plan - Monthly",
               },
          ],
     };

     const getSubscriptionIcon = (plan: string) => {
          switch (plan) {
               case "Free":
                    return <User className="w-5 h-5" />;
               case "Pro":
                    return <Crown className="w-5 h-5" />;
               case "Enterprise":
                    return <Shield className="w-5 h-5" />;
               default:
                    return <User className="w-5 h-5" />;
          }
     };

     const getSubscriptionColor = (plan: string) => {
          switch (plan) {
               case "Free":
                    return "text-gray-600 bg-gray-100";
               case "Pro":
                    return "text-blue-600 bg-blue-100";
               case "Enterprise":
                    return "text-purple-600 bg-purple-100";
               default:
                    return "text-gray-600 bg-gray-100";
          }
     };

     const getStatusColor = (status: string) => {
          switch (status) {
               case "active":
                    return "text-green-600 bg-green-100";
               case "expired":
                    return "text-red-600 bg-red-100";
               case "cancelled":
                    return "text-orange-600 bg-orange-100";
               default:
                    return "text-gray-600 bg-gray-100";
          }
     };

     const tabs = [
          { id: "overview", label: "Overview", icon: User },
          { id: "billing", label: "Billing", icon: CreditCard },
          { id: "usage", label: "Usage", icon: BarChart3 },
          { id: "settings", label: "Settings", icon: Settings },
     ];

     return (
          <div className="min-h-screen bg-gray-50 py-8">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                         <h1 className="text-3xl font-bold text-gray-900">Account Profile</h1>
                         <p className="text-gray-600 mt-2">Manage your account settings, billing, and subscription</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                         {/* Sidebar */}
                         <div className="lg:col-span-1">
                              <div className="bg-white rounded-lg shadow-sm p-6">
                                   {/* User Info */}
                                   <div className="text-center mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                             <User className="w-10 h-10 text-white" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
                                        <p className="text-gray-600">{userData.email}</p>
                                   </div>

                                   {/* Subscription Status */}
                                   <div className="mb-6">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(userData.subscription.plan)}`}>
                                             {getSubscriptionIcon(userData.subscription.plan)}
                                             <span className="ml-2">{userData.subscription.plan} Plan</span>
                                        </div>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ml-2 ${getStatusColor(userData.subscription.status)}`}>
                                             <span className="capitalize">{userData.subscription.status}</span>
                                        </div>
                                   </div>

                                   {/* Navigation Tabs */}
                                   <nav className="space-y-2">
                                        {tabs.map((tab) => {
                                             const Icon = tab.icon;
                                             return (
                                                  <button
                                                       key={tab.id}
                                                       onClick={() => setActiveTab(tab.id)}
                                                       className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                            activeTab === tab.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                                                       }`}
                                                  >
                                                       <Icon className="w-4 h-4 mr-3" />
                                                       {tab.label}
                                                  </button>
                                             );
                                        })}
                                   </nav>
                              </div>
                         </div>

                         {/* Main Content */}
                         <div className="lg:col-span-3">
                              {/* Overview Tab */}
                              {activeTab === "overview" && (
                                   <div className="space-y-6">
                                        {/* Subscription Overview */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <div className="flex items-center justify-between mb-4">
                                                  <h3 className="text-lg font-semibold text-gray-900">Subscription Overview</h3>
                                                  <Link href="/pricing" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                       Change Plan
                                                  </Link>
                                             </div>

                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                       <div className={`w-12 h-12 ${getSubscriptionColor(userData.subscription.plan)} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                                                            {getSubscriptionIcon(userData.subscription.plan)}
                                                       </div>
                                                       <h4 className="font-semibold text-gray-900">{userData.subscription.plan} Plan</h4>
                                                       <p className="text-2xl font-bold text-gray-900">${userData.subscription.price}</p>
                                                       <p className="text-sm text-gray-600">per month</p>
                                                  </div>

                                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                       <Calendar className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                                       <h4 className="font-semibold text-gray-900">Next Billing</h4>
                                                       <p className="text-lg font-bold text-gray-900">{new Date(userData.subscription.endDate).toLocaleDateString()}</p>
                                                       <p className="text-sm text-gray-600">Auto-renewal: {userData.subscription.autoRenew ? "On" : "Off"}</p>
                                                  </div>

                                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                       <div className={`w-12 h-12 ${getStatusColor(userData.subscription.status)} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                                                            {userData.subscription.status === "active" ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                                       </div>
                                                       <h4 className="font-semibold text-gray-900">Status</h4>
                                                       <p className="text-lg font-bold text-gray-900 capitalize">{userData.subscription.status}</p>
                                                       <p className="text-sm text-gray-600">Since {new Date(userData.subscription.startDate).toLocaleDateString()}</p>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                  <Link href="/docs" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                       <Download className="w-5 h-5 text-blue-600 mr-3" />
                                                       <span className="text-sm font-medium">Download SDK</span>
                                                  </Link>
                                                  <Link href="/docs/api" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                       <Key className="w-5 h-5 text-green-600 mr-3" />
                                                       <span className="text-sm font-medium">API Keys</span>
                                                  </Link>
                                                  <Link href="/demo" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                       <Globe className="w-5 h-5 text-purple-600 mr-3" />
                                                       <span className="text-sm font-medium">Live Demo</span>
                                                  </Link>
                                                  <Link href="/docs/examples" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                       <Database className="w-5 h-5 text-orange-600 mr-3" />
                                                       <span className="text-sm font-medium">Examples</span>
                                                  </Link>
                                             </div>
                                        </div>
                                   </div>
                              )}

                              {/* Billing Tab */}
                              {activeTab === "billing" && (
                                   <div className="space-y-6">
                                        {/* Payment Method */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <div className="flex items-center justify-between mb-4">
                                                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                                                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                       <Edit3 className="w-4 h-4 inline mr-1" />
                                                       Update
                                                  </button>
                                             </div>

                                             <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                                                  <CreditCard className="w-8 h-8 text-gray-400 mr-4" />
                                                  <div>
                                                       <p className="font-medium text-gray-900">**** **** **** 4242</p>
                                                       <p className="text-sm text-gray-600">Expires 12/25</p>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Payment History */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>

                                             <div className="overflow-x-auto">
                                                  <table className="min-w-full divide-y divide-gray-200">
                                                       <thead className="bg-gray-50">
                                                            <tr>
                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                                            </tr>
                                                       </thead>
                                                       <tbody className="bg-white divide-y divide-gray-200">
                                                            {userData.paymentHistory.map((payment) => (
                                                                 <tr key={payment.id}>
                                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(payment.date).toLocaleDateString()}</td>
                                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.description}</td>
                                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount}</td>
                                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                                           <span
                                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                                     payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                                }`}
                                                                           >
                                                                                {payment.status === "paid" ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                                                                                {payment.status}
                                                                           </span>
                                                                      </td>
                                                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                                           <a href="#" className="hover:text-blue-800">
                                                                                Download
                                                                           </a>
                                                                      </td>
                                                                 </tr>
                                                            ))}
                                                       </tbody>
                                                  </table>
                                             </div>
                                        </div>

                                        {/* Billing Settings */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Settings</h3>

                                             <div className="space-y-4">
                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Auto-renewal</p>
                                                            <p className="text-sm text-gray-600">Automatically renew your subscription</p>
                                                       </div>
                                                       <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked={userData.subscription.autoRenew} />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                       </label>
                                                  </div>

                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Email notifications</p>
                                                            <p className="text-sm text-gray-600">Receive billing notifications via email</p>
                                                       </div>
                                                       <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                       </label>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}

                              {/* Usage Tab */}
                              {activeTab === "usage" && (
                                   <div className="space-y-6">
                                        {/* Usage Overview */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Overview</h3>

                                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                  <div className="p-4 bg-gray-50 rounded-lg">
                                                       <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-900">Projects</h4>
                                                            <Database className="w-5 h-5 text-blue-600" />
                                                       </div>
                                                       <div className="text-2xl font-bold text-gray-900">{userData.usage.projects}</div>
                                                       <div className="text-sm text-gray-600">of {userData.usage.maxProjects} max</div>
                                                       <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(userData.usage.projects / userData.usage.maxProjects) * 100}%` }}></div>
                                                       </div>
                                                  </div>

                                                  <div className="p-4 bg-gray-50 rounded-lg">
                                                       <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-900">Storage</h4>
                                                            <Database className="w-5 h-5 text-green-600" />
                                                       </div>
                                                       <div className="text-2xl font-bold text-gray-900">{userData.usage.storage} GB</div>
                                                       <div className="text-sm text-gray-600">of {userData.usage.maxStorage} GB max</div>
                                                       <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(userData.usage.storage / userData.usage.maxStorage) * 100}%` }}></div>
                                                       </div>
                                                  </div>

                                                  <div className="p-4 bg-gray-50 rounded-lg">
                                                       <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-900">API Calls</h4>
                                                            <Zap className="w-5 h-5 text-purple-600" />
                                                       </div>
                                                       <div className="text-2xl font-bold text-gray-900">{userData.usage.apiCalls.toLocaleString()}</div>
                                                       <div className="text-sm text-gray-600">of {userData.usage.maxApiCalls.toLocaleString()} max</div>
                                                       <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(userData.usage.apiCalls / userData.usage.maxApiCalls) * 100}%` }}></div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Usage Limits */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Limits</h3>

                                             <div className="space-y-4">
                                                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                       <div className="flex items-center">
                                                            <Database className="w-5 h-5 text-blue-600 mr-3" />
                                                            <div>
                                                                 <p className="font-medium text-gray-900">Projects</p>
                                                                 <p className="text-sm text-gray-600">Maximum number of projects</p>
                                                            </div>
                                                       </div>
                                                       <span className="text-lg font-semibold text-gray-900">{userData.usage.maxProjects}</span>
                                                  </div>

                                                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                       <div className="flex items-center">
                                                            <Database className="w-5 h-5 text-green-600 mr-3" />
                                                            <div>
                                                                 <p className="font-medium text-gray-900">Storage</p>
                                                                 <p className="text-sm text-gray-600">Maximum storage capacity</p>
                                                            </div>
                                                       </div>
                                                       <span className="text-lg font-semibold text-gray-900">{userData.usage.maxStorage} GB</span>
                                                  </div>

                                                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                       <div className="flex items-center">
                                                            <Zap className="w-5 h-5 text-purple-600 mr-3" />
                                                            <div>
                                                                 <p className="font-medium text-gray-900">API Calls</p>
                                                                 <p className="text-sm text-gray-600">Monthly API call limit</p>
                                                            </div>
                                                       </div>
                                                       <span className="text-lg font-semibold text-gray-900">{userData.usage.maxApiCalls.toLocaleString()}</span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}

                              {/* Settings Tab */}
                              {activeTab === "settings" && (
                                   <div className="space-y-6">
                                        {/* Account Settings */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>

                                             <div className="space-y-4">
                                                  <div>
                                                       <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                       <input
                                                            type="text"
                                                            defaultValue={userData.name}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                       />
                                                  </div>

                                                  <div>
                                                       <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                       <input
                                                            type="email"
                                                            defaultValue={userData.email}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                       />
                                                  </div>

                                                  <div>
                                                       <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                                       <input
                                                            type="password"
                                                            placeholder="Enter new password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                       />
                                                  </div>
                                             </div>

                                             <div className="mt-6">
                                                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Save Changes</button>
                                             </div>
                                        </div>

                                        {/* Notification Settings */}
                                        <div className="bg-white rounded-lg shadow-sm p-6">
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>

                                             <div className="space-y-4">
                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Email notifications</p>
                                                            <p className="text-sm text-gray-600">Receive updates via email</p>
                                                       </div>
                                                       <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                       </label>
                                                  </div>

                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Product updates</p>
                                                            <p className="text-sm text-gray-600">Get notified about new features</p>
                                                       </div>
                                                       <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                       </label>
                                                  </div>

                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Security alerts</p>
                                                            <p className="text-sm text-gray-600">Important security notifications</p>
                                                       </div>
                                                       <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                       </label>
                                                  </div>
                                             </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
                                             <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>

                                             <div className="space-y-4">
                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Cancel Subscription</p>
                                                            <p className="text-sm text-gray-600">Cancel your subscription and downgrade to Free plan</p>
                                                       </div>
                                                       <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Cancel Subscription</button>
                                                  </div>

                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <p className="font-medium text-gray-900">Delete Account</p>
                                                            <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                                                       </div>
                                                       <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Delete Account</button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
}
