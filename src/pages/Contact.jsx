import { Link } from "react-router-dom";
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Globe,
  Hash,
  ChevronDown,
  ArrowRight,
  Send,
} from "lucide-react";

/**
 * Contact.jsx
 * WanderWise — Contact page
 *
 * Stack: React (Vite) + Tailwind CSS + lucide-react + react-router-dom
 * No useState / useEffect — the FAQ accordion uses native <details>/<summary>,
 * which is fully static/uncontrolled and needs no React state.
 */

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@wanderwise.com",
    href: "mailto:hello@wanderwise.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 98XXXXXXXX",
    href: "tel:+97798XXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kathmandu, Nepal",
    href: null,
  },
];

const socials = [
  
  { icon: Globe, label: "Website", href: "#" },
  { icon: Hash, label: "Threads", href: "#" },
];

const faqs = [
  {
    question: "How can I plan a trip using Wanderwise?",
    answer:
      "Create a free account, tell us your destination and travel dates, and our planner builds a personalized itinerary you can edit anytime.",
  },
  {
    question: "Can I get recommendations for my destination?",
    answer:
      "Yes — WanderWise suggests places, activities, and local experiences based on your interests and travel style.",
  },
  {
    question: "How do I submit feedback about the platform?",
    answer:
      "Use the contact form on this page, or email us directly at hello@wanderwise.com. We read every message.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "Our team typically replies within 24-48 hours on business days.",
  },
];

const footerLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
  { label: "Support", to: "/support" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
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
              <Link to="/about" className="transition hover:text-slate-900">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="relative text-sky-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-sky-700 after:content-['']"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:block"
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
      <section className="mx-auto max-w-3xl px-6 pb-4 pt-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-sky-800 sm:text-5xl">
          Let&apos;s Talk Travel
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Have a question, suggestion, or just want to say hello? We&apos;d
          love to hear from you. Our team is always ready to help you plan
          your next adventure.
        </p>
      </section>

      {/* ---------------- Get in touch + Form ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Get in touch card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Get in Touch</h2>
            <p className="mt-2 text-sm text-slate-500">
              We&apos;re here to help and answer any question you might have.
            </p>

            <ul className="mt-8 space-y-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-sky-700 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-700">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-slate-100 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Follow Us
              </p>
              <div className="mt-4 flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form card */}
          <form className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder=""
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder=""
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder=""
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder=""
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ---------------- Common Questions ---------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-sky-800">
            Common Questions
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Find quick answers to common inquiries.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-800">
                  {question}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- Find Us ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-sky-800">
            Find Us
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <iframe
            title="WanderWise HQ location"
            src="https://www.google.com/maps?q=Thamel,Kathmandu,Nepal&output=embed"
            className="h-105 w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ---------------- Ready to start exploring ---------------- */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-sky-800">
          Ready to Start Exploring?
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Discover your next destination with WanderWise.
        </p>
        <Link
          to="/destinations"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-sky-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-800"
        >
          Explore Destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-slate-200 bg-slate-100 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div>
            <span className="text-base font-semibold tracking-tight text-sky-800">
              Wanderwise
            </span>
            <p className="mt-1 text-xs text-slate-500">
              © 2024 Wanderwise. All rights reserved.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {footerLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="transition hover:text-slate-800">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}