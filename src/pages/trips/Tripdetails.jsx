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
import TripInfo from '@/components/common/TripInfo'

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

  {/* left part  */}
      <Card className="w-3/4">
        
        <TripInfo trip={trip} />
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