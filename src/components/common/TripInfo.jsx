import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Calendar, Clock, DollarSign, Edit, MapPin, Trash2, User, Users } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import api from '@/api/axios'
import { toast } from 'sonner'
import { formatDate } from '@/lib/formatter'

const TripInfo = ({ trip }) => {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    const deleteTrip = async () => {
        setDeleting(true);
        try {
            const response = await api.delete(`/trips/${trip._id}`);

            if (response.status === 200) {
                toast.success("Trip deleted successfully!");
                navigate('/trips');
            } else {
                toast.error("Some error occured");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Some error occured");
        } finally {
            setDeleting(false);
        }
    }

    const getTripStatus = () => {
        if (!trip) return { label: "Upcoming", tone: "upcoming" }

        const today = new Date()
        const startDate = new Date(trip.startDate)
        const endDate = new Date(trip.endDate)

        if (today < startDate) return { label: "Upcoming", tone: "upcoming" }
        if (today > endDate) return { label: "Completed", tone: "completed" }
        return { label: "Active", tone: "active" }
    }

    const calculateDaysUntilTrip = () => {
        if (!trip) return 0
        const today = new Date()
        const startDate = new Date(trip.startDate)
        const diffTime = startDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }
    const calculateTripDuration = () => {
        if (!trip) return 0
        const startDate = new Date(trip.startDate)
        const endDate = new Date(trip.endDate)
        const diffTime = endDate.getTime() - startDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const getBudgetProgress = () => {
        if (!trip) return 0
        return (trip.budget.spent / trip.budget.total) * 100
    }

    const getRemainingBudget = () => {
        if (!trip) return 0
        return trip.budget.total - trip.budget.spent
    }

    const status = getTripStatus()
    const daysUntilTrip = calculateDaysUntilTrip()
    const tripDuration = calculateTripDuration()
    const budgetProgress = getBudgetProgress()
    const remainingBudget = getRemainingBudget()

    return (
        <Card className="mb-6 rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold text-slate-900 mb-2">{trip.title}</CardTitle>
                        <CardDescription className="text-lg text-slate-500">{trip.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to={`/trips/${trip._id}/edit`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Trip
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={deleteTrip}
                            disabled={deleting}
                            className={"text-red-600 hover:text-red-600 hover:bg-red-50"}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Trip Status */}
                <div className="flex items-center justify-between p-4 bg-sky-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                        <Clock className="h-6 w-6 text-sky-700" />
                        <div>
                            <p className="font-semibold text-sky-900">
                                {status.tone === "upcoming"
                                    ? daysUntilTrip === 0
                                        ? "Departing today!"
                                        : `${daysUntilTrip} days until departure`
                                    : status.tone === "completed"
                                        ? "Trip completed"
                                        : "Trip in progress"}
                            </p>
                            <p className="text-sm text-sky-700">{tripDuration} day trip</p>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="border-sky-200 bg-white text-sky-700"
                    >
                        {status.label}
                    </Badge>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-2xl">
                        <Calendar className="h-6 w-6 text-sky-700" />
                        <div>
                            <p className="font-semibold text-slate-900">Start Date</p>
                            <p className="text-slate-500">
                                {formatDate(trip.startDate)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-2xl">
                        <Calendar className="h-6 w-6 text-slate-400" />
                        <div>
                            <p className="font-semibold text-slate-900">End Date</p>
                            <p className="text-slate-500">
                                {formatDate(trip.endDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Destinations */}
                <div className='border-b border-slate-100 pb-8'>
                    <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-5 w-5 text-sky-700" />
                        <h3 className="text-lg font-semibold text-slate-900">Destinations</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {trip.destinations.map((destination, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="rounded-full border-none bg-sky-50 px-3 py-1 text-sky-800"
                            >
                                {destination}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Budget Overview */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="h-5 w-5 text-sky-700" />
                        <h3 className="text-lg font-semibold text-slate-900">Budget Overview</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-4 bg-slate-50 rounded-2xl">
                            <p className="text-sm text-slate-500">Total Budget</p>
                            <p className="text-2xl font-bold text-slate-900">${trip.budget.total}</p>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-2xl">
                            <p className="text-sm text-slate-500">Spent</p>
                            <p className="text-2xl font-bold text-amber-700">${trip.budget.spent}</p>
                        </div>
                        <div className="text-center p-4 bg-sky-50 rounded-2xl">
                            <p className="text-sm text-slate-500">Remaining</p>
                            <p className="text-2xl font-bold text-sky-700">${remainingBudget}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-600">
                            <span>Budget Progress</span>
                            <span>{budgetProgress.toFixed(1)}%</span>
                        </div>
                        <Progress value={budgetProgress} className="h-1.5" />
                    </div>
                </div>

                {/* Recent Expenses */}
                {trip.budget.expenses.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-3 text-slate-900">Recent Expenses</h4>
                        <div className="space-y-2">
                            {trip.budget.expenses.map((expense, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                                    <div>
                                        <p className="font-medium text-slate-900">{expense.name}</p>
                                        <p className="text-sm text-slate-500">{new Date(expense.date).toLocaleString()}</p>
                                    </div>
                                    <p className="font-semibold text-slate-900">${expense.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Collaborators */}
                {trip.collaborators.length > 0 && (
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <Users className="h-5 w-5 text-sky-700" />
                            <h3 className="text-lg font-semibold text-slate-900">Collaborators</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {trip.collaborators.map((member, index) => (
                                <div key={index} className="flex items-center space-x-4 p-2 bg-slate-50 rounded-2xl">
                                    <div className='p-2 bg-sky-100 rounded-full'>
                                        <User className='w-4 h-4 text-sky-700' />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-900">{member.name}</p>
                                        <span className='text-xs text-slate-400'>{member.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TripInfo