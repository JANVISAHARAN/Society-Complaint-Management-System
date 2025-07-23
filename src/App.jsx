import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import FileComplaint from './components/FileComplaint';
import MyComplaint from './components/MyComplaint';
import { ComplaintsProvider } from './components/ComplaintsContext';

function App() {
  return (
    <Router>
      <ComplaintsProvider>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Benefits />
                <Testimonials />
                <Pricing />
                <CTA />
                <Footer />
              </>
            } />
            <Route path="/about" element={<><AboutUs /><Footer /></>} />
            <Route path="/contact" element={<><ContactUs /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<><Register /><Footer /></>} />
            <Route path="/file-complaint" element={<><FileComplaint /><Footer /></>} />
            <Route path="/mycomplaint" element={<><MyComplaint /><Footer /></>} />
          </Routes>
        </div>
      </ComplaintsProvider>
    </Router>
  );
}

export default App;