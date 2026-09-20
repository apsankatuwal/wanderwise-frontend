import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Plus, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '../../api/axios'
import { toast } from 'sonner'

const formSchema = z.object({
    emails: z
        .array(
            z.object({ value: z.string().email("Must be a valid email") })
        )
        .min(1, "At least one email is required")
})

const InviteForm = ({ trip }) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emails: [{ value: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "emails",
    });

    const onSubmit = async (data) => {
        if (!trip) {
            toast.error("Trip data not loaded yet.");
            return;
        }

        try {
            const response = await api.post(`/trips/${trip._id}/invite`, {
                collaboratorEmails: data.emails.map((e) => e.value)
            });

            if (response.status === 200) {
                toast.success(response.data?.message || "Invitation sent successfully");
                form.reset({ emails: [{ value: "" }] });
            } else {
                toast.error("Error while sending invite");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message || "Error while sending invite"
            );
            console.log(error);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-semibold tracking-tight text-slate-900">
                        Invite Collaborators
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                        Enter their emails to invite them to this trip
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">

                    {fields.map((field, index) => (
                        <Controller
                            key={field.id}
                            name={`emails.${index}.value`}
                            control={form.control}
                            render={({ field: inputField, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={inputField.name} className="text-sm font-medium text-slate-700">
                                        Collaborator email
                                    </FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            {...inputField}
                                            id={inputField.name}
                                            type="email"
                                            placeholder="friend@example.com"
                                            aria-invalid={fieldState.invalid}
                                            className="border-slate-200 focus-visible:ring-sky-200"
                                        />
                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                aria-label="Remove email"
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ value: "" })}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-sky-200 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                    >
                        <Plus className="h-4 w-4" />
                        Add another
                    </button>

                </CardContent>
                <CardFooter className="border-t border-slate-100 pt-4">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-sky-700 text-white hover:bg-sky-800"
                    >
                        {form.formState.isSubmitting ? "Sending..." : "Send Invites"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default InviteForm