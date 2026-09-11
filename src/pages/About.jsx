import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  ShieldCheck,
  Heart,
  CalendarRange,
  ArrowRight,
  Share2,
  Mail,
} from "lucide-react";

/**
 * About.jsx
 * WanderWise — About page
 *
 * Stack: React (Vite) + Tailwind CSS + lucide-react + react-router-dom
 * No useState / useEffect — fully static presentational page.
 */

const journeyPoints = [
  {
    icon: Compass,
    title: "Discover destinations",
    description:
      "Find hidden gems and iconic landmarks curated for your taste.",
  },
  {
    icon: CalendarRange,
    title: "Plan personalized trips",
    description:
      "Create itineraries that flow seamlessly from one activity to the next.",
  },
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    description:
      "All your plans, tickets, and reservations organized in one calm space.",
  },
];

const features = [
  {
    icon: Heart,
    title: "Personalized Recommendations",
    description: "Algorithms that learn your travel style to suggest places you actually love.",
  },
  {
    icon: Compass,
    title: "Smart Planning",
    description: "Interactive timelines and fluid grids that make scheduling your days effortless.",
  },
  {
    icon: MapPin,
    title: "Discover More",
    description: "Access curated guides and authentic local experiences beyond the tourist traps.",
  },
  {
    icon: ShieldCheck,
    title: "Travel With Confidence",
    description: "Dependable access to all your documents and offline maps when you need them.",
  },
];

const footerLinks = {
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookies" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Support", to: "/support" },
    { label: "Contact", to: "/contact" },
  ],
};

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* ---------------- Navbar ---------------- */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-sky-700" strokeWidth={2.25} />
            <span className="text-lg font-semibold tracking-tight">Wanderwise</span>
          </Link>

          <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <li>
              <Link to="/destinations" className="transition hover:text-slate-900">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/itineraries" className="transition hover:text-slate-900">
                Itineraries
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition hover:text-slate-900">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="relative text-sky-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-sky-700 after:content-['']"
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-slate-900">
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:block"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          alt="Mountain lake at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/60" />

        <div className="relative mx-6 max-w-xl rounded-2xl border border-white/40 bg-white/85 p-10 text-center shadow-xl backdrop-blur-md">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Travel Beyond the Ordinary
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            WanderWise helps you discover incredible destinations, create
            personalized journeys, and turn travel ideas into unforgettable
            experiences.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/plan"
              className="inline-flex items-center justify-center rounded-lg border border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-sky-700 transition hover:bg-sky-50"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Who we are ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80"
              alt="Traveler looking out over a coastal cliff"
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-700">
              Who we are
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Your Journey Starts Here
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              We built WanderWise to take the stress out of travel planning.
              By combining intuitive design with smart recommendations, we
              provide a quiet co-pilot for your adventures, ensuring your
              focus remains on the experience, not the logistics.
            </p>

            <ul className="mt-8 space-y-6">
              {journeyPoints.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Our Mission ---------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80"
            alt="Vintage compass resting on a world map"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-10">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              Our Mission
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              &ldquo;We believe travel should be easier to plan, more
              personal, and more inspiring. WanderWise connects travelers
              with the places, experiences, and ideas that make every
              journey meaningful.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Why WanderWise ---------------- */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why WanderWise
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              The tools you need to build the perfect getaway.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA banner ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80"
            alt="Travelers planning a trip together"
            className="h-[380px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your Next Adventure Is Waiting.
            </h2>
            <p className="mt-3 max-w-md text-sm text-slate-200 sm:text-base">
              Start discovering places, experiences, and journeys made for you.
            </p>
            <Link
              to="/destinations"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600"
            >
              Explore WanderWise
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-slate-100 bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-sky-700" strokeWidth={2.25} />
              <span className="text-base font-semibold tracking-tight">Wanderwise</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Your quiet co-pilot for exceptional travel planning.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-sm font-semibold text-slate-900">{heading}</p>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className={`text-sm transition hover:text-slate-900 ${
                        label === "About" ? "text-sky-700" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-semibold text-slate-900">Connect</p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Share"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-200 hover:text-sky-700"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@wanderwise.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-200 hover:text-sky-700"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-100 px-6 pt-6">
          <p className="text-center text-xs text-slate-400">
            © 2024 Wanderwise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}