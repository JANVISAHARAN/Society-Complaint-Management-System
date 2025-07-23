import React from 'react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <div className="text-2xl font-bold text-blue-400 mb-4">SocietyCare</div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Building modern web solutions to empower your society and connect with your residents.
          </p>
        </div>
        {/* Contact Info */}
        <div className="mt-8 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400 text-sm">
              <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
              123 Main Street, City, Country
            </li>
            <li className="flex items-center text-gray-400 text-sm">
              <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
              +1 234 567 890
            </li>
            <li className="flex items-center text-gray-400 text-sm">
              <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
              info@societycare.com
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="mt-8 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-400 text-sm">
          © 2025 SocietyCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;