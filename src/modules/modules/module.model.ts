

import { Schema, model, InferSchemaType } from "mongoose";


const moduleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Ej: "Ventas", "Inventario"
    description: { type: String },
}, { timestamps: true });

export type IModule = InferSchemaType<typeof moduleSchema>;
export const ModuleModel = model<IModule>("Modules", moduleSchema);