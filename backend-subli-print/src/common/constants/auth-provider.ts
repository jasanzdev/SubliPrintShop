export const AuthProviders = ['local', 'google'] as const;

export type AuthProvider = (typeof AuthProviders)[number];
