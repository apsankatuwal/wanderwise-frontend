import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/common/Navbar";

import api from "../api/axios";
import useAuth from "../hooks/useAuth";

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, "Name must be at least 5 characters"),

    email: z
      .string()
      .trim()
      .email("Must be a valid email"),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const { onLogin, token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...newData } = data;

    try {
      // Register user
      const response = await api.post("/auth/register", newData);

      const token = response.data?.token;

      if (!token) {
        throw new Error(
          "Registration successful, but no token was returned."
        );
      }

      // Save token
      localStorage.setItem("token", token);

      // Decode JWT
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      if (!userId) {
        throw new Error("Invalid authentication token.");
      }

      // Get user profile
      const userResponse = await api.get(`/users/${userId}`);
      const user = userResponse.data;

      // Update authentication state
      onLogin(token, user);

      toast.success("Account created successfully!");

      // Navigation is handled by useEffect
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-dvh w-full">
      <Navbar />

      <div className="flex min-h-[calc(100dvh-64px)] w-full items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 sm:p-6">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

          {/* Image */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000&h=1500&auto=format&fit=crop&q=80"
              alt="Traveler exploring a scenic trail"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-sky-950/10 to-transparent" />

            <div className="absolute bottom-0 p-8 text-white">
              <div className="flex items-center gap-2">
                <Compass className="h-6 w-6" />

                <span className="text-lg font-semibold">
                  Wanderwise
                </span>
              </div>

              <p className="mt-3 max-w-xs text-sm text-sky-100">
                Create an account and start turning your travel ideas into
                unforgettable journeys.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex items-center p-6 sm:p-10">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full"
            >

              {/* Mobile Logo */}
              <div className="mb-6 flex items-center gap-2 lg:hidden">
                <Compass className="h-6 w-6 text-sky-700" />

                <span className="text-lg font-semibold text-slate-900">
                  Wanderwise
                </span>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Register to Wanderwise
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Create your account to continue your journey.
                </p>
              </div>

              <div className="space-y-5">

                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Ram Bahadur"
                        aria-invalid={fieldState.invalid}
                        className="border-0 bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-200"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="abc@gmail.com"
                        aria-invalid={fieldState.invalid}
                        className="border-0 bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-200"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Password
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                        className="border-0 bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-200"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm password
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                        className="border-0 bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-200"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-6 w-full gap-2 bg-sky-700 text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Register"}

                {!form.formState.isSubmitting && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>

              {/* Login Link */}
              <p className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-700 hover:underline"
                >
                  Log in
                </Link>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;