"use client";
import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
  const result = await registerUser(data);

  if(result.status ==="success"){
    console.log("User registered successfully");

  }else{
    if(Array.isArray(result.error)){
      result.error.forEach((e:any)=>{
        console.log("e:::",e);
        const fieldName = e.path.join(".") as 
        |"email"
        |"name"
        |"password";
        setError(fieldName,{
          message:e.message,
        });
      });

    }else{
      setError("root.serveError",{
        message:result.error
      });
    }
  }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center justify-center mb-4">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={36} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">Create your account to get started</p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              variant="bordered"
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              className="rounded-lg"
            />
            <Input
              label="Email Address"
              variant="bordered"
              type="email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              className="rounded-lg"
            />
            <Input
  label="Password"
  variant="bordered"
  type="password"
  {...register("password")}
  isInvalid={!!errors.password}
  errorMessage={errors.password?.message} // Will now show the "Password should be at least 8 characters long" error
  className="rounded-lg"
/>


            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="primary"
              type="submit"
              className="mt-3 text-lg font-medium rounded-lg shadow-md"
            >
              Create Account
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
