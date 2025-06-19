import { ChangeEvent, useState } from "react";
import { CreateUserType, GQLFormattedError } from "@/shared/types/types";
import { CreateUserService } from "@/features/auth/services/userService";
import { PasswordInput } from "@/features/auth/components/password-input";
import { FormInput } from "../input";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<GQLFormattedError["message"]>([]);
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
    const newFormData = { ...formData, [id]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error.length > 0) return;
    if (formData.password !== formData.confirmPassword) {
      setError((prev) => [
        ...prev,
        { field: "confirmPassword", message: "Passwords do not match" },
      ]);
      return;
    }
    const { axiosError } = await CreateUserService(formData);

    if (axiosError) {
      setError(axiosError.message);
      return;
    }

    window.location.href = "/auth/signin";
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
      <div className="space-y-5">
        <FormInput
          id="name"
          name="name"
          type="text"
          minLength={3}
          error={error?.find((err) => err.field === "name")?.message}
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
          minLength={3}
          error={error?.find((err) => err.field === "username")?.message}
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
          error={error?.find((err) => err.field === "email")?.message}
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
          minLength={8}
          error={error?.find((err) => err.field === "password")?.message}
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
          error={error?.find((err) => err.field === "confirmPassword")?.message}
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
  );
}
