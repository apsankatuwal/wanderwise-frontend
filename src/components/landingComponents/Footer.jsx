import { Compass, Camera, MessageSquare, Share2 } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: ["Destinations", "Itineraries", "Pricing"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service"],
  },
];

const socialLinks = [
  { label: "Photos", icon: Camera },
  { label: "Community", icon: MessageSquare },
  { label: "Share", icon: Share2 },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-emerald-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2 text-primary">
              <Compass className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">
                Wanderwise
              </span>
            </a>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Your quiet co-pilot for stress-free travel planning. Organize
              itineraries, discover destinations, and journey with clarity.
            </p>
            <div className="mt-8 flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-start-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-6 space-y-6">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Wanderwise Travel. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;