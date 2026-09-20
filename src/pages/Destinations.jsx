import React from "react";
import Navbar from "../components/common/Navbar";
import { Button } from "@base-ui/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, MapPin } from "lucide-react";

const Destinations = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="py-10">
        <Card className="w-full max-w-sm overflow-hidden rounded-2xl border-0 shadow-md p-0 gap-0">
          <CardContent className="p-2.5 pb-0">
            <img
              src="https://images.unsplash.com/photo-1618083840944-31cc42fcf250?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9raGFyYXxlbnwwfHwwfHx8Mg%3D%3D"
              alt="Pokhara, Nepal"
              className="w-full h-56 object-cover rounded-xl"
            />
          </CardContent>

          <CardHeader className="px-5 pt-4">
            <CardTitle className="text-xl font-bold text-neutral-900">
              Pokhara, Nepal
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-neutral-500 mt-1">
              Explore the serene lakes, mountain views, and vibrant culture of
              Pokhara.
            </CardDescription>
            <CardAction>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <Mountain size={16} className="text-neutral-500" />
                <span>4 Days</span>
                <span className="text-neutral-300 mx-1">•</span>
                <MapPin size={16} className="text-neutral-500" />
                <span>Nepal</span>
              </div>
            </CardAction>
          </CardHeader>

          <CardFooter className="px-5 pt-4 pb-5">
            <Button className="w-full rounded-xl py-3.5 text-white font-semibold text-base bg-teal-600 hover:bg-teal-700 transition-colors">
              Book Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};


export default Destinations
