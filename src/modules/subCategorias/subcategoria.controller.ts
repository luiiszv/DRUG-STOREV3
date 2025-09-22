import { Request, Response, NextFunction } from "express";
import { subcategoriaService } from "./subcategoria.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class SubcategoriaController {
  // Crear una nueva subcategoría
  async createSubcategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre, descripcion, categoria } = req.body;
      if (!nombre || !categoria) {
        throw new ApiError(400, "El nombre y la categoría son requeridos");
      }
      const subcategoria = await subcategoriaService.createSubcategoria({ nombre, descripcion, categoria });
      res.status(201).json(ApiResponse.success("Subcategoría creada exitosamente", subcategoria));
    } catch (error) {
      next(error);
    }
  }

  // Obtener todas las subcategorías
  async getAllSubcategorias(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subcategorias = await subcategoriaService.getAllSubcategorias();
      res.json(ApiResponse.success("Subcategorías obtenidas exitosamente", subcategorias));
    } catch (error) {
      next(error);
    }
  }

  // Obtener subcategoría por ID
  async getSubcategoriaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new ApiError(400, "El ID es requerido");
      }
      const subcategoria = await subcategoriaService.getSubcategoriaById(id);
      if (!subcategoria) {
        throw new ApiError(404, "Subcategoría no encontrada");
      }
      res.json(ApiResponse.success("Subcategoría obtenida exitosamente", subcategoria));
    } catch (error) {
      next(error);
    }
  }

  // Actualizar subcategoría por ID
  async updateSubcategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, descripcion, categoria } = req.body;
      if (!id) {
        throw new ApiError(400, "El ID es requerido");
      }

      if (!nombre && !descripcion && !categoria) {
        throw new ApiError(400, "Debe proporcionar al menos un campo para actualizar");
      }
      const subcategoria = await subcategoriaService.updateSubcategoria(id, { nombre, descripcion, categoria });
      if (!subcategoria) {
        throw new ApiError(404, "Subcategoría no encontrada");
      }
      res.json(ApiResponse.success("Subcategoría actualizada exitosamente", subcategoria));
    } catch (error) {
      next(error);
    }
  }

  // Eliminar subcategoría por ID
  async deleteSubcategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError(400, "El ID es requerido");
      }
      const subcategoria = await subcategoriaService.deleteSubcategoria(id);
      if (!subcategoria) {
        throw new ApiError(404, "Subcategoría no encontrada");
      }
      res.json(ApiResponse.success("Subcategoría eliminada exitosamente", subcategoria));
    } catch (error) {
      next(error);
    }
  }
}

export const subcategoriaController = new SubcategoriaController();