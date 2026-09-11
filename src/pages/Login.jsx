import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, "Must be at least 5 characters")
    .email("Must be a valid email"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Backend only returns { token } from /auth/login
      const { data: loginData } = await api.post("/auth/login", data);
      const { token } = loginData;

      // Save the token first so the axios interceptor attaches it
      localStorage.setItem("token", token);

      // Decode the token to get the userId, then fetch the full profile
      const { userId } = jwtDecode(token);
      const { data: user } = await api.get(`/users/${userId}`);

      onLogin(token, user);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4 sm:p-6">
      
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

        {/* Image */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1000&auto=format&fit=crop&q=80"
            alt="Mountain landscape at sunrise"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6" />
              <span className="text-lg font-semibold">Wanderwise</span>
            </div>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-sky-100">
              Your quiet co-pilot for stress-free travel planning. Pick up
              right where you left off.
            </p>
          </div>
        </div>

        {/* Login Form */}
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

            <div className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Log in to WanderWise
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Enter your credentials to continue your journey.
              </p>
            </div>

            <div className="space-y-5">

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium text-slate-700"
                    >
                      Email address
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="abc@gmail.com"
                      aria-invalid={fieldState.invalid}
                      className="border-slate-200 focus-visible:ring-sky-200"
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
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </FieldLabel>

                      <Link
                        to="/forgot-password"
                        className="text-xs font-medium text-sky-700 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="********"
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

            <Button
              type="submit"
              className="mt-6 w-full gap-2 bg-sky-700 text-white hover:bg-sky-800"
            >
              Log in
              <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="mt-5 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-sky-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;