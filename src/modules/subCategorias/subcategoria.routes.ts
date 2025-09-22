import { Router } from "express";
import { subcategoriaController } from "./subcategoria.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategoria:
 *       type: object
 *       required:
 *         - nombre
 *         - categoria
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la subcategoría
 *         nombre:
 *           type: string
 *           description: Nombre de la subcategoría
 *           example: "Analgésicos"
 *         descripcion:
 *           type: string
 *           description: Descripción de la subcategoría
 *           example: "Medicamentos para el dolor"
 *         categoria:
 *           type: string
 *           description: ID de la categoría principal
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   tags:
 *     - name: Subcategorías
 *       description: Gestión de subcategorías de medicamentos
 */

/**
 * @swagger
 * /api/subcategorias:
 *   post:
 *     summary: Crear una nueva subcategoría
 *     tags: [Subcategorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategoria'
 *     responses:
 *       201:
 *         description: Subcategoría creada exitosamente
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
 *                   $ref: '#/components/schemas/Subcategoria'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", subcategoriaController.createSubcategoria);

/**
 * @swagger
 * /api/subcategorias:
 *   get:
 *     summary: Obtener todas las subcategorías
 *     tags: [Subcategorías]
 *     responses:
 *       200:
 *         description: Lista de subcategorías
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
 *                     $ref: '#/components/schemas/Subcategoria'
 */
router.get("/", subcategoriaController.getAllSubcategorias);

/**
 * @swagger
 * /api/subcategorias/{id}:
 *   get:
 *     summary: Obtener subcategoría por ID
 *     tags: [Subcategorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoría no encontrada
 */
router.get("/:id", subcategoriaController.getSubcategoriaById);

/**
 * @swagger
 * /api/subcategorias/{id}:
 *   put:
 *     summary: Actualizar subcategoría por ID
 *     tags: [Subcategorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la subcategoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategoria'
 *     responses:
 *       200:
 *         description: Subcategoría actualizada
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
 *                   $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoría no encontrada
 */
router.put("/:id", subcategoriaController.updateSubcategoria);

/**
 * @swagger
 * /api/subcategorias/{id}:
 *   delete:
 *     summary: Eliminar subcategoría por ID
 *     tags: [Subcategorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Subcategoría eliminada
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
 *                   $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoría no encontrada
 */
router.delete("/:id", subcategoriaController.deleteSubcategoria);

export default router;