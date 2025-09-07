// src/types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

export interface jwtData extends JwtPayload {
  id: string; // o email, role, lo que metas en el token
  email: string;
  roles: string;
}

// Extensión del Request de Express
declare module "express-serve-static-core" {
  interface Request {
    user: jwtData; //  req.user existe
  }
}
