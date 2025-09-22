import { Request, Response, NextFunction } from "express";
import { categoriaService } from "./categoria.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class CategoriaController {
    // Crear una nueva categoría
    async createCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) {
                throw new ApiError(400, "El nombre es requerido");
            }
            const categoria = await categoriaService.createCategoria({ nombre, descripcion });
            res.status(201).json(ApiResponse.success("Categoría creada exitosamente", categoria));
        } catch (error) {
            next(error);
        }
    }

    // Obtener todas las categorías
    async getAllCategorias(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categorias = await categoriaService.getAllCategorias();
            res.json(ApiResponse.success("Categorías obtenidas exitosamente", categorias));
        } catch (error) {
            next(error);
        }
    }

    // Obtener categoría por ID
    async getCategoriaById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const categoria = await categoriaService.getCategoriaById(id);
            if (!categoria) {
                throw new ApiError(404, "Categoría no encontrada");
            }
            res.json(ApiResponse.success("Categoría obtenida exitosamente", categoria));
        } catch (error) {
            next(error);
        }
    }

    // Actualizar categoría por ID
    async updateCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }

            if (!nombre && !descripcion) {
                throw new ApiError(400, "Debe proporcionar al menos un campo para actualizar");
            }
            const categoria = await categoriaService.updateCategoria(id, { nombre, descripcion });
            if (!categoria) {
                throw new ApiError(404, "Categoría no encontrada");
            }
            res.json(ApiResponse.success("Categoría actualizada exitosamente", categoria));
        } catch (error) {
            next(error);
        }
    }

    // Eliminar categoría por ID
    async deleteCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const categoria = await categoriaService.deleteCategoria(id);
            if (!categoria) {
                throw new ApiError(404, "Categoría no encontrada");
            }
            res.json(ApiResponse.success("Categoría eliminada exitosamente", categoria));
        } catch (error) {
            next(error);
        }
    }
}

export const categoriaController = new CategoriaController();