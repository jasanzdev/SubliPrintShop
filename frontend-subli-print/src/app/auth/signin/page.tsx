"use client";

import { SignInForm } from "@/features/auth/components/signin/sigin-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>
          {/* Sign In Form */}
          <SignInForm />
          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Don`t you have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/auth/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
