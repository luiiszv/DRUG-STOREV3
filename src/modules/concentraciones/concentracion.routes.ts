import { Router } from "express";
import { concentracionController } from "./concentracion.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Concentracion:
 *       type: object
 *       required:
 *         - valor
 *         - unidad
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la concentración
 *         valor:
 *           type: string
 *           description: Valor de la concentración
 *           example: "500"
 *         unidad:
 *           type: string
 *           description: Unidad de la concentración
 *           example: "mg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   tags:
 *     - name: Concentraciones
 *       description: Gestión de concentraciones de medicamentos
 */

/**
 * @swagger
 * /api/concentraciones:
 *   post:
 *     summary: Crear una nueva concentración
 *     tags: [Concentraciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Concentracion'
 *     responses:
 *       201:
 *         description: Concentración creada exitosamente
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
 *                   $ref: '#/components/schemas/Concentracion'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", concentracionController.createConcentracion);

/**
 * @swagger
 * /api/concentraciones:
 *   get:
 *     summary: Obtener todas las concentraciones
 *     tags: [Concentraciones]
 *     responses:
 *       200:
 *         description: Lista de concentraciones
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Concentracion'
 */
router.get("/", concentracionController.getAllConcentraciones);

/**
 * @swagger
 * /api/concentraciones/{id}:
 *   get:
 *     summary: Obtener concentración por ID
 *     tags: [Concentraciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la concentración
 *     responses:
 *       200:
 *         description: Concentración encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Concentracion'
 *       404:
 *         description: Concentración no encontrada
 */
router.get("/:id", concentracionController.getConcentracionById);

/**
 * @swagger
 * /api/concentraciones/{id}:
 *   put:
 *     summary: Actualizar concentración por ID
 *     tags: [Concentraciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la concentración
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Concentracion'
 *     responses:
 *       200:
 *         description: Concentración actualizada
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
 *                   $ref: '#/components/schemas/Concentracion'
 *       404:
 *         description: Concentración no encontrada
 */
router.put("/:id", concentracionController.updateConcentracion);

/**
 * @swagger
 * /api/concentraciones/{id}:
 *   delete:
 *     summary: Eliminar concentración por ID
 *     tags: [Concentraciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la concentración
 *     responses:
 *       200:
 *         description: Concentración eliminada
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
 *                   $ref: '#/components/schemas/Concentracion'
 *       404:
 *         description: Concentración no encontrada
 */
router.delete("/:id", concentracionController.deleteConcentracion);

export default router;