import { Star } from "lucide-react";

const stats = [
  { value: "300+", label: "Clients Served" },
  { value: "4.8", label: "Overall Rating", icon: Star },
  { value: "20+", label: "Countries Linked" },
];

const OurMission = () => {
  return (
    <section className="bg-sky-900 px-6 py-24 text-sky-50 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">
          Our Mission
        </h2>

        <p className="text-center text-lg italic leading-relaxed text-sky-100 sm:text-xl">
          Our mission is to provide the best possible service to our
          customers. Plan their itinerary and make their trip memorable. We
          strive to offer unique experiences that cater to the diverse
          interests of our travelers.
        </p>

        <div className="mt-20 grid grid-cols-1 divide-y divide-sky-100/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="py-6 text-center sm:px-6">
              <p className="flex items-center justify-center gap-2 text-3xl font-bold">
                {value}
                {Icon && (
                  <Icon className="h-6 w-6 fill-amber-400 text-amber-400" />
                )}
              </p>
              <p className="mt-2 text-lg italic text-sky-100">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;