import { ConcentracionModel } from "./concentracion.model";
import { IConcentracion } from "./types/IConcentracion";

export class ConcentracionRepository {
  // Crear una nueva concentración
  async create(data: Partial<IConcentracion>): Promise<IConcentracion> {
    const concentracion = new ConcentracionModel(data);
    return await concentracion.save();
  }

  // Obtener todas las concentraciones
  async findAll(): Promise<IConcentracion[]> {
    return await ConcentracionModel.find().sort({ valor: 1, unidad: 1 });
  }

  // Obtener concentración por ID
  async findById(id: string): Promise<IConcentracion | null> {
    return await ConcentracionModel.findById(id);
  }

  // Actualizar concentración por ID
  async updateById(id: string, update: Partial<IConcentracion>): Promise<IConcentracion | null> {
    return await ConcentracionModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  // Eliminar concentración por ID
  async deleteById(id: string): Promise<IConcentracion | null> {
    return await ConcentracionModel.findByIdAndDelete(id);
  }
}

export const concentracionRepository = new ConcentracionRepository();