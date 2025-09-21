import { Router } from "express";
import { productoController } from "./producto.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombreComercial
 *         - nombreGenerico
 *         - principioActivo
 *         - concentracion
 *         - formaFarmaceutica
 *         - subcategoria
 *         - laboratorio
 *         - unidadMedida
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del producto
 *         nombreComercial:
 *           type: string
 *           description: Nombre comercial del producto
 *           example: "Aspirina"
 *         nombreGenerico:
 *           type: string
 *           description: Nombre genérico del producto
 *           example: "Ácido acetilsalicílico"
 *         principioActivo:
 *           type: string
 *           description: ID del principio activo
 *         concentracion:
 *           type: string
 *           description: ID de la concentración
 *         formaFarmaceutica:
 *           type: string
 *           description: ID de la forma farmacéutica
 *         subcategoria:
 *           type: string
 *           description: ID de la subcategoría
 *         laboratorio:
 *           type: string
 *           description: ID del laboratorio
 *         unidadMedida:
 *           type: string
 *           description: ID de la unidad de medida
 *         codigoBarras:
 *           type: string
 *           description: Código de barras único
 *           example: "7702132002011"
 *         stockMinimo:
 *           type: number
 *           description: Stock mínimo del producto
 *           default: 0
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductoCreate:
 *       type: object
 *       required:
 *         - nombreComercial
 *         - nombreGenerico
 *         - principioActivo
 *         - concentracion
 *         - formaFarmaceutica
 *         - subcategoria
 *         - laboratorio
 *         - unidadMedida
 *       properties:
 *         nombreComercial:
 *           type: string
 *           minLength: 2
 *           example: "Dolex"
 *         nombreGenerico:
 *           type: string
 *           minLength: 2
 *           example: "Acetaminofén"
 *         principioActivo:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k0"
 *         concentracion:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k1"
 *         formaFarmaceutica:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k2"
 *         subcategoria:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k3"
 *         laboratorio:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k4"
 *         unidadMedida:
 *           type: string
 *           example: "60a4d1b2c3e4f5g6h7i8j9k5"
 *         codigoBarras:
 *           type: string
 *           example: "7702132002012"
 *         stockMinimo:
 *           type: number
 *           minimum: 0
 *           example: 15
 *     ProductoStats:
 *       type: object
 *       properties:
 *         totalProductos:
 *           type: number
 *           example: 250
 *         productosConStockBajo:
 *           type: number
 *           example: 15
 *         promedioStockMinimo:
 *           type: number
 *           example: 12.5
 *     ProductoSearchCriteria:
 *       type: object
 *       properties:
 *         nombreComercial:
 *           type: string
 *         nombreGenerico:
 *           type: string
 *         principioActivo:
 *           type: string
 *         laboratorio:
 *           type: string
 *         subcategoria:
 *           type: string
 *         stockBajo:
 *           type: boolean
 *     ProductoValidation:
 *       type: object
 *       properties:
 *         valido:
 *           type: boolean
 *         errores:
 *           type: array
 *           items:
 *             type: string
 *     ReabastecimientoInfo:
 *       type: object
 *       properties:
 *         necesitaReabastecimiento:
 *           type: boolean
 *         stockMinimo:
 *           type: number
 *         mensaje:
 *           type: string
 *     ResumenLaboratorio:
 *       type: object
 *       properties:
 *         laboratorio:
 *           type: string
 *         totalProductos:
 *           type: number
 *         productosStockBajo:
 *           type: number
 *   tags:
 *     - name: Productos
 *       description: Gestión de productos farmacéuticos
 */

// ==========================================
// RUTAS CRUD BÁSICAS
// ==========================================

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoCreate'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
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
 *                   $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos o código de barras duplicado
 */
router.post("/", productoController.createProducto);

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: populated
 *         schema:
 *           type: boolean
 *         description: Incluir referencias pobladas
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                     $ref: '#/components/schemas/Producto'
 */
router.get("/", productoController.getAllProductos);

/**
 * @swagger
 * /api/productos/paginated:
 *   get:
 *     summary: Obtener productos con paginación
 *     tags: [Productos]
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
 *         description: Productos paginados
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
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Producto'
 *                     total:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     currentPage:
 *                       type: number
 */
router.get("/paginated", productoController.getProductosPaginated);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *       - in: query
 *         name: populated
 *         schema:
 *           type: boolean
 *         description: Incluir referencias pobladas
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", productoController.getProductoById);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Productos]
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
 *             $ref: '#/components/schemas/ProductoCreate'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", productoController.updateProducto);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", productoController.deleteProducto);

// ==========================================
// RUTAS DE BÚSQUEDA
// ==========================================

/**
 * @swagger
 * /api/productos/search/general:
 *   get:
 *     summary: Búsqueda general de productos
 *     tags: [Productos]
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
 *           enum: [comercial, generico, codigo]
 *         description: Tipo de búsqueda específica
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
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
 *                     $ref: '#/components/schemas/Producto'
 */
router.get("/search/general", productoController.searchGeneral);

/**
 * @swagger
 * /api/productos/search/avanzado:
 *   get:
 *     summary: Búsqueda avanzada con múltiples filtros
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombreComercial
 *         schema:
 *           type: string
 *         description: Filtrar por nombre comercial
 *       - in: query
 *         name: nombreGenerico
 *         schema:
 *           type: string
 *         description: Filtrar por nombre genérico
 *       - in: query
 *         name: principioActivo
 *         schema:
 *           type: string
 *         description: ID del principio activo
 *       - in: query
 *         name: laboratorio
 *         schema:
 *           type: string
 *         description: ID del laboratorio
 *       - in: query
 *         name: subcategoria
 *         schema:
 *           type: string
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Resultados de búsqueda avanzada
 */
router.get("/search/avanzado", productoController.searchProductosAvanzado);

/**
 * @swagger
 * /api/productos/search/comercial:
 *   get:
 *     summary: Buscar por nombre comercial
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Nombre comercial a buscar
 *     responses:
 *       200:
 *         description: Productos encontrados por nombre comercial
 */
router.get("/search/comercial", productoController.searchByNombreComercial);

/**
 * @swagger
 * /api/productos/search/generico:
 *   get:
 *     summary: Buscar por nombre genérico
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: Nombre genérico a buscar
 *     responses:
 *       200:
 *         description: Productos encontrados por nombre genérico
 */
router.get("/search/generico", productoController.searchByNombreGenerico);

/**
 * @swagger
 * /api/productos/search/criterios:
 *   get:
 *     summary: Búsqueda por múltiples criterios
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombreComercial
 *         schema:
 *           type: string
 *       - in: query
 *         name: nombreGenerico
 *         schema:
 *           type: string
 *       - in: query
 *         name: principioActivo
 *         schema:
 *           type: string
 *       - in: query
 *         name: laboratorio
 *         schema:
 *           type: string
 *       - in: query
 *         name: subcategoria
 *         schema:
 *           type: string
 *       - in: query
 *         name: stockBajo
 *         schema:
 *           type: boolean
 *         description: Filtrar productos con stock bajo
 *     responses:
 *       200:
 *         description: Productos filtrados por criterios
 */
router.get("/search/criterios", productoController.getProductosByCriterios);

/**
 * @swagger
 * /api/productos/barcode/{codigoBarras}:
 *   get:
 *     summary: Buscar producto por código de barras
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigoBarras
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de barras del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado con ese código de barras
 */
router.get("/barcode/:codigoBarras", productoController.getProductoByCodigoBarras);

// ==========================================
// RUTAS POR CATEGORÍAS/REFERENCIAS
// ==========================================

/**
 * @swagger
 * /api/productos/principio-activo/{principioActivoId}:
 *   get:
 *     summary: Obtener productos por principio activo
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: principioActivoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del principio activo
 *     responses:
 *       200:
 *         description: Productos del principio activo
 */
router.get("/principio-activo/:principioActivoId", productoController.getProductosByPrincipioActivo);

/**
 * @swagger
 * /api/productos/laboratorio/{laboratorioId}:
 *   get:
 *     summary: Obtener productos por laboratorio
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: laboratorioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del laboratorio
 *     responses:
 *       200:
 *         description: Productos del laboratorio
 */
router.get("/laboratorio/:laboratorioId", productoController.getProductosByLaboratorio);

/**
 * @swagger
 * /api/productos/subcategoria/{subcategoriaId}:
 *   get:
 *     summary: Obtener productos por subcategoría
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: subcategoriaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la subcategoría
 *     responses:
 *       200:
 *         description: Productos de la subcategoría
 */
router.get("/subcategoria/:subcategoriaId", productoController.getProductosBySubcategoria);

// ==========================================
// RUTAS DE GESTIÓN DE STOCK
// ==========================================

/**
 * @swagger
 * /api/productos/stock/bajo:
 *   get:
 *     summary: Obtener productos con stock bajo
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos con stock bajo
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
 *                     $ref: '#/components/schemas/Producto'
 */
router.get("/stock/bajo", productoController.getProductosConStockBajo);

/**
 * @swagger
 * /api/productos/{id}/stock-minimo:
 *   patch:
 *     summary: Actualizar stock mínimo de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stockMinimo
 *             properties:
 *               stockMinimo:
 *                 type: number
 *                 minimum: 0
 *                 example: 20
 *     responses:
 *       200:
 *         description: Stock mínimo actualizado
 *       400:
 *         description: Stock mínimo inválido
 *       404:
 *         description: Producto no encontrado
 */
router.patch("/:id/stock-minimo", productoController.updateStockMinimo);

/**
 * @swagger
 * /api/productos/{id}/reabastecimiento:
 *   get:
 *     summary: Verificar si un producto necesita reabastecimiento
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Información de reabastecimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ReabastecimientoInfo'
 */
router.get("/:id/reabastecimiento", productoController.verificarReabastecimiento);

// ==========================================
// RUTAS DE ESTADÍSTICAS Y REPORTES
// ==========================================

/**
 * @swagger
 * /api/productos/stats/general:
 *   get:
 *     summary: Obtener estadísticas generales de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Estadísticas de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ProductoStats'
 */
router.get("/stats/general", productoController.getProductosStats);

/**
 * @swagger
 * /api/productos/stats/laboratorio:
 *   get:
 *     summary: Obtener resumen de productos por laboratorio
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Resumen por laboratorio
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
 *                     $ref: '#/components/schemas/ResumenLaboratorio'
 */
router.get("/stats/laboratorio", productoController.getResumenPorLaboratorio);

// ==========================================
// RUTAS DE VALIDACIÓN Y VERIFICACIÓN
// ==========================================

/**
 * @swagger
 * /api/productos/validate:
 *   post:
 *     summary: Validar datos de producto
 *     tags: [Productos]
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
 *             $ref: '#/components/schemas/ProductoCreate'
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
 *                   $ref: '#/components/schemas/ProductoValidation'
 */
router.post("/validate", productoController.validarDatosProducto);

/**
 * @swagger
 * /api/productos/verify/barcode/{codigoBarras}:
 *   get:
 *     summary: Verificar si existe un código de barras
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: codigoBarras
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de barras a verificar
 *     responses:
 *       200:
 *         description: Resultado de verificación
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
 *                     existe:
 *                       type: boolean
 *                     producto:
 *                       oneOf:
 *                         - $ref: '#/components/schemas/Producto'
 *                         - type: "null"
 */
router.get("/verify/barcode/:codigoBarras", productoController.verificarCodigoBarras);

export default router;