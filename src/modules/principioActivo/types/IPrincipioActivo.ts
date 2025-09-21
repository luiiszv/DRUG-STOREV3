import { Document, Schema } from "mongoose";

export interface IPrincipioActivo extends Document {
    _id: Schema.Types.ObjectId;
    nombre: string;
    descripcion?: string;
}
