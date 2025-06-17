import { CreateUser } from "@/lib/gql/mutations/users";
import { CreateUserType } from "@/types/types";

export async function CreateUserService(userInput: CreateUserType) {
  const { props } = await CreateUser(userInput);
  return props;
}
