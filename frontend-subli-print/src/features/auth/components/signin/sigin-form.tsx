import { ChangeEvent, useState } from "react";
import { Login } from "@/features/auth/services/authService";
import { FormInput } from "../input";
import { PasswordInput } from "../password-input";

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await Login(credentials);
    if (response.success) {
      window.location.href = "/";
      return;
    }
    setError(response.error?.message || "An error occurred during login.");
  };
  return (
    <>
      <div className="mb-6">
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
      </div>
      <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <FormInput
            id="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Type Your Email"
            label="Email"
            required
          />

          <PasswordInput
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Type Password"
            label="Password"
            forgot
            required
            minLength={8}
            showPassword={showPassword}
            onChange={handleChange}
            onToggleVisibility={togglePasswordVisibility}
          />
        </div>
        <div className="mt-6 space-y-5">
          <button
            type="submit"
            className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom]
               text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
          >
            Sign in
          </button>
          <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-linear-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-linear-to-r after:from-transparent after:via-gray-400/25">
            or
          </div>
          <button className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
            Sign In with Google
          </button>
        </div>
      </form>
    </>
  );
}
