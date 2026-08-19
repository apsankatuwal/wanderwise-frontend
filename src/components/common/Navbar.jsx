import React, { useState } from "react";
import { Compass, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-slate-900 font-semibold text-lg"
        >
          <Compass className="w-5 h-5 text-blue-700" />
          Wanderwise
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/destinations"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            Destinations
          </a>

          <a
            href="/itineraries"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            Itineraries
          </a>

          <a
            href="/pricing"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            Pricing
          </a>

          <a
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            About
          </a>

          <a
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Login / Signup */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Log In
          </a>

          <a
            href="/signup"
            className="text-sm font-medium bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">

          <a
            href="/destinations"
            className="block text-sm font-medium text-slate-700 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Destinations
          </a>

          <a
            href="/itineraries"
            className="block text-sm font-medium text-slate-700 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Itineraries
          </a>

          <a
            href="/pricing"
            className="block text-sm font-medium text-slate-700 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </a>

          <a
            href="/about"
            className="block text-sm font-medium text-slate-700 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <a
            href="/contact"
            className="block text-sm font-medium text-slate-700 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          {/* Mobile Login / Signup */}
          <div className="flex gap-4 pt-2">
            <a
              href="/login"
              className="text-sm font-medium text-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </a>

            <a
              href="/signup"
              className="text-sm font-medium bg-blue-800 text-white px-4 py-2 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;