import { CategoriaModel } from "./categoria.model";
import { ICategoria } from "./types/ICategoria";

export class CategoriaRepository {
  // Crear una nueva categoría
  async create(data: Partial<ICategoria>): Promise<ICategoria> {
    const categoria = new CategoriaModel(data);
    return await categoria.save();
  }

  // Obtener todas las categorías
  async findAll(): Promise<ICategoria[]> {
    return await CategoriaModel.find().sort({ nombre: 1 });
  }

  // Obtener categoría por ID
  async findById(id: string): Promise<ICategoria | null> {
    return await CategoriaModel.findById(id);
  }

  // Actualizar categoría por ID
  async updateById(id: string, update: Partial<ICategoria>): Promise<ICategoria | null> {
    return await CategoriaModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  // Eliminar categoría por ID
  async deleteById(id: string): Promise<ICategoria | null> {
    return await CategoriaModel.findByIdAndDelete(id);
  }
}

export const categoriaRepository = new CategoriaRepository();