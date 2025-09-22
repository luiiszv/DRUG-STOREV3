// modules/subcategoria/subcategoria.model.ts
import { Schema, model } from "mongoose";
import { ISubcategoria } from "./types/ISubcategoria";
const subcategoriaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: false },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true } // Relación con Categoría
}, { timestamps: true });



// Exportar modelo
export const SubcategoriaModel = model<ISubcategoria>("Subcategoria", subcategoriaSchema);
