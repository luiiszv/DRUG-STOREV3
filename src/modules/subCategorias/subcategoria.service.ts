import { subcategoriaRepository } from "./subcategoria.repository";
import { ISubcategoria } from "./types/ISubcategoria";

export class SubcategoriaService {
  // Crear una nueva subcategoría
  async createSubcategoria(data: Partial<ISubcategoria>): Promise<ISubcategoria> {
    if (!data.nombre || !data.categoria) {
      throw new Error("El nombre y la categoría son requeridos");
    }
    return await subcategoriaRepository.create(data);
  }

  // Obtener todas las subcategorías
  async getAllSubcategorias(): Promise<ISubcategoria[]> {
    return await subcategoriaRepository.findAll();
  }

  // Obtener subcategoría por ID
  async getSubcategoriaById(id: string): Promise<ISubcategoria | null> {
    return await subcategoriaRepository.findById(id);
  }

  // Actualizar subcategoría por ID
  async updateSubcategoria(id: string, update: Partial<ISubcategoria>): Promise<ISubcategoria | null> {
    return await subcategoriaRepository.updateById(id, update);
  }

  // Eliminar subcategoría por ID
  async deleteSubcategoria(id: string): Promise<ISubcategoria | null> {
    return await subcategoriaRepository.deleteById(id);
  }
}

export const subcategoriaService = new SubcategoriaService();