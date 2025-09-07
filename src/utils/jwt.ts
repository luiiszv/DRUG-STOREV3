// src/services/auth.service.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { SECRET_KEY, EXPIRES_IN } from "../config/env";

export interface TokenPayload {
    id: string;
    email: string;
    roles: string[];
}



export const generateToken = (payload: TokenPayload): string => {

    return jwt.sign(payload, SECRET_KEY as Secret, {
        expiresIn: EXPIRES_IN as string,
    } as SignOptions);
};
