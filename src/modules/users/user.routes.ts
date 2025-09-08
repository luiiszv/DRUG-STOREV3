import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../../core/middleware/authMiddleware";

import { authorizeRole } from "../../core/middleware/authorizeRole";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/count/all:
 *   get:
 *     summary: Contar usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cantidad de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
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
 *   put:
 *     summary: Actualizar usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Obtener usuario por email
 *     tags: [Users]
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateUserDto:
 *       type: object
 *       properties:
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
 *         password:
 *           type: string
 */


// Crear usuario (requiere autenticación)
router.post("/", AuthMiddleware.handle, (req, res, next) => userController.createUser(req, res, next));

// Obtener usuario por ID
router.get("/:id", (req, res, next) => userController.getUserById(req, res, next));

// Obtener usuario por email
router.get("/email/:email", (req, res, next) => userController.getUserByEmail(req, res, next));

// Obtener todos los usuarios
router.get("/", 
    AuthMiddleware.handle,
    authorizeRole("Usuarios", ["READ"]),
    (req, res, next) => userController.getAllUsers(req, res, next));

// Contar usuarios
router.get("/count/all", (req, res, next) => userController.countUsers(req, res, next));

// Actualizar usuario por ID (requiere autenticación)
router.put("/:id", AuthMiddleware.handle, (req, res, next) => userController.updateUserById(req, res, next));

// Eliminar usuario por ID (requiere autenticación)
router.delete("/:id", 
    AuthMiddleware.handle,
    authorizeRole("Usuarios", ["DELETE"]),
     (req, res, next) => userController.deleteUserById(req, res, next));

export default router;