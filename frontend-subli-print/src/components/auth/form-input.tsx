"use client";

import type { ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
}

export function FormInput({
  id,
  name,
  type,
  value,
  placeholder,
  label,
  required = false,
  disabled = false,
  error,
  onChange,
  minLength,
}: FormInputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-indigo-200/65"
        htmlFor={id}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`form-input w-full ${
          error ? "border-2 border-red-600" : ""
        }`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        minLength={minLength}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
