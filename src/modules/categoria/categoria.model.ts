// modules/categoria/categoria.model.ts
import { Schema, model } from "mongoose";
import { ICategoria } from "./types/ICategoria";

const categoriaSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false }
}, { timestamps: true });



// Exportar modelo
export const CategoriaModel = model<ICategoria>("Categoria", categoriaSchema);
