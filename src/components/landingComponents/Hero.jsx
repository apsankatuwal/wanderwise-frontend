import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
        alt="Mountain lake at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/60" />

      {/* Hero Content */}
      <div className="relative mx-6 max-w-xl rounded-2xl border border-white/40 bg-white/85 p-10 text-center shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Travel Beyond the Ordinary
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          WanderWise helps you discover incredible destinations, create
          personalized journeys, and turn travel ideas into unforgettable
          experiences.
        </p>

        {/* Buttons */}
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
  );
};

export default Hero;