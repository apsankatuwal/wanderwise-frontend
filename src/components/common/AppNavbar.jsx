import { useState } from "react";
import { Compass, LogOut, Menu, Plus, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const navigation = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "My trips", to: "/trips" },
];

const AppNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, onLogout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    onLogout();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-sky-50 text-sky-800"
        : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"
    }`;

  const userName = userData?.name || userData?.username || "Traveler";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
          onClick={closeMenu}
        >
          <Compass className="h-5 w-5 text-sky-700" aria-hidden="true" />
          Wanderwise
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="max-w-40 truncate text-sm text-slate-600">
            Hi, {userName}
          </span>
          <Link
            to="/trips/add"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-800"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New trip
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navigation.map(({ label, to }) => (
              <NavLink key={to} to={to} className={navLinkClass} onClick={closeMenu}>
                {label}
              </NavLink>
            ))}
            <Link
              to="/trips/add"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white hover:bg-sky-800"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New trip
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
