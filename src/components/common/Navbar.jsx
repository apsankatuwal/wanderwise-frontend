import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const publicNavigation = [
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const privateNavigation = [
  { label: "Destinations", to: "/destinations" },
  { label: "Itineraries", to: "/itineraries" },
  { label: "Trips", to: "/trips" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { token, onLogout } = useAuth();

  const navigation = token ? privateNavigation : publicNavigation;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMenu();
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-sky-50 text-sky-800"
        : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
        >
          <Compass className="h-5 w-5 text-sky-700" aria-hidden="true" />

          <span>Wanderwise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-800"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navigation.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={navLinkClass}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile Authentication */}
            <div className="mt-2 flex items-center gap-3 border-t border-slate-100 px-3 pt-3">
              {token ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
                  >
                    Lognout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Log In
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
