"use client";

import Link from "next/link";
import { FormInput } from "@/components/auth/form-input";
import { ChangeEvent, useState } from "react";
import { CreateUserType } from "@/types/types";
import { CreateUserService } from "@/services/userService";
import { PasswordInput } from "@/components/auth/password-input";

export default function SignUp() {
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<CreateUserType>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [id]: value };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { user, errors } = await CreateUserService(formData);
    if (errors) {
      setErrors(errors);
      return;
    }
    if (user) {
      console.log("User created successfully:", user);
      // Redirect or show success message
      // For example, you can redirect to the sign-in page:
      window.location.href = "/auth/signin";
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-bg-color font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create an account
            </h1>
          </div>
          <div className="flex flex-col place-content-center text-center mx-auto max-w-[600px]">
            {errors.length > 0 && (
              <div className="mb-4 text-red-600">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <FormInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                label="Name"
                required
              />

              <FormInput
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                label="Username"
                required
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                label="Email"
                required
              />

              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                placeholder="Type Password"
                label="Password"
                required
                showPassword={showPassword}
                onChange={handleChange}
                onToggleVisibility={togglePasswordVisibility}
              />

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                label="Confirm Password"
                required
                showPassword={showConfirmPassword}
                onChange={handleChange}
                onToggleVisibility={toggleConfirmPasswordVisibility}
              />
            </div>

            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Register
              </button>

              <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-linear-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-linear-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>

              <button className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Sign In with Google
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Already have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/auth/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
