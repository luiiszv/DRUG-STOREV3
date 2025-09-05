import { Schema, model, Types, InferSchemaType } from "mongoose";



const permissions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;



const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ej: "Administrador", "Cajero"
  description: { type: String },
  modules: [
    {
      module: { type: Types.ObjectId, ref: "Modules", required: true },
      permissions: {
        type: [String],
        enum: permissions,
        required: true,
        default: ["READ"]
      }
    }
  ]
}, {
  timestamps: true
});


export type IRole = InferSchemaType<typeof RoleSchema>;
export const RoleModel = model<IRole>("Roles", RoleSchema);