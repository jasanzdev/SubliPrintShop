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
      return {
        props: {
          success: false,
          error: error.graphQLErrors[0]?.extensions
            ?.message as GQLFormattedError,
        },
      };
    }
    return {
      props: {
        success: false,
        error: {
          error: "An unexpected error occurred",
          message: [
            {
              field: "general",
              message: "An unexpected error occurred. Please try again later.",
            },
          ],
          statusCode: 500,
        },
      },
    };
  }
}
