"use client";

import { type ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Label } from "./label";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  forgot?: boolean;
  error?: string;
  showPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
  minLength?: number;
}

export function PasswordInput({
  id,
  name,
  value,
  placeholder,
  label,
  required = false,
  disabled = false,
  error,
  forgot,
  showPassword,
  onChange,
  onToggleVisibility,
  minLength,
}: PasswordInputProps) {
  return (
    <div className="w-full">
      {forgot ? (
        <div className="mb-1 flex items-center justify-between gap-3">
          <Label id={id}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>

          <Link
            className="text-sm text-gray-600 hover:underline"
            href="/auth/reset-password"
          >
            Forgot?
          </Link>
        </div>
      ) : (
        <Label id={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative w-full">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`form-input w-full pr-12 ${
            error ? "border-2 border-red-600" : ""
          }`}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          disabled={disabled}
          pattern="/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/"
        />
        <button
          type="button"
          className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center pr-4 
            rounded-r-md h-full hover:text-indigo-600 transition-colors"
          onClick={onToggleVisibility}
          aria-label={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword ? (
            <Eye className="w-5 h-5 text-indigo-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-indigo-400" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
