import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import ExpenseForm from '../../components/common/ExpenseForm'
import InviteForm from '@/components/common/InviteForm'
import api from '../../api/axios'
import { toast } from 'sonner'
import { formatDate } from '../../lib/utils'
import { ArrowLeft, Luggage, SquarePen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TripDetails = () => {
  const { tripId: id } = useParams()
  const navigate = useNavigate()

  const [trip, setTrip] = useState(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${id}`)
        setTrip(response.data)
      } catch (error) {
        toast.error("Some error occurred while fetching trip")
        console.log(error)
      }
    }

    fetchTrip()
  }, [id])

  const onDelete = async () => {
    try {
      const response = await api.delete(`/trips/${id}`)

      if (response.status === 200) {
        toast.success("Trip deleted successfully")
        navigate("/trips")
      } else {
        toast.error("Error while deleting trip")
      }
    } catch (error) {
      toast.error(error.message || "Error while deleting trip")
      console.log(error)
    }
  }

  if (!trip) {
    return <div className="px-20 py-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-16 sm:px-10 lg:px-20">
      <Link
        to="/trips"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to trips
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row">

        {/* Left part */}
        <Card className="w-full rounded-2xl border-none shadow-sm ring-1 ring-slate-100 lg:w-3/4">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
              {trip.title}
            </CardTitle>

            <CardDescription className="text-sm text-slate-500">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </CardDescription>

            <CardAction className="flex gap-2">
              <Link to={`/trips/${id}/edit`}>
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
            <Link to={`/baggage/${id}`} className="w-full">
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

        {/* Right part */}
        <div className="flex w-full flex-col gap-4 lg:w-1/4">
          <ExpenseForm trip={trip} />
          <InviteForm trip={trip} />
        </div>

      </div>
    </div>
  )
}

export default TripDetails