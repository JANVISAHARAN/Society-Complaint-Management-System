import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 500+ Organizations
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Complaint Management 
              <span className="text-blue-600"> Solution</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline citizen complaints with our AI-powered platform. Track, manage, and resolve issues efficiently while improving citizen satisfaction and government transparency.
            </p>
            
            {/* Removed Watch Demo and Start Free Trial buttons as requested */}
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">50%</div>
                <div className="text-sm text-gray-600">Faster Resolution</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Complaint Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-red-400">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Water Supply Issue</span>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High Priority</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Sector 15, Block A</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Street Light Repair</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Main Road, Sector 22</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border-l-4 border-green-400">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Garbage Collection</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Resolved</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Park Avenue, Sector 8</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600">247</div>
                  <div className="text-xs text-gray-600">Active Cases</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">1,834</div>
                  <div className="text-xs text-gray-600">Resolved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;