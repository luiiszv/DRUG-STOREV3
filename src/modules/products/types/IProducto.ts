import { Schema, Document } from "mongoose";

export interface IProducto extends Document {
    _id: Schema.Types.ObjectId;
    nombreComercial: string;
    nombreGenerico: string;
    principioActivo: Schema.Types.ObjectId;
    concentracion: Schema.Types.ObjectId;
    formaFarmaceutica: Schema.Types.ObjectId;
    subcategoria: Schema.Types.ObjectId;
    laboratorio: Schema.Types.ObjectId;
    unidadMedida: Schema.Types.ObjectId;
    codigoBarras?: string;
    stockMinimo: number;
    createdAt: Date;
    updatedAt: Date;
}