import { formaFarmaceuticaRepository } from "./formaFarmaceutica.repository";
import { IFormaFarmaceutica } from "./types/IFormaFarmaceutica";

export class FormaFarmaceuticaService {
  // Crear una nueva forma farmacéutica
  async createFormaFarmaceutica(data: Partial<IFormaFarmaceutica>): Promise<IFormaFarmaceutica> {
    if (!data.nombre) {
      throw new Error("El nombre es requerido");
    }
    return await formaFarmaceuticaRepository.create(data);
  }

  // Obtener todas las formas farmacéuticas
  async getAllFormasFarmaceuticas(): Promise<IFormaFarmaceutica[]> {
    return await formaFarmaceuticaRepository.findAll();
  }

  // Obtener forma farmacéutica por ID
  async getFormaFarmaceuticaById(id: string): Promise<IFormaFarmaceutica | null> {
    return await formaFarmaceuticaRepository.findById(id);
  }

  // Actualizar forma farmacéutica por ID
  async updateFormaFarmaceutica(id: string, update: Partial<IFormaFarmaceutica>): Promise<IFormaFarmaceutica | null> {
    return await formaFarmaceuticaRepository.updateById(id, update);
  }

  // Eliminar forma farmacéutica por ID
  async deleteFormaFarmaceutica(id: string): Promise<IFormaFarmaceutica | null> {
    return await formaFarmaceuticaRepository.deleteById(id);
  }
}

export const formaFarmaceuticaService = new FormaFarmaceuticaService();