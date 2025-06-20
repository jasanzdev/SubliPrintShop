import { CreateUserType, GQLFormattedError } from "@/shared/types/types";
import { useEffect, useState } from "react";

export function useValidateForm(formData: CreateUserType) {
  

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
        return {
        error: [{ field: "confirmPassword", message: "Passwords do not match" }],
      }
  }, [formData]);

  return { error };
}
