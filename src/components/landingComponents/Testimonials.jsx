import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      '"Wanderwise made planning our Eurotrip effortless. The itinerary builder kept everything organized, from flights to dinner reservations. We felt prepared and relaxed."',
    name: "Sarah Jenkins",
    role: "Avid Backpacker",
    initials: "SJ",
  },
  {
    quote:
      '"The shared itinerary feature is a game-changer for family vacations. Being able to collaborate and see everything in one clean timeline saved us hours of confusing group chats."',
    name: "David Chen",
    role: "Family Organizer",
    initials: "DC",
  },
  {
    quote:
      '"I travel for work constantly. Wanderwise organizes my complex multi-city trips perfectly. The clean design helps me focus on the trip, not the logistics."',
    name: "Elena Rodriguez",
    role: "Business Consultant",
    initials: "ER",
  },
];

export default function TestimonialsSection() {
  return (
    <section className=" px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Travelers Love Wanderwise
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Discover how our intuitive travel planning tool has transformed the
            journeys of adventurers worldwide.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-5 w-5 text-chart-5" />
                ))}
              </div>

              <p className="mt-6 flex-1 leading-relaxed text-card-foreground">
                {item.quote}
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-sm font-semibold bg-amber-300 [&>div]:bg-blue-950  text-secondary-foreground">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm text-foreground">{item.name}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
