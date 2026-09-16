import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { EllipsisVertical, Plus } from 'lucide-react'
import api from '../../api/axios'
import { toast } from 'sonner'
import { formatDate } from '../../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Baggage = () => {

  const [trips, setTrips] = useState([]);
  const [dependancy, setDependency] = useState(0);

  useEffect(() => {

    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");
        setTrips(response.data);
      } catch (error) {
        toast.error("Some error occured while fetching trips");
        console.log(error);
      }
    }

    fetchTrips();
  }, [dependancy]);

  const onDelete = async (tripId) => {
    try {
      const response = await api.delete(`/trips/${tripId}`);

      if(response.status === 200){
        toast.success("Trip deleted successfully!!");
        setDependency(dependancy + 1);
      }else{
        toast.error("Error while deleting trip.");
      }
    }catch(error){
      toast.error( error.message || "Error while creating trip");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-16 sm:px-10 lg:px-20">
      <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">

        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
            Select a trip to view baggage
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Click view baggage button to show baggages of this trip.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {
              trips.length == 0
                ?
                <p className="col-span-full text-sm text-slate-500">
                  You do not have any trips to show. Create a new trip first.
                </p>
                :
                trips.map((trip) => {
                  return (
                    <Card
                      key={trip._id}
                      className="flex flex-col rounded-2xl border-slate-200 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <CardTitle className="text-base font-semibold text-slate-900">
                          {trip.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500">
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-1 text-sm text-slate-600">
                        <p>Budget: Rs. {trip.budget.total}</p>
                        <p>Spent: Rs. {trip.budget.spent}</p>
                        <p>Destinations: {trip.destinations.join(", ")}</p>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <Link className="w-full" to={`/baggage/${trip._id}`}>
                          <Button className="w-full gap-1.5 bg-sky-700 text-white hover:bg-sky-800">
                            View Baggage
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                })
            }

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
  )
}

export default Baggage