import React, { useState } from 'react';

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <div className="text-gray-700 text-lg text-center">
          <p className="mb-4">For any queries or support, please contact us:</p>
          <div className="mb-2">Phone: <span className="font-semibold">+1 234 567 890</span></div>
          <div className="mb-2">Email: <span className="font-semibold">info@societycare.com</span></div>
          <div>Address: <span className="font-semibold">123 Main Street, City, Country</span></div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs; 