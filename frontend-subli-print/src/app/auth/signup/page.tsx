"use client";

import Link from "next/link";

import { SignUpForm } from "@/features/auth/components/signup/signup-form";

export default function SignUp() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-bg-color font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create an account
            </h1>
          </div>
          <SignUpForm />
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
