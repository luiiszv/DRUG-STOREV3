import { ModuleModel } from "../../modules/modules/module.model";
import { UserModel } from "../../modules/users/user.model";
import { ApiError } from "../errors/ApiError";
import "../../modules/roles/rol.model";

import { Request, Response, NextFunction } from "express";

export function authorizeRole(moduleName: string, requiredPermissions: string[]) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id || req.user?._id;
            if (!userId) return next(ApiError.unauthorized("No autenticado"));


            // Busca el módulo por nombre
            const moduleDoc = await ModuleModel.findOne({ name: moduleName });
            if (!moduleDoc) return next(ApiError.notFound("Módulo no encontrado"));

            // Busca el usuario con roles poblados
            const user = await UserModel.findById(userId).populate({
                path: "roles",
                populate: {
                    path: "modules.module",
                    model: "Modules"
                }
            });

    
            if (!user) return next(ApiError.notFound("Usuario no encontrado"));
           
            // Verifica permisos en los roles del usuario usando el ID del módulo
            const hasPermission = user.roles.some((role: any) =>
                role.modules.some((mod: any) =>
                    mod.module._id.toString() === moduleDoc._id.toString() &&
                    requiredPermissions.every((perm) => mod.permissions.includes(perm))
                )
            );

            if (!hasPermission) return next(ApiError.forbidden("No tienes permisos suficientes"));

            next();
        } catch (error) {
            console.log(error);
            next(ApiError.internal("Error de autorización", error));
        }
    };
}