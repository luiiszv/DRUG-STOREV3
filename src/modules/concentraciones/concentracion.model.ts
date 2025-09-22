// modules/concentracion/concentracion.model.ts
import { Schema, model } from "mongoose";
import { IConcentracion } from "./types/IConcentracion";

// Definición del esquema
const concentracionSchema = new Schema({
    valor: { type: String, required: true },
    unidad: { type: String, required: true },
}, { timestamps: true });



// Exportar modelo
export const ConcentracionModel = model<IConcentracion>("Concentracion", concentracionSchema);
