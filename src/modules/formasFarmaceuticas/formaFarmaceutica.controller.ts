import { Request, Response, NextFunction } from "express";
import { formaFarmaceuticaService } from "./formaFarmaceutica.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class FormaFarmaceuticaController {
    // Crear una nueva forma farmacéutica
    async createFormaFarmaceutica(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) {
                throw new ApiError(400, "El nombre es requerido");
            }
            const forma = await formaFarmaceuticaService.createFormaFarmaceutica({ nombre, descripcion });
            res.status(201).json(ApiResponse.success("Forma farmacéutica creada exitosamente", forma));
        } catch (error) {
            next(error);
        }
    }

    // Obtener todas las formas farmacéuticas
    async getAllFormasFarmaceuticas(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const formas = await formaFarmaceuticaService.getAllFormasFarmaceuticas();
            res.json(ApiResponse.success("Formas farmacéuticas obtenidas exitosamente", formas));
        } catch (error) {
            next(error);
        }
    }

    // Obtener forma farmacéutica por ID
    async getFormaFarmaceuticaById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const forma = await formaFarmaceuticaService.getFormaFarmaceuticaById(id);
            if (!forma) {
                throw new ApiError(404, "Forma farmacéutica no encontrada");
            }
            res.json(ApiResponse.success("Forma farmacéutica obtenida exitosamente", forma));
        } catch (error) {
            next(error);
        }
    }

    // Actualizar forma farmacéutica por ID
    async updateFormaFarmaceutica(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            if (!nombre && !descripcion) {
                throw new ApiError(400, "Debe proporcionar al menos un campo para actualizar");
            }
            const forma = await formaFarmaceuticaService.updateFormaFarmaceutica(id, { nombre, descripcion });
            if (!forma) {
                throw new ApiError(404, "Forma farmacéutica no encontrada");
            }
            res.json(ApiResponse.success("Forma farmacéutica actualizada exitosamente", forma));
        } catch (error) {
            next(error);
        }
    }

    // Eliminar forma farmacéutica por ID
    async deleteFormaFarmaceutica(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(400, "El ID es requerido");
            }
            const forma = await formaFarmaceuticaService.deleteFormaFarmaceutica(id);
            if (!forma) {
                throw new ApiError(404, "Forma farmacéutica no encontrada");
            }
            res.json(ApiResponse.success("Forma farmacéutica eliminada exitosamente", forma));
        } catch (error) {
            next(error);
        }
    }
}

export const formaFarmaceuticaController = new FormaFarmaceuticaController();