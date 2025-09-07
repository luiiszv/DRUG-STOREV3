import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { CreateUserDto } from "./dto/create-user.dto";

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: CreateUserDto = req.body;
            const user = await userService.createUser(userData);
            res.json(ApiResponse.success("Usuario creado correctamente", user));
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id as string);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario encontrado", user));
        } catch (error) {
            next(error);
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;
            const user = await userService.getUserByEmail(email as string);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario encontrado", user));
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(ApiResponse.success("Lista de usuarios", users));
        } catch (error) {
            next(error);
        }
    }

    async countUsers(_req: Request, res: Response, next: NextFunction) {
        try {
            const count = await userService.countUsers();
            res.json(ApiResponse.success("Cantidad de usuarios", count));
        } catch (error) {
            next(error);
        }
    }

    async updateUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await userService.updateUserById(id as string, updateData);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario actualizado", user));
        } catch (error) {
            next(error);
        }
    }

    async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUserById(id as string);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario eliminado", user));
        } catch (error) {
            next(error);
        }
    }

}