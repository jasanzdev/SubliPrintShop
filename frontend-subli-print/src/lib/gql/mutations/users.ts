import createApolloClient from "@/helpers/apolloClient";
import { CreateUserType, GQLFormattedError } from "@/types/types";
import { ApolloError, gql } from "@apollo/client";

export async function CreateUser(userInput: CreateUserType) {
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
    if (error instanceof ApolloError) {
      if (
        error.graphQLErrors[0]?.extensions &&
        "formattedError" in error.graphQLErrors[0]?.extensions
      ) {
        const formattedError = error.graphQLErrors[0].extensions
          .formattedError as GQLFormattedError;
        return {
          props: { success: false, errors: formattedError.message },
        };
      }
      return {
        props: {
          success: false,
          errors: [error.graphQLErrors[0]?.message],
        },
      };
    }
    return {
      props: {
        success: false,
        errors: ["An unexpected error occurred"],
      },
    };
  }
}
