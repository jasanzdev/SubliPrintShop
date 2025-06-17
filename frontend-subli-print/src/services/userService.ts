import { CreateUser } from "@/lib/gql/mutations/users";
import { CreateUserType } from "@/types/types";

export async function CreateUserService(userInput: CreateUserType) {
  try {
    const { props } = await CreateUser(userInput);
    if (props.success) {
      return {
        success: true,
        user: props.user,
      };
    } else {
      console.error("Failed to create user:", props.error);
      return {
        success: false,
        error: props.error || "Failed to create user",
      };
    }
  } catch (error) {
    console.error("Creating User error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
