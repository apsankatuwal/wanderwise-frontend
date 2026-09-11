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

      setTrips((prevTrips) =>
        prevTrips.filter((trip) => trip._id !== tripId)
      );

      toast.success("Trip deleted successfully");
    } catch (error) {
      toast.error("Failed to delete trip");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 px-20 py-24">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>See your trips</CardTitle>

          <CardDescription>
            View and manage all your trips
          </CardDescription>

          <div className="ml-auto">
            <Link to="/trips/add">
              <Button>
                <Plus />
                Add Trip
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {trips.length === 0 ? (
              <p className="col-span-3 text-muted-foreground">
                No trips available.
              </p>
            ) : (
              trips.map((trip) => (
                <Card key={trip._id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle>{trip.title}</CardTitle>

                        <CardDescription>
                          {formatDateRange(
                            trip.startDate,
                            trip.endDate
                          )}
                        </CardDescription>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                            />
                          }
                        >
                          <EllipsisVertical />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            Manage Trip
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            render={
                              <Link to={`/trips/${trip._id}`} />
                            }
                          >
                            View Trip
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            render={
                              <Link
                                to={`/trips/${trip._id}/edit`}
                              />
                            }
                          >
                            Edit Trip
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(trip._id)
                            }
                            className="text-red-600"
                          >
                            Delete Trip
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p>
                      Budget: Rs. {trip.budget?.total ?? 0}
                    </p>

                    <p>
                      Spent: Rs. {trip.budget?.spent ?? 0}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <p>
                      Destinations:{" "}
                      {trip.destinations?.join(", ") || "N/A"}
                    </p>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trip;