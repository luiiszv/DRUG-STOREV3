import { Schema, model } from "mongoose";
import { IProducto } from "./types/IProducto";

const productoSchema = new Schema({
  nombreComercial: { type: String, required: true },
  nombreGenerico: { type: String, required: true },
  principioActivo: { type: Schema.Types.ObjectId, ref: "PrincipioActivo", required: true },
  concentracion: { type: Schema.Types.ObjectId, ref: "Concentracion", required: true },
  formaFarmaceutica: { type: Schema.Types.ObjectId, ref: "FormaFarmaceutica", required: true },
  subcategoria: { type: Schema.Types.ObjectId, ref: "Subcategoria", required: true },
  laboratorio: { type: Schema.Types.ObjectId, ref: "Laboratorio", required: true }, // FALTA Laboratorio que fabrica el producto
  unidadMedida: { type: Schema.Types.ObjectId, ref: "UnidadMedida", required: true },
  codigoBarras: { type: String, unique: true },
  stockMinimo: { type: Number, default: 0 }
}, { timestamps: true });


export const ProductoModel = model<IProducto>("Producto", productoSchema);
