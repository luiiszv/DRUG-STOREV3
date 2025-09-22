import { Request, Response, NextFunction } from "express";
import { concentracionService } from "./concentracion.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class ConcentracionController {
    // Crear una nueva concentración
    async createConcentracion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { valor, unidad } = req.body;
            if (!valor || !unidad) {
                throw new ApiError(400, "El valor y la unidad son requeridos");
            }
            const concentracion = await concentracionService.createConcentracion({ valor, unidad });
            res.status(201).json(ApiResponse.success("Concentración creada exitosamente", concentracion));
        } catch (error) {
            next(error);
        }
    }

    // Obtener todas las concentraciones
    async getAllConcentraciones(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const concentraciones = await concentracionService.getAllConcentraciones();
            res.json(ApiResponse.success("Concentraciones obtenidas exitosamente", concentraciones));
        } catch (error) {
            next(error);
        }
    }

    // Obtener concentración por ID
    async getConcentracionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const concentracion = await concentracionService.getConcentracionById(id);
            if (!concentracion) {
                throw new ApiError(404, "Concentración no encontrada");
            }
            res.json(ApiResponse.success("Concentración obtenida exitosamente", concentracion));
        } catch (error) {
            next(error);
        }
    }

    // Actualizar concentración por ID
    async updateConcentracion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { valor, unidad } = req.body;

            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            if (!valor && !unidad) {
                throw new ApiError(400, "Debe proporcionar al menos un campo para actualizar");
            }
            const concentracion = await concentracionService.updateConcentracion(id, { valor, unidad });
            if (!concentracion) {
                throw new ApiError(404, "Concentración no encontrada");
            }
            res.json(ApiResponse.success("Concentración actualizada exitosamente", concentracion));
        } catch (error) {
            next(error);
        }
    }

    // Eliminar concentración por ID
    async deleteConcentracion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const concentracion = await concentracionService.deleteConcentracion(id);
            if (!concentracion) {
                throw new ApiError(404, "Concentración no encontrada");
            }
            res.json(ApiResponse.success("Concentración eliminada exitosamente", concentracion));
        } catch (error) {
            next(error);
        }
    }
}

export const concentracionController = new ConcentracionController();