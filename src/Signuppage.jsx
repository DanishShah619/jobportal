import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add your signup logic here (API call etc.)
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black border-2 border-green-400 shadow-[0_0_20px_#00ff00] rounded-xl p-8 w-full max-w-md text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-400">Sign Up</h2>

        <div className="space-y-2">
          <label htmlFor="name" className="block">Name</label>
          <input
            id="name"
            {...register("name")}
            className="w-full p-2 bg-transparent border-b-2 border-green-400 focus:outline-none focus:ring-0 placeholder-gray-400"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            {...register("email")}
            className="w-full p-2 bg-transparent border-b-2 border-green-400 focus:outline-none focus:ring-0 placeholder-gray-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 bg-transparent border-b-2 border-green-400 focus:outline-none focus:ring-0 placeholder-gray-400"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full p-2 bg-transparent border-b-2 border-green-400 focus:outline-none focus:ring-0 placeholder-gray-400"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
