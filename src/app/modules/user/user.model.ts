import { Schema, model } from 'mongoose';

const userSchema = new Schema(
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

export const UserModel = model('User', userSchema);