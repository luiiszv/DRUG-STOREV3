import { AuthRepository } from "./auth.repository";
import { Request } from "express";
import { comparePassword } from "../../utils/bcrypt.util";
import { generateToken } from "../../utils/jwt";
import { ApiError } from "../../core/errors/ApiError";
import { EXPIRES_IN } from "../../config/env";

//Mapper para sanear el usuario
import { sanitizeUser } from "./mapper/sanitizeUser";


//Session repository para manejar sesiones si es necesario
import { SessionRepository } from "../sessions/session.repository";

export class AuthService {
    private authRepository: AuthRepository;
    private sessionRepository: SessionRepository;

    constructor() {
        this.authRepository = new AuthRepository();
        this.sessionRepository = new SessionRepository();
    }

    async findUserByEmail(email: string) {
        return this.authRepository.findByEmail(email);
    }

    async findUserById(id: string) {
        return this.authRepository.findById(id);
    }

    async validateUser(email: string, password: string, req: Request) {
        const user = await this.findUserByEmail(email);
        if (!user) throw ApiError.notFound("El correo no está registrado");

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw ApiError.unauthorized("La contraseña es incorrecta");

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
            roles: Array.isArray(user.roles) ? user.roles.map(r => r.toString()) : [],
        });

        // Cerrar sesiones activas anteriores
        await this.sessionRepository.deactivateAllSessionsByUser(user._id.toString());

        // Registrar la nueva sesión
        const expiresAt = new Date(Date.now() + (EXPIRES_IN ? parseInt(EXPIRES_IN) : 0));
        await this.sessionRepository.createSession({
            userId: user._id,
            token,
            device: (req.get("user-agent") as string) || null,
            ipAddress: req.ip || null,
            expiresAt,
            isActive: true
        });

        return { user: sanitizeUser(user), token };
    }
}