import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { NODE_ENV, EXPIRES_IN } from "../../config/env";
import { ApiError } from "../../core/errors/ApiError";


import { SessionRepository } from "../sessions/session.repository";

const authService = new AuthService();
const sessionRepository = new SessionRepository();

export class AuthController {

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return res.status(400).json(ApiResponse.error("Email es requerido"));
            }
            if (!password) {
                return res.status(400).json(ApiResponse.error("Password es requerido"));
            }

            const result = await authService.validateUser(email, password, req);

            res.cookie("token", result.token, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: EXPIRES_IN ? parseInt(EXPIRES_IN) : undefined
            });

            res.json(ApiResponse.success("Login exitoso", result));
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json(ApiResponse.error(error.message, error.details));
            }
            next(error);
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;
            const user = await authService.findUserByEmail(email as string);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario encontrado", user));
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await authService.findUserById(id as string);
            if (!user) {
                return res.status(404).json(ApiResponse.error("Usuario no encontrado"));
            }
            res.json(ApiResponse.success("Usuario encontrado", user));
        } catch (error) {
            next(error);
        }
    }


    async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token || req.headers.authorization;
            if (!token) {
                return res.status(400).json(ApiResponse.error("Token no proporcionado"));
            }
            await sessionRepository.deactivateSession(token, "logout");
            res.clearCookie("token");
            res.json(ApiResponse.success("Sesión cerrada correctamente", null));
        } catch (error) {
            next(error);
        }
    }
}