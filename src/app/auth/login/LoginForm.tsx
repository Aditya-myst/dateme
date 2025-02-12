"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import { LoginSchema, loginSchema } from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Enables live validation feedback
  });

  const onSubmit = (data: LoginSchema) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-6">
      <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg shadow-xl rounded-xl border border-gray-600">
        {/* Header */}
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={32} className="text-gray-300" />
            <h1 className="text-3xl font-bold text-white">Login</h1>
          </div>
          <p className="text-gray-400">Welcome back to MatchMe!</p>
        </CardHeader>

        {/* Form */}
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div>
              <Input
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            </div>

            {/* Password Input */}
            <div>
              <Input
                label="Password"
                variant="bordered"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </div>

            {/* Login Button */}
            <Button
              fullWidth
              color="primary"
              type="submit"
              isDisabled={!isValid}
              className="py-3 font-semibold text-lg transition-all transform bg-gray-700 text-white hover:bg-gray-600 hover:shadow-lg hover:scale-105"
            >
              Login
            </Button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
              Sign up
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
