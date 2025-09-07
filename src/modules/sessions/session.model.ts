import { InferSchemaType, Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    token: { type: String, required: true },
    device: { type: String },
    ipAddress: { type: String },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    endedAt: { type: Date }, // Nueva: cuándo terminó la sesión
    logoutReason: { type: String, enum: ["logout", "expired", "revoked"], default: null }, // Nueva
  },
  { timestamps: true, versionKey: false }
);

export type ISession = InferSchemaType<typeof sessionSchema>;

export const SessionModel = model<ISession>("Session", sessionSchema);