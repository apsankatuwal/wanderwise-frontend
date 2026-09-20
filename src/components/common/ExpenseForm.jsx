import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '../../api/axios'
import { toast } from 'sonner'

const formSchema = z.object({
    name: z.string().min(3, "Must be atleast three characters"),
    amount: z.coerce.number().min(1, "must be atleast one digit")
})

const ExpenseForm = ({ trip, onAdded }) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: ""
        }
    });

    const onSubmit = async (data) => {
        if (!trip) {
            toast.error("Trip data not loaded yet.");
            return;
        }

        try {
            const budget = {
                total: trip.budget?.total ?? 0,
                expenses: [
                    ...(trip.budget?.expenses || []),
                    {
                        name: data.name,
                        amount: data.amount
                    }
                ]
            }

            const response = await api.patch(`/trips/${trip._id}`, { budget });

            if (response.status === 200) {
                toast.success("Expense added successfully");
                form.reset();
                onAdded?.(response.data);
            } else {
                toast.error("Error while adding expense");
            }
        } catch (error) {
            toast.error(error.message || "Error while adding expense");
            console.log(error);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold tracking-tight text-slate-900">
                        Add Expense
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        Enter name and amount of expense
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">

                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                    Enter expense name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    placeholder="Ticket"
                                    aria-invalid={fieldState.invalid}
                                    className="border-slate-200 focus-visible:ring-sky-200"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                    Enter expense amount
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="number"
                                    placeholder="1000"
                                    aria-invalid={fieldState.invalid}
                                    className="border-slate-200 focus-visible:ring-sky-200"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </CardContent>
                <CardFooter className="border-t border-slate-100 pt-4">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-sky-700 text-white hover:bg-sky-800"
                    >
                        {form.formState.isSubmitting ? "Adding..." : "Submit"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default ExpenseForm