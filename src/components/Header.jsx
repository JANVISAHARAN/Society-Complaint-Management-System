import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useComplaints } from "./ComplaintsContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // CHANGED: pull real auth state from context instead of ignoring it
  const { userId, loading, isAdmin } = useComplaints();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "File Complaint", href: "/file-complaint" },
    { name: "MyComplaint", href: "/mycomplaint" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    // CHANGED: Admin link only shows up for admins — regular residents never see it
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ];

  // CHANGED: small helper so we don't duplicate this JSX twice (desktop + mobile)
  const AuthControls = ({ mobile }) => {
    if (loading) return null; // avoid flashing the wrong state while auth is resolving

    if (userId) {
      return (
        <div
          className={
            mobile ? "flex gap-2 items-center mt-4" : "flex items-center gap-3"
          }
        >
          <button
            onClick={handleLogout}
            className={
              mobile
                ? "flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
                : "bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
            }
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className={mobile ? "flex space-x-2 mt-4" : "flex space-x-4"}>
        <Link
          to="/login"
          className={
            mobile
              ? "flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              : "bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          }
        >
          Login
        </Link>
        <Link
          to="/register"
          className={
            mobile
              ? "flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
              : "bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
          }
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              SocietyCare
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.dropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <span
                    className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition-colors cursor-pointer ${
                      location.pathname === item.href ? "text-blue-600" : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition-colors ${
                      location.pathname === item.href
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex">
            <AuthControls mobile={false} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <AuthControls mobile={true} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
