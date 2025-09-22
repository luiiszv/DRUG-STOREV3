import { categoriaRepository } from "./categoria.repository";
import { ICategoria } from "./types/ICategoria";

export class CategoriaService {
  // Crear una nueva categoría
  async createCategoria(data: Partial<ICategoria>): Promise<ICategoria> {
    if (!data.nombre) {
      throw new Error("El nombre es requerido");
    }
    return await categoriaRepository.create(data);
  }

  // Obtener todas las categorías
  async getAllCategorias(): Promise<ICategoria[]> {
    return await categoriaRepository.findAll();
  }

  // Obtener categoría por ID
  async getCategoriaById(id: string): Promise<ICategoria | null> {
    return await categoriaRepository.findById(id);
  }

  // Actualizar categoría por ID
  async updateCategoria(id: string, update: Partial<ICategoria>): Promise<ICategoria | null> {
    return await categoriaRepository.updateById(id, update);
  }

  // Eliminar categoría por ID
  async deleteCategoria(id: string): Promise<ICategoria | null> {
    return await categoriaRepository.deleteById(id);
  }
}

export const categoriaService = new CategoriaService();