import createApolloClient from "@/helpers/apolloClient";
import { CreateUserResponse, CreateUserType } from "@/types/types";
import { ApolloError, gql } from "@apollo/client";

export async function CreateUser(
  userInput: CreateUserType
): Promise<CreateUserResponse> {
  const { name, username, email, password, confirmPassword } = userInput;
  const client = createApolloClient();
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            name
            username
            email
            role
          }
        }
      `,
      variables: {
        input: {
          name,
          username,
          email,
          password,
          confirmPassword,
        },
      },
    });

    return {
      props: {
        success: true,
        user: data.createUser,
      },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof ApolloError) {
      return {
        props: {
          success: false,
          error: error.message,
        },
      };
    }
    return {
      props: { success: false, error: "unknown error" },
    };
  }
}
