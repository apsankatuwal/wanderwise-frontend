
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/api/axios'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import {
  Compass,
  CheckCircle2,
  Plane,
  CalendarClock,
  Wallet,
  MapPin,
  Loader2,
  ArrowRight,
} from 'lucide-react'

const getTripStatus = (trip) => {
  const today = new Date()
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)

  if (today < startDate) return 'upcoming'
  if (today > endDate) return 'completed'
  return 'ongoing'
}

const statusStyles = {
  upcoming: 'bg-sky-50 text-sky-700',
  ongoing: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-slate-100 text-slate-500',
}

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [destinationImages, setDestinationImages] = useState({})

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips')
        setTrips(response.data)
      } catch (error) {
        toast.error('Failed to fetch trips')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  // Fetch images automatically from Unsplash
  useEffect(() => {
    const fetchDestinationImages = async () => {
      if (!trips.length) return

      const destinations = [
        ...new Set(trips.flatMap((trip) => trip.destinations || [])),
      ]

      try {
        const results = await Promise.all(
          destinations.map(async (destination) => {
            try {
              const response = await api.get('/destinations/image', {
                params: {
                  query: destination,
                },
              })

              return {
                destination,
                image: response.data.image,
              }
            } catch (error) {
              console.error(
                `Failed to fetch image for ${destination}`,
                error
              )

              return {
                destination,
                image: null,
              }
            }
          })
        )

        const imageMap = {}

        results.forEach(({ destination, image }) => {
          imageMap[destination] = image
        })

        setDestinationImages(imageMap)
      } catch (error) {
        console.error('Failed to fetch destination images', error)
      }
    }

    fetchDestinationImages()
  }, [trips])

  const stats = useMemo(() => {
    const withStatus = trips.map((t) => ({
      ...t,
      status: getTripStatus(t),
    }))

    const completed = withStatus.filter(
      (t) => t.status === 'completed'
    )

    const ongoing = withStatus.filter(
      (t) => t.status === 'ongoing'
    )

    const upcoming = withStatus
      .filter((t) => t.status === 'upcoming')
      .sort(
        (a, b) =>
          new Date(a.startDate) - new Date(b.startDate)
      )

    const totalBudget = trips.reduce(
      (sum, t) => sum + (t.budget?.total ?? 0),
      0
    )

    const totalSpent = trips.reduce(
      (sum, t) => sum + (t.budget?.spent ?? 0),
      0
    )

    const percentConsumed =
      totalBudget > 0
        ? Math.min((totalSpent / totalBudget) * 100, 100)
        : 0

    const allExpenses = trips.flatMap((t) =>
      (t.budget?.expenses || []).map((e) => ({
        ...e,
        tripTitle: t.title,
      }))
    )

    const topExpenses = [...allExpenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)

    const monthlySpend = {}

    allExpenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString(
        'default',
        { month: 'short' }
      )

      monthlySpend[month] =
        (monthlySpend[month] || 0) + e.amount
    })

    const monthlyEntries =
      Object.entries(monthlySpend).slice(-6)

    const maxMonthly = Math.max(
      1,
      ...monthlyEntries.map(([, v]) => v)
    )

    const destinationMap = {}

    trips.forEach((t) => {
      ;(t.destinations || []).forEach((dest) => {
        if (!destinationMap[dest]) {
          destinationMap[dest] = []
        }

        destinationMap[dest].push(t)
      })
    })

    return {
      withStatus,
      completedCount: completed.length,
      ongoingCount: ongoing.length,
      upcoming,
      totalBudget,
      totalSpent,
      percentConsumed,
      topExpenses,
      monthlyEntries,
      maxMonthly,
      destinationMap,
    }
  }, [trips])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    )
  }

  const nextUpcoming = stats.upcoming[0]

  const daysToNext = nextUpcoming
    ? Math.ceil(
        (new Date(nextUpcoming.startDate) - new Date()) /
          (1000 * 60 * 60 * 24)
      )
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-10 sm:px-10 lg:px-20">

      {/* Welcome banner */}
      <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
              Trip Overview
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Welcome back! Here's your journey summary.
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              You have {stats.ongoingCount} trip
              {stats.ongoingCount !== 1 ? 's' : ''} active
              right now.

              {nextUpcoming && (
                <>
                  {' '}
                  Your next trip leaves in {daysToNext}{' '}
                  day{daysToNext !== 1 ? 's' : ''} for{' '}
                  {nextUpcoming.title}.
                </>
              )}
            </p>
          </div>

          <Link to="/trips/add">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-800">
              <Plane className="h-4 w-4" />
              Plan New Trip
            </button>
          </Link>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total Trips
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50">
                <Compass className="h-4 w-4 text-sky-700" />
              </div>
            </div>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {trips.length}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Completed
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                <CheckCircle2 className="h-4 w-4 text-slate-500" />
              </div>
            </div>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.completedCount}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Ongoing
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                <Plane className="h-4 w-4 text-emerald-600" />
              </div>
            </div>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.ongoingCount}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Upcoming
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50">
                <CalendarClock className="h-4 w-4 text-sky-700" />
              </div>
            </div>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.upcoming.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trips table */}
      <Card className="mt-6 rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6">
          <h3 className="mb-1 text-lg font-semibold text-slate-900">
            Trips Explorer
          </h3>

          <p className="mb-4 text-sm text-slate-500">
            All your trips, in one place.
          </p>

          {trips.length === 0 ? (
            <p className="text-sm text-slate-500">
              No trips yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-3 font-medium">
                      Destination & Route
                    </th>
                    <th className="pb-3 font-medium">
                      Travel Dates
                    </th>
                    <th className="pb-3 font-medium">
                      Status
                    </th>
                    <th className="pb-3 font-medium">
                      Reference ID
                    </th>
                    <th className="pb-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {stats.withStatus.map((trip) => (
                    <tr key={trip._id}>
                      <td className="py-3">
                        <p className="font-medium text-slate-900">
                          {trip.title}
                        </p>

                        <p className="text-xs text-slate-500">
                          {trip.destinations?.join(', ') ||
                            'N/A'}
                        </p>
                      </td>

                      <td className="py-3 text-slate-600">
                        {new Date(
                          trip.startDate
                        ).toLocaleDateString()}{' '}
                        -{' '}
                        {new Date(
                          trip.endDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[trip.status]}`}
                        >
                          {trip.status.charAt(0).toUpperCase() +
                            trip.status.slice(1)}
                        </span>
                      </td>

                      <td className="py-3 font-mono text-xs text-slate-400">
                        #{trip._id.slice(-6).toUpperCase()}
                      </td>

                      <td className="py-3 text-right">
                        <Link
                          to={`/trips/${trip._id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial + Top Expenses */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">

            <div className="mb-4 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-sky-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Travel Budget
              </h3>
            </div>

            <p className="text-3xl font-bold text-slate-900">
              Rs. {stats.totalSpent.toLocaleString()}
              <span className="text-base font-normal text-slate-400">
                {' '}
                spent
              </span>
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Cap: Rs. {stats.totalBudget.toLocaleString()}
            </p>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-amber-600 transition-all duration-500"
                style={{
                  width: `${stats.percentConsumed}%`,
                }}
              />
            </div>

            <div className="mt-1.5 flex justify-between text-xs text-slate-500">
              <span>
                {stats.percentConsumed.toFixed(1)}% consumed
              </span>

              <span>
                Rs.{' '}
                {(
                  stats.totalBudget - stats.totalSpent
                ).toLocaleString()}{' '}
                remaining
              </span>
            </div>

            {stats.monthlyEntries.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Monthly Spend
                </p>

                <div className="flex items-end gap-2">
                  {stats.monthlyEntries.map(
                    ([month, amount]) => (
                      <div
                        key={month}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className="w-full rounded-t-md bg-sky-200"
                          style={{
                            height: `${
                              (amount /
                                stats.maxMonthly) *
                                60 +
                              4
                            }px`,
                          }}
                        />

                        <span className="text-[10px] text-slate-400">
                          {month}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardContent className="p-6">

            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Top Expenses
            </h3>

            {stats.topExpenses.length === 0 ? (
              <p className="text-sm text-slate-500">
                No expenses logged yet.
              </p>
            ) : (
              <div className="space-y-3">
                {stats.topExpenses.map((expense, i) => (
                  <div key={i}>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {expense.name}
                      </span>

                      <span className="font-semibold text-slate-900">
                        Rs. {expense.amount.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      {expense.tripTitle}
                    </p>

                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{
                          width: `${
                            (expense.amount /
                              stats.topExpenses[0]
                                .amount) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Destinations Spotlight */}
      <Card className="mt-6 rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6">

          <h3 className="mb-1 text-lg font-semibold text-slate-900">
            Destinations Spotlight
          </h3>

          <p className="mb-4 text-sm text-slate-500">
            Every place across your trips.
          </p>

          {Object.keys(stats.destinationMap).length === 0 ? (
            <p className="text-sm text-slate-500">
              No destinations added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {Object.entries(
                stats.destinationMap
              ).map(([dest, destTrips]) => (
                <Link
                  key={dest}
                  to={`/trips/${destTrips[0]._id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-100 transition-shadow hover:shadow-md"
                >

                  {/* Destination image */}
                  <div className="relative h-28 overflow-hidden bg-slate-100">

                    {destinationImages[dest] ? (
                      <img
                        src={destinationImages[dest]}
                        alt={dest}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-600 to-sky-800">
                        <MapPin className="h-8 w-8 text-white/80" />
                      </div>
                    )}

                  </div>

                  <div className="p-4">
                    <p className="font-semibold text-slate-900">
                      {dest}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {destTrips.length} trip
                      {destTrips.length > 1 ? 's' : ''}
                    </p>
                  </div>

                </Link>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

    </div>
  )
}

export default Dashboard
