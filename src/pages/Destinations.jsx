import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, MapPin, Search, ArrowRight, Plane } from "lucide-react";
import api from "../api/axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/landingComponents/Footer";

const curatedDestinations = [
  {
    name: "Pokhara",
    tagline: "Lakes, mountains, and paragliding launch points",
  },
  {
    name: "Kathmandu",
    tagline: "Ancient temples woven into a living, busy city",
  },
  {
    name: "Chitwan",
    tagline: "Jungle safaris and wildlife along the Rapti River",
  },
  {
    name: "Illam",
    tagline: "Rolling tea gardens across the eastern hills",
  },
  {
    name: "Lumbini",
    tagline: "The birthplace of Buddha, quiet and reflective",
  },
  {
    name: "Bandipur",
    tagline: "A hilltop Newari town frozen in time",
  },
  {
    name: "Mustang",
    tagline: "High desert valleys behind the Annapurna range",
  },
  {
    name: "Gosaikunda",
    tagline: "Alpine lakes on a high-altitude trek",
  },
  {
    name: "Bhaktapur",
    tagline: "Medieval squares, pottery, and carved wood",
  },
];

const Destinations = () => {
  const [images, setImages] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const results = await Promise.all(
        curatedDestinations.map(async ({ name }) => {
          try {
            const response = await api.get("/destinations/image", {
              params: { query: `${name} Nepal` },
            });
            return { name, image: response.data.image };
          } catch (error) {
            console.error(`Failed to fetch image for ${name}`, error);
            return { name, image: null };
          }
        })
      );

      const imageMap = {};
      results.forEach(({ name, image }) => {
        imageMap[name] = image;
      });
      setImages(imageMap);
    };

    fetchImages();
  }, []);

  const filtered = curatedDestinations.filter(({ name, tagline }) =>
    `${name} ${tagline}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-6 pt-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
          <Compass className="h-3.5 w-3.5" />
          Explore
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Destinations Worth the Trip
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          A curated list of places across Nepal to help you decide where to
          go next. Pick one, and start planning right on WanderWise.
        </p>

        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            No destinations match "{query}".
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(({ name, tagline }) => (
              <div
                key={name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {images[name] ? (
                    <img
                      src={images[name]}
                      alt={name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-600 to-sky-800">
                      <MapPin className="h-8 w-8 text-white/80" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-sky-700">
                    <MapPin className="h-3.5 w-3.5" />
                    {name}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {tagline}
                  </p>

                  <Link
                    to="/trips/add"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors group-hover:text-sky-700"
                  >
                    Plan a trip here
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="rounded-2xl bg-sky-900 px-8 py-14">
          <Plane className="mx-auto h-8 w-8 text-white/80" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Don't see your destination?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-sky-100">
            You can plan a trip to anywhere — this list is just a starting
            point.
          </p>
          <Link
            to="/trips/add"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-sky-900 shadow-sm transition hover:bg-sky-50"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;