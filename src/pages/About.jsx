import { useState, useEffect, useRef } from "react";
import {
  Compass,
  ArrowRight,
  MapPin,
  Route,
  ShieldCheck,
  Heart,
  CalendarClock,
  Sparkles,
  Share2,
  Mail,
  Menu,
  X,
} from "lucide-react";


const heroImg =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop";
const hikerImg =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop";
const compassMapImg =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop";
const teamImg =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop";

const NAV_LINKS = [
  { label: "Destinations", to: "/destinations" },
  { label: "Itineraries", to: "/itineraries" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const JOURNEY_POINTS = [
  {
    icon: MapPin,
    title: "Discover destinations",
    body: "Find hidden gems and iconic landmarks curated for your taste.",
  },
  {
    icon: Route,
    title: "Plan personalized trips",
    body: "Create itineraries that flow seamlessly from one activity to the next.",
  },
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    body: "All your plans, tickets, and reservations organized in one calm space.",
  },
];

const FEATURES = [
  {
    icon: Heart,
    title: "Personalized Recommendations",
    body: "Algorithms that learn your travel style to suggest places you'll actually love.",
  },
  {
    icon: CalendarClock,
    title: "Smart Planning",
    body: "Interactive timelines and fluid grids that make scheduling your days effortless.",
  },
  {
    icon: Sparkles,
    title: "Discover More",
    body: "Access curated guides and authentic local experiences beyond the tourist traps.",
  },
  {
    icon: ShieldCheck,
    title: "Travel With Confidence",
    body: "Dependable access to all your documents and offline maps when you need them.",
  },
];

function useRevealOnScroll() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function Reveal({ as: Tag = "div", className = "", style, children }) {
  const [ref, isVisible] = useRevealOnScroll();
  return (
    <Tag
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b transition-shadow ${
        scrolled ? "border-slate-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
          <Compass className="w-5 h-5 text-blue-700" strokeWidth={2.2} />
          Wanderwise
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = link.label === "About";
            return (
              <a
                key={link.label}
                href="#"
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-blue-700 border-blue-700"
                    : "text-slate-600 border-transparent hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Log In
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Sign Up
          </a>
        </div>

        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="block text-sm font-medium text-slate-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-sm font-medium text-slate-700">
              Log In
            </a>
            <a href="#" className="text-sm font-medium bg-blue-800 text-white px-4 py-2 rounded-lg">
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div
        className="h-[520px] bg-cover bg-center relative flex items-center justify-center px-6"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-slate-900/25" />
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-xl w-full text-center px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Travel Beyond the Ordinary
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            WanderWise helps you discover incredible destinations, create
            personalized journeys, and turn travel ideas into unforgettable
            experiences.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-blue-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Plan Your Trip
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <Reveal className="rounded-2xl overflow-hidden">
        <img
          src={hikerImg}
          alt="Hiker looking out over the coastline"
          className="w-full h-[420px] object-cover rounded-2xl"
        />
      </Reveal>

      <Reveal>
        <p className="text-blue-700 text-xs font-semibold tracking-widest uppercase mb-3">
          Who we are
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Your Journey Starts Here
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          We built WanderWise to take the stress out of travel planning. By
          combining intuitive design with smart recommendations, we provide a
          quiet co-pilot for your adventures, ensuring your focus remains on
          the experience, not the logistics.
        </p>

        <div className="space-y-6">
          {JOURNEY_POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <Reveal
        className="relative rounded-2xl overflow-hidden h-[420px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${compassMapImg})` }}
      >
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg max-w-md mx-6 md:mx-12 px-8 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed italic">
            "We believe travel should be easier to plan, more personal, and
            more inspiring. WanderWise connects travelers with the places,
            experiences, and ideas that make every journey meaningful."
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <Reveal className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Why WanderWise</h2>
        <p className="text-slate-500 text-sm">
          The tools you need to build the perfect getaway.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <Reveal
            key={title}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="inline-flex w-9 h-9 rounded-lg bg-blue-50 text-blue-700 items-center justify-center mb-4">
              <Icon className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <Reveal
        className="relative rounded-2xl overflow-hidden bg-cover bg-center py-24 px-6 text-center"
        style={{ backgroundImage: `url(${teamImg})` }}
      >
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Next Adventure Is Waiting.
          </h2>
          <p className="text-slate-200 text-sm mb-8">
            Start discovering places, experiences, and journeys made for you.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Explore WanderWise
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
            <Compass className="w-5 h-5 text-blue-700" />
            Wanderwise
          </div>
          <p className="text-sm text-slate-500">
            Your quiet co-pilot for exceptional travel planning.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-slate-800">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-slate-800">Terms of Service</a></li>
            <li><a href="#" className="hover:text-slate-800">Cookie Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-blue-700 font-medium">About</a></li>
            <li><a href="#" className="text-slate-500 hover:text-slate-800">Support</a></li>
            <li><a href="#" className="text-slate-500 hover:text-slate-800">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Connect</h4>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-800"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@wanderwise.com"
              className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-800"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Wanderwise. All rights reserved.
      </div>
    </footer>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <JourneySection />
      <MissionSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
