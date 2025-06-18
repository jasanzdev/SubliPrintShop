import { CreateUser } from "@/features/auth/lib/gql/users-mutations";
import { CreateUserType } from "@/shared/types/types";

export async function CreateUserService(userInput: CreateUserType) {
  const { props } = await CreateUser(userInput);
  return props;
}
