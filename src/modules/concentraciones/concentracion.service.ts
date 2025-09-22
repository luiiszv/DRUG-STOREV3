import { concentracionRepository } from "./concentracion.repository";
import { IConcentracion } from "./types/IConcentracion";

export class ConcentracionService {
  // Crear una nueva concentración
  async createConcentracion(data: Partial<IConcentracion>): Promise<IConcentracion> {
    if (!data.valor || !data.unidad) {
      throw new Error("El valor y la unidad son requeridos");
    }
    return await concentracionRepository.create(data);
  }

  // Obtener todas las concentraciones
  async getAllConcentraciones(): Promise<IConcentracion[]> {
    return await concentracionRepository.findAll();
  }

  // Obtener concentración por ID
  async getConcentracionById(id: string): Promise<IConcentracion | null> {
    return await concentracionRepository.findById(id);
  }

  // Actualizar concentración por ID
  async updateConcentracion(id: string, update: Partial<IConcentracion>): Promise<IConcentracion | null> {
    return await concentracionRepository.updateById(id, update);
  }

  // Eliminar concentración por ID
  async deleteConcentracion(id: string): Promise<IConcentracion | null> {
    return await concentracionRepository.deleteById(id);
  }
}

export const concentracionService = new ConcentracionService();