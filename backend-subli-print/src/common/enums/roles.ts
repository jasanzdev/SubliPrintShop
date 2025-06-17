export const Roles = ['CLIENT', 'ADMIN', 'MANAGER'] as const;

export type Role = (typeof Roles)[number];
