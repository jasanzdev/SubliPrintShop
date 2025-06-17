export type Product = {
  image: string;
  alt: string;
  price: number;
  description: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export interface CreateUserType {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateUserResponse {
  props: {
    success: boolean;
    user?: {
      name: string;
      username: string;
      email: string;
      role: string;
    };
    error?: string;
  };
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export type GQLFormattedError = {
  error: string;
  message: {
    field: string;
    message: string;
  }[];
  statusCode: number;
};
