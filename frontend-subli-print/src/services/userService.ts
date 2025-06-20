import { CreateUser } from "@/features/auth/lib/users-mutations";
import { CreateUserType } from "@/types/types";

export async function CreateUserService(userInput: CreateUserType) {
  const { props } = await CreateUser(userInput);
  return props;
}
