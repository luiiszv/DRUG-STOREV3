import { FormaFarmaceuticaModel } from "./formaFarmaceutica.model";
import { IFormaFarmaceutica } from "./types/IFormaFarmaceutica";

export class FormaFarmaceuticaRepository {
  // Crear una nueva forma farmacéutica
  async create(data: Partial<IFormaFarmaceutica>): Promise<IFormaFarmaceutica> {
    const forma = new FormaFarmaceuticaModel(data);
    return await forma.save();
  }

  // Obtener todas las formas farmacéuticas
  async findAll(): Promise<IFormaFarmaceutica[]> {
    return await FormaFarmaceuticaModel.find().sort({ nombre: 1 });
  }

  // Obtener forma farmacéutica por ID
  async findById(id: string): Promise<IFormaFarmaceutica | null> {
    return await FormaFarmaceuticaModel.findById(id);
  }

  // Actualizar forma farmacéutica por ID
  async updateById(id: string, update: Partial<IFormaFarmaceutica>): Promise<IFormaFarmaceutica | null> {
    return await FormaFarmaceuticaModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  // Eliminar forma farmacéutica por ID
  async deleteById(id: string): Promise<IFormaFarmaceutica | null> {
    return await FormaFarmaceuticaModel.findByIdAndDelete(id);
  }
}

export const formaFarmaceuticaRepository = new FormaFarmaceuticaRepository();