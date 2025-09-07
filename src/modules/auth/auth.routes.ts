import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       400:
 *         description: Token no proporcionado
 */

/**
 * @swagger
 * /api/auth/email/{email}:
 *   get:
 *     summary: Obtener usuario por email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/auth/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         identificationNumber:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         isActive:
 *           type: boolean
 */

// Login usuario
router.post("/login", (req, res, next) => authController.loginUser(req, res, next));


// Logout usuario
router.post("/logout", (req, res, next) => authController.logoutUser(req, res, next));


// Obtener usuario por email
router.get("/email/:email", (req, res, next) => authController.getUserByEmail(req, res, next));

// Obtener usuario por ID
router.get("/:id", (req, res, next) => authController.getUserById(req, res, next));

export default router;