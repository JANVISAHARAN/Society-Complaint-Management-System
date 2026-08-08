import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Register from "./components/Register";
import FileComplaint from "./components/FileComplaint";
import MyComplaint from "./components/MyComplaint";
import AdminDashboard from "./components/AdminDashboard";
import { ComplaintsProvider } from "./components/ComplaintsContext";
import {
  ProtectedRoute,
  PublicOnlyRoute,
  AdminRoute,
} from "./components/RouteGuards";

function App() {
  return (
    <Router>
      <ComplaintsProvider>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <Benefits />
                  <Testimonials />
                  <Pricing />
                  <CTA />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <AboutUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <ContactUs />
                  <Footer />
                </>
              }
            />

            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <>
                    <Register />
                    <Footer />
                  </>
                </PublicOnlyRoute>
              }
            />

            <Route
              path="/file-complaint"
              element={
                <ProtectedRoute>
                  <>
                    <FileComplaint />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/mycomplaint"
              element={
                <ProtectedRoute>
                  <>
                    <MyComplaint />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />

            {/* CHANGED: admin-only route */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <>
                    <AdminDashboard />
                    <Footer />
                  </>
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </ComplaintsProvider>
    </Router>
  );
}

export default App;
