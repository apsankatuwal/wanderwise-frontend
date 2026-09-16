import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { MapPin, ArrowRight, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "../../api/axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Field, FieldError, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const formSchema = z
  .object({
    title: z.string().min(5, "Must be at least 5 characters"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    destinations: z
      .array(
        z.object({ value: z.string().min(3, "Must be at least 3 characters") }),
      )
      .min(1, "At least one destination is required"),
    budget: z.object({
      total: z.coerce.number().min(1, "Must be at least 1"),
      spent: z.coerce.number().min(0).optional(),
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["startDate"],
  });

const EditTrip = () => {
  const navigate = useNavigate();
  const { tripId: id } = useParams();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      destinations: [{ value: "" }],
      budget: { total: "", spent: "" },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        const trip = response.data;

        form.reset({
          title: trip.title || "",
          description: trip.description || "",
          startDate: trip.startDate ? trip.startDate.split("T")[0] : "",
          endDate: trip.endDate ? trip.endDate.split("T")[0] : "",
          destinations:
            trip.destinations?.length > 0
              ? trip.destinations.map((d) => ({ value: d }))
              : [{ value: "" }],
          budget: {
            total: trip.budget?.total ?? "",
            spent: trip.budget?.spent ?? "",
          },
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, form]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      destinations: data.destinations.map((d) => d.value),
    };
    try {
      await api.patch(`/trips/${id}`, payload);
      toast.success("Trip updated successfully!");
      navigate(`/trips/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update trip.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 sm:p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
          <CardHeader>
            <div className="mb-1 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-sky-700" />
              <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
                Edit your Trip
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">
              Update the details of your trip.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Trip Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700"
                  >
                    Enter trip title
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="Trip to Nepal with Friends"
                    aria-invalid={fieldState.invalid}
                    className="border-slate-200 focus-visible:ring-sky-200"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700"
                  >
                    Enter trip description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Trip to Nepal with Friends"
                    aria-invalid={fieldState.invalid}
                    className="border-slate-200 focus-visible:ring-sky-200"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="startDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-slate-700"
                    >
                      Start date
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="date"
                      aria-invalid={fieldState.invalid}
                      className="border-slate-200 focus-visible:ring-sky-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="endDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-slate-700"
                    >
                      End date
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="date"
                      aria-invalid={fieldState.invalid}
                      className="border-slate-200 focus-visible:ring-sky-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Destinations */}
            <div className="space-y-3">
              <FieldLabel className="text-sm font-medium text-slate-700">
                Destinations
              </FieldLabel>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`destinations.${index}.value`}
                    control={form.control}
                    render={({ field: inputField, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center gap-2">
                          <Input
                            {...inputField}
                            id={inputField.name}
                            type="text"
                            placeholder="Pokhara"
                            aria-invalid={fieldState.invalid}
                            className="border-slate-200 focus-visible:ring-sky-200"
                          />
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              aria-label="Remove destination"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-sky-200 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
              >
                <Plus className="h-4 w-4" /> Add destination
              </button>
            </div>

            {/* Budget */}
            <div className="grid grid-cols-2 gap-3">
              <Controller
                name="budget.total"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-slate-700"
                    >
                      Total budget
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      placeholder="20000"
                      aria-invalid={fieldState.invalid}
                      className="border-slate-200 focus-visible:ring-sky-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="budget.spent"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-slate-700"
                    >
                      Amount spent
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      placeholder="2000"
                      aria-invalid={fieldState.invalid}
                      className="border-slate-200 focus-visible:ring-sky-200"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-2 w-full gap-2 bg-sky-700 text-white hover:bg-sky-800"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Save Changes <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EditTrip;
