import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { EllipsisVertical, Plus } from "lucide-react";
import api from "../../api/axios";
import { toast } from "sonner";
import { formatDateRange } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Trip = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        setTrips(response.data);
      } catch (error) {
        toast.error("Failed to fetch trips. Please try again later.");
        console.log(error);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);

      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripId));

      toast.success("Trip deleted successfully");
    } catch (error) {
      toast.error("Failed to delete trip");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-16 sm:px-10 lg:px-20">
      <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
            See your trips
          </CardTitle>

          <CardDescription className="text-sm text-slate-500">
            View and manage all your trips
          </CardDescription>

          <div className="ml-auto">
            <Link to="/trips/add">
              <Button className="gap-1.5 bg-sky-700 text-white hover:bg-sky-800">
                <Plus className="h-4 w-4" />
                Add Trip
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.length === 0 ? (
              <p className="col-span-full text-sm text-slate-500">
                No trips available.
              </p>
            ) : (
              trips.map((trip) => (
                <Card
                  key={trip._id}
                  className="flex flex-col rounded-2xl border-slate-200 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-900">
                          {trip.title}
                        </CardTitle>

                        <CardDescription className="text-sm text-slate-500">
                          {formatDateRange(trip.startDate, trip.endDate)}
                        </CardDescription>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                            />
                          }
                        >
                          <EllipsisVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Manage Trip</DropdownMenuLabel>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            render={<Link to={`/trips/${trip._id}`} />}
                          >
                            View Trip
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            render={<Link to={`/trips/${trip._id}/edit`} />}
                          >
                            Edit Trip
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(trip._id)}
                            className="text-red-600"
                          >
                            Delete Trip
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-1 text-sm text-slate-600">
                    <p>Budget: Rs. {trip.budget?.total ?? 0}</p>

                    <p>Spent: Rs. {trip.budget?.spent ?? 0}</p>
                  </CardContent>

                  <CardFooter className="mt-auto text-sm text-slate-500">
                    <p>
                      Destinations: {trip.destinations?.join(", ") || "N/A"}
                    </p>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Total trips:{" "}
            <span className="font-semibold text-slate-900">{trips.length}</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Trip;
