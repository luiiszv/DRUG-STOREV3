import { Router } from "express";
import { formaFarmaceuticaController } from "./formaFarmaceutica.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FormaFarmaceutica:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la forma farmacéutica
 *         nombre:
 *           type: string
 *           description: Nombre de la forma farmacéutica
 *           example: "Tableta"
 *         descripcion:
 *           type: string
 *           description: Descripción de la forma farmacéutica
 *           example: "Sólido en forma de pastilla"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   tags:
 *     - name: Formas Farmacéuticas
 *       description: Gestión de formas farmacéuticas
 */

/**
 * @swagger
 * /api/formas-farmaceuticas:
 *   post:
 *     summary: Crear una nueva forma farmacéutica
 *     tags: [Formas Farmacéuticas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormaFarmaceutica'
 *     responses:
 *       201:
 *         description: Forma farmacéutica creada exitosamente
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
 *                   $ref: '#/components/schemas/FormaFarmaceutica'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", formaFarmaceuticaController.createFormaFarmaceutica);

/**
 * @swagger
 * /api/formas-farmaceuticas:
 *   get:
 *     summary: Obtener todas las formas farmacéuticas
 *     tags: [Formas Farmacéuticas]
 *     responses:
 *       200:
 *         description: Lista de formas farmacéuticas
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
 *                     $ref: '#/components/schemas/FormaFarmaceutica'
 */
router.get("/", formaFarmaceuticaController.getAllFormasFarmaceuticas);

/**
 * @swagger
 * /api/formas-farmaceuticas/{id}:
 *   get:
 *     summary: Obtener forma farmacéutica por ID
 *     tags: [Formas Farmacéuticas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la forma farmacéutica
 *     responses:
 *       200:
 *         description: Forma farmacéutica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/FormaFarmaceutica'
 *       404:
 *         description: Forma farmacéutica no encontrada
 */
router.get("/:id", formaFarmaceuticaController.getFormaFarmaceuticaById);

/**
 * @swagger
 * /api/formas-farmaceuticas/{id}:
 *   put:
 *     summary: Actualizar forma farmacéutica por ID
 *     tags: [Formas Farmacéuticas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la forma farmacéutica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormaFarmaceutica'
 *     responses:
 *       200:
 *         description: Forma farmacéutica actualizada
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
 *                   $ref: '#/components/schemas/FormaFarmaceutica'
 *       404:
 *         description: Forma farmacéutica no encontrada
 */
router.put("/:id", formaFarmaceuticaController.updateFormaFarmaceutica);

/**
 * @swagger
 * /api/formas-farmaceuticas/{id}:
 *   delete:
 *     summary: Eliminar forma farmacéutica por ID
 *     tags: [Formas Farmacéuticas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la forma farmacéutica
 *     responses:
 *       200:
 *         description: Forma farmacéutica eliminada
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
 *                   $ref: '#/components/schemas/FormaFarmaceutica'
 *       404:
 *         description: Forma farmacéutica no encontrada
 */
router.delete("/:id", formaFarmaceuticaController.deleteFormaFarmaceutica);

export default router;