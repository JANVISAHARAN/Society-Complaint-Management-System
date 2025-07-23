import React from 'react';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your 
            <span className="text-blue-200"> Citizen Services?</span>
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join hundreds of government organizations already using SocietyCare to improve citizen satisfaction, 
            increase operational efficiency, and build trust through transparency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Removed Start Free Trial, Schedule Demo, and Download Brochure buttons as requested */}
          </div>
          
          <p className="text-blue-200 text-sm">
            No credit card required • 30-day free trial • Setup in under 24 hours
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-colors">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="opacity-90 mb-4">Speak with our solution experts</p>
            <a href="tel:+911234567890" className="text-blue-200 hover:text-white font-medium">
              +91 123 456 7890
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-colors">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="opacity-90 mb-4">Get detailed information</p>
            <a href="mailto:sales@myciti.in" className="text-blue-200 hover:text-white font-medium">
              sales@myciti.in
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white hover:bg-white/20 transition-colors">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Meeting</h3>
            <p className="opacity-90 mb-4">Schedule a personalized demo</p>
            <button className="text-blue-200 hover:text-white font-medium">
              Choose Time Slot
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-75">Organizations</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">2M+</div>
              <div className="text-sm opacity-75">Complaints Resolved</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-sm opacity-75">Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-75">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;