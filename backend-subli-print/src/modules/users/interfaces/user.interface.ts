import { Role } from 'src/common/enums/roles';

export interface UserPlainObject {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
