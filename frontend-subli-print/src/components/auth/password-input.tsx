"use client";

import { type ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
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
  showPassword,
  onChange,
  onToggleVisibility,
  minLength,
}: PasswordInputProps) {
  return (
    <div className="w-full">
      <label
        className="mb-1 block text-sm font-medium text-indigo-200/65"
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
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
