import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { formatDate } from "../../lib/utils";
import { ArrowLeft, Luggage, SquarePen, Trash2, Loader2 } from "lucide-react";

const Tripdetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${tripId}`);
        setTrip(response.data);
      } catch (error) {
        toast.error(error.message || "Error while fetching trip");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  const onDelete = async () => {
    try {
      const response = await api.delete(`/trips/${tripId}`);

      if (response.status === 200) {
        toast.success("Trip deleted successfully!!");
        navigate("/trips");
      } else {
        toast.error("Error while deleting trip.");
      }
    } catch (error) {
      toast.error(error.message || "Error while deleting trip");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <p className="text-sm text-slate-500">Trip not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/trips"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to trips
        </Link>

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
              {trip.title}
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </CardDescription>

            <CardAction className="flex gap-2">
              <Link to={`/trips/${tripId}/edit`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                >
                  <SquarePen className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                className="text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-2 pt-6 text-sm text-slate-600">
            {trip.description && <p>{trip.description}</p>}
            <p>Budget: Rs. {trip.budget?.total ?? 0}</p>
            <p>Spent: Rs. {trip.budget?.spent ?? 0}</p>
            <p>Destinations: {trip.destinations?.join(", ") || "N/A"}</p>
          </CardContent>

          <CardFooter className="border-t border-slate-100 pt-4">
            <Link to={`/baggage/${tripId}`} className="w-full">
              <Button
                variant="outline"
                className="w-full gap-1.5 text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              >
                <Luggage className="h-4 w-4" />
                View Packing List
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Tripdetails;