import { Schema, model, Types, InferSchemaType } from "mongoose";



const permissions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;


const RoleModuleSchema = new Schema({
  module: { type: Types.ObjectId, ref: "Module", required: true },
  permissions: {
    type: [String],
    enum: permissions,   // asegura que solo se guarden permisos válidos
    required: true,
    default: ["READ"]    // por defecto solo lectura
  }
}, { _id: false });

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ej: "Administrador", "Cajero"
  description: { type: String },
  modules: { type: [RoleModuleSchema], default: [] } // lista de módulos con permisos
}, {
  timestamps: true
});


export type IRole = InferSchemaType<typeof RoleSchema>;
export const RoleModel = model<IRole>("Roles", RoleSchema);