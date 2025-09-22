import { SubcategoriaModel } from "./subcategoria.model";
import { ISubcategoria } from "./types/ISubcategoria";

export class SubcategoriaRepository {
  // Crear una nueva subcategoría
  async create(data: Partial<ISubcategoria>): Promise<ISubcategoria> {
    const subcategoria = new SubcategoriaModel(data);
    return await subcategoria.save();
  }

  // Obtener todas las subcategorías
  async findAll(): Promise<ISubcategoria[]> {
    return await SubcategoriaModel.find().sort({ nombre: 1 });
  }

  // Obtener subcategoría por ID
  async findById(id: string): Promise<ISubcategoria | null> {
    return await SubcategoriaModel.findById(id);
  }

  // Actualizar subcategoría por ID
  async updateById(id: string, update: Partial<ISubcategoria>): Promise<ISubcategoria | null> {
    return await SubcategoriaModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  // Eliminar subcategoría por ID
  async deleteById(id: string): Promise<ISubcategoria | null> {
    return await SubcategoriaModel.findByIdAndDelete(id);
  }
}

export const subcategoriaRepository = new SubcategoriaRepository();