// modules/principioActivo/principioActivo.model.ts
import { Schema, model } from "mongoose";
import { IPrincipioActivo } from "./types/IPrincipioActivo";

// Definición del esquema
const principioActivoSchema = new Schema({
    nombre: { type: String, required: true, unique: true }, // Ejemplo: "Acetaminofén", "Ibuprofeno"
    descripcion: { type: String, required: false }, // Texto opcional que describa el principio activo
}, { timestamps: true });




export const PrincipioActivoModel = model<IPrincipioActivo>("PrincipioActivo", principioActivoSchema);
