// modules/formaFarmaceutica/formaFarmaceutica.model.ts
import { Schema, model } from "mongoose";
import { IFormaFarmaceutica } from "./types/IFormaFarmaceutica";

// Definición del esquema
const formaFarmaceuticaSchema = new Schema({
    nombre: { type: String, required: true, unique: true }, // Ej: "Tableta", "Cápsula"
    descripcion: { type: String, required: false }, // Opcional: "Sólido en forma de pastilla", "Líquido oral", etc.
}, { timestamps: true });


// Exportar modelo
export const FormaFarmaceuticaModel = model<IFormaFarmaceutica>("FormaFarmaceutica", formaFarmaceuticaSchema);
