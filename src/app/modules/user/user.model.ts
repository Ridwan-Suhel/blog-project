import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema <IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isBlocked: { type: Boolean, default: false },
      }, {
        timestamps: true,
      }
  );

export const UserModel = model<IUser>('User', userSchema);