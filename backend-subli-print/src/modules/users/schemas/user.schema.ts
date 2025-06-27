import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthProvider } from 'src/common/constants/auth-provider';
import { Role } from 'src/common/constants/roles.';

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
  versionKey: false,
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ type: String, default: 'CLIENT' })
  role: Role;

  @Prop()
  googleId?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: 'local' })
  provider: AuthProvider;
}

export const UserSchema = SchemaFactory.createForClass(User);
