import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import ExpenseForm from '../../components/common/ExpenseForm'
import { useParams } from 'react-router-dom'
import api from '../../api/axios'
import { toast } from 'sonner'
import InviteForm from '@/components/common/InviteForm'

const TripDetails = () => {
  const { id } = useParams()

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

  if (!trip) {
    return <div className="px-20 py-8">Loading...</div>
  }

  return (
    <div className="px-20 py-8 flex gap-4">

      {/* Left part */}
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>{trip.title}</CardTitle>

          <CardDescription>
            {trip.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          
        </CardContent>
      </Card>

      {/* Right part */}
      <div className="w-1/4">
        <ExpenseForm trip={trip} />
           <InviteForm trip={trip} />
      </div>

    </div>
  )
}

export default TripDetails