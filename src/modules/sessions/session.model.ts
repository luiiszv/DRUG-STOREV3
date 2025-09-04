
import { InferSchemaType, Schema, model } from "mongoose";


const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    device: { type: String },
    ipAddress: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

export type ISession = InferSchemaType<typeof sessionSchema>; // Interface ISession

export const SessionModel = model<ISession>("Session", sessionSchema);