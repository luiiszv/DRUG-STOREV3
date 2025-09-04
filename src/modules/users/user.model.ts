import { Schema, model, InferSchemaType } from "mongoose";



const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Roles" }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export type IUser = InferSchemaType<typeof userSchema>; // Interface IUser

export const UserModel = model<IUser>("User", userSchema);