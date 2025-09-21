import { Router } from "express";
import { principioActivoController } from "./principioActivo.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PrincipioActivo:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del principio activo
 *         nombre:
 *           type: string
 *           description: Nombre del componente químico
 *           example: "Acetaminofén"
 *         descripcion:
 *           type: string
 *           description: Descripción del principio activo
 *           example: "Analgésico y antipirético"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PrincipioActivoCreate:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 200
 *           example: "Ibuprofeno"
 *         descripcion:
 *           type: string
 *           maxLength: 500
 *           example: "Antiinflamatorio no esteroideo"
 *     PrincipioActivoStats:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *           example: 150
 *         conProductos:
 *           type: number
 *           example: 120
 *         sinProductos:
 *           type: number
 *           example: 30
 *         promedioProductosPorPrincipio:
 *           type: number
 *           example: 2.5
 *     PrincipioActivoMostUsed:
 *       type: object
 *       properties:
 *         principioActivo:
 *           $ref: '#/components/schemas/PrincipioActivo'
 *         productCount:
 *           type: number
 *           example: 15
 *     ValidationResult:
 *       type: object
 *       properties:
 *         valido:
 *           type: boolean
 *         errores:
 *           type: array
 *           items:
 *             type: string
 *     UsageVerification:
 *       type: object
 *       properties:
 *         enUso:
 *           type: boolean
 *         mensaje:
 *           type: string
 *         puedeEliminar:
 *           type: boolean
 *   tags:
 *     - name: Principios Activos
 *       description: Gestión de principios activos farmacéuticos
 */

// ==========================================
// RUTAS CRUD BÁSICAS
// ==========================================

/**
 * @swagger
 * /api/principios-activos:
 *   post:
 *     summary: Crear un nuevo principio activo
 *     tags: [Principios Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrincipioActivoCreate'
 *     responses:
 *       201:
 *         description: Principio activo creado exitosamente
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
 *                   $ref: '#/components/schemas/PrincipioActivo'
 *       400:
 *         description: Datos inválidos o principio activo ya existe
 */
router.post("/", principioActivoController.createPrincipioActivo);

/**
 * @swagger
 * /api/principios-activos:
 *   get:
 *     summary: Obtener todos los principios activos
 *     tags: [Principios Activos]
 *     responses:
 *       200:
 *         description: Lista de principios activos
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
 *                     $ref: '#/components/schemas/PrincipioActivo'
 */
router.get("/", principioActivoController.getAllPrincipiosActivos);

/**
 * @swagger
 * /api/principios-activos/paginated:
 *   get:
 *     summary: Obtener principios activos con paginación
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Elementos por página
 *     responses:
 *       200:
 *         description: Principios activos paginados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     principiosActivos:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PrincipioActivo'
 *                     total:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     currentPage:
 *                       type: number
 */
router.get("/paginated", principioActivoController.getPrincipiosActivosPaginated);

/**
 * @swagger
 * /api/principios-activos/{id}:
 *   get:
 *     summary: Obtener principio activo por ID
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del principio activo
 *     responses:
 *       200:
 *         description: Principio activo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/PrincipioActivo'
 *       404:
 *         description: Principio activo no encontrado
 */
router.get("/:id", principioActivoController.getPrincipioActivoById);

/**
 * @swagger
 * /api/principios-activos/{id}:
 *   put:
 *     summary: Actualizar principio activo
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrincipioActivoCreate'
 *     responses:
 *       200:
 *         description: Principio activo actualizado
 *       404:
 *         description: Principio activo no encontrado
 */
router.put("/:id", principioActivoController.updatePrincipioActivo);

/**
 * @swagger
 * /api/principios-activos/{id}:
 *   delete:
 *     summary: Eliminar principio activo
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Principio activo eliminado
 *       400:
 *         description: No se puede eliminar (está en uso)
 *       404:
 *         description: Principio activo no encontrado
 */
router.delete("/:id", principioActivoController.deletePrincipioActivo);

// ==========================================
// RUTAS DE BÚSQUEDA
// ==========================================

/**
 * @swagger
 * /api/principios-activos/search/general:
 *   get:
 *     summary: Búsqueda general de principios activos
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [nombre, keyword, exacto]
 *         description: Tipo de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get("/search/general", principioActivoController.searchGeneral);

/**
 * @swagger
 * /api/principios-activos/search/avanzado:
 *   get:
 *     summary: Búsqueda avanzada con filtros múltiples
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: descripcion
 *         schema:
 *           type: string
 *         description: Filtrar por descripción
 *       - in: query
 *         name: hasProducts
 *         schema:
 *           type: boolean
 *         description: Filtrar por uso en productos
 *       - in: query
 *         name: minProductCount
 *         schema:
 *           type: integer
 *         description: Mínimo número de productos
 *       - in: query
 *         name: maxProductCount
 *         schema:
 *           type: integer
 *         description: Máximo número de productos
 *     responses:
 *       200:
 *         description: Resultados de búsqueda avanzada
 */
router.get("/search/avanzado", principioActivoController.searchPrincipiosActivosAvanzado);

/**
 * @swagger
 * /api/principios-activos/search/nombre:
 *   get:
 *     summary: Buscar por nombre (parcial)
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Nombre a buscar
 *     responses:
 *       200:
 *         description: Principios activos encontrados
 */
router.get("/search/nombre", principioActivoController.searchByNombre);

/**
 * @swagger
 * /api/principios-activos/search/keyword:
 *   get:
 *     summary: Buscar por palabra clave
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Palabra clave a buscar
 *     responses:
 *       200:
 *         description: Principios activos encontrados
 */
router.get("/search/keyword", principioActivoController.searchByKeyword);

/**
 * @swagger
 * /api/principios-activos/nombre/{nombre}:
 *   get:
 *     summary: Buscar por nombre exacto
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre exacto del principio activo
 *     responses:
 *       200:
 *         description: Principio activo encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/nombre/:nombre", principioActivoController.getPrincipioActivoByNombre);

// ==========================================
// RUTAS DE ESTADÍSTICAS Y ANÁLISIS
// ==========================================

/**
 * @swagger
 * /api/principios-activos/stats/general:
 *   get:
 *     summary: Obtener estadísticas generales
 *     tags: [Principios Activos]
 *     responses:
 *       200:
 *         description: Estadísticas de principios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/PrincipioActivoStats'
 */
router.get("/stats/general", principioActivoController.getPrincipiosActivosStats);

/**
 * @swagger
 * /api/principios-activos/stats/most-used:
 *   get:
 *     summary: Obtener principios activos más utilizados
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 50
 *         description: Número de resultados
 *     responses:
 *       200:
 *         description: Principios activos más utilizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PrincipioActivoMostUsed'
 */
router.get("/stats/most-used", principioActivoController.getMostUsedPrincipiosActivos);

/**
 * @swagger
 * /api/principios-activos/stats/unused:
 *   get:
 *     summary: Obtener principios activos sin productos asociados
 *     tags: [Principios Activos]
 *     responses:
 *       200:
 *         description: Principios activos sin uso
 */
router.get("/stats/unused", principioActivoController.getUnusedPrincipiosActivos);

/**
 * @swagger
 * /api/principios-activos/stats/count:
 *   get:
 *     summary: Obtener conteo total
 *     tags: [Principios Activos]
 *     responses:
 *       200:
 *         description: Conteo total de principios activos
 */
router.get("/stats/count", principioActivoController.getCount);

// ==========================================
// RUTAS DE VALIDACIÓN Y VERIFICACIÓN
// ==========================================

/**
 * @swagger
 * /api/principios-activos/validate:
 *   post:
 *     summary: Validar datos de principio activo
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: isUpdate
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Indica si es para actualización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrincipioActivoCreate'
 *     responses:
 *       200:
 *         description: Resultado de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ValidationResult'
 */
router.post("/validate", principioActivoController.validarDatosPrincipioActivo);

/**
 * @swagger
 * /api/principios-activos/{id}/verify-usage:
 *   get:
 *     summary: Verificar uso de un principio activo
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del principio activo
 *     responses:
 *       200:
 *         description: Resultado de verificación de uso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UsageVerification'
 */
router.get("/:id/verify-usage", principioActivoController.verificarUso);

/**
 * @swagger
 * /api/principios-activos/verify/nombre/{nombre}:
 *   get:
 *     summary: Verificar si existe un nombre
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre a verificar
 *     responses:
 *       200:
 *         description: Resultado de verificación
 */
router.get("/verify/nombre/:nombre", principioActivoController.verificarExistenciaPorNombre);

// ==========================================
// RUTAS DE IMPORTACIÓN/EXPORTACIÓN
// ==========================================

/**
 * @swagger
 * /api/principios-activos/export:
 *   get:
 *     summary: Exportar datos de principios activos
 *     tags: [Principios Activos]
 *     parameters:
 *       - in: query
 *         name: formato
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *           default: json
 *         description: Formato de exportación
 *       - in: query
 *         name: incluirEstadisticas
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Incluir estadísticas en la exportación
 *     responses:
 *       200:
 *         description: Datos exportados
 */
router.get("/export", principioActivoController.exportData);

/**
 * @swagger
 * /api/principios-activos/import:
 *   post:
 *     summary: Importar principios activos masivamente
 *     tags: [Principios Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               principiosActivos:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PrincipioActivoCreate'
 *     responses:
 *       200:
 *         description: Resultado de importación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     exitosos:
 *                       type: number
 *                     errores:
 *                       type: number
 *                     detalles:
 *                       type: array
 */
router.post("/import", principioActivoController.importData);

export default router;