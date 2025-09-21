import { Request, Response, NextFunction } from "express";
import { productoService } from "./producto.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class ProductoController {

  // Crear un nuevo producto
  async createProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validacion = await productoService.validarDatosProducto(req.body, false);
      
      if (!validacion.valido) {
        throw new ApiError(400, "Datos inválidos", validacion.errores);
      }

      const producto = await productoService.createProducto(req.body);
      res.status(201).json(ApiResponse.success("Producto creado exitosamente", producto));
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los productos
  async getAllProductos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { populated } = req.query;
      
      
      let productos;
      if (populated === 'true') {
        productos = await productoService.getAllProductosPopulated();
      } else {
        productos = await productoService.getAllProductos();
      }

      res.json(ApiResponse.success("Productos obtenidos exitosamente", productos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener productos con paginación
  async getProductosPaginated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await productoService.getProductosPaginated(page, limit);
      res.json(ApiResponse.success("Productos paginados obtenidos exitosamente", result));
    } catch (error) {
      next(error);
    }
  }

  // Obtener producto por ID
  async getProductoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { populated } = req.query;

      let producto;
      if (populated === 'true') {
        producto = await productoService.getProductoByIdPopulated(id as string);
      } else {
        producto = await productoService.getProductoById(id as string);
      }

      if (!producto) {
        throw new ApiError(404, "Producto no encontrado");
      }

      res.json(ApiResponse.success("Producto obtenido exitosamente", producto));
    } catch (error) {
      next(error);
    }
  }

  // Buscar producto por código de barras
  async getProductoByCodigoBarras(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { codigoBarras } = req.params;

      const producto = await productoService.getProductoByCodigoBarras(codigoBarras as string);
      
      if (!producto) {
        throw new ApiError(404, "Producto no encontrado con ese código de barras");
      }

      res.json(ApiResponse.success("Producto encontrado", producto));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda por nombre comercial
  async searchByNombreComercial(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre } = req.query;

      if (!nombre || typeof nombre !== 'string') {
        throw new ApiError(400, "Parámetro 'nombre' es requerido");
      }

      const productos = await productoService.searchProductosByNombreComercial(nombre);
      res.json(ApiResponse.success("Búsqueda completada", productos));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda por nombre genérico
  async searchByNombreGenerico(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre } = req.query;

      if (!nombre || typeof nombre !== 'string') {
        throw new ApiError(400, "Parámetro 'nombre' es requerido");
      }

      const productos = await productoService.searchProductosByNombreGenerico(nombre);
      res.json(ApiResponse.success("Búsqueda completada", productos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener productos por principio activo
  async getProductosByPrincipioActivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { principioActivoId } = req.params;

      const productos = await productoService.getProductosByPrincipioActivo(principioActivoId as string);
      res.json(ApiResponse.success("Productos por principio activo obtenidos", productos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener productos por laboratorio
  async getProductosByLaboratorio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { laboratorioId } = req.params;

      const productos = await productoService.getProductosByLaboratorio(laboratorioId as string);
      res.json(ApiResponse.success("Productos por laboratorio obtenidos", productos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener productos por subcategoría
  async getProductosBySubcategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { subcategoriaId } = req.params;

      const productos = await productoService.getProductosBySubcategoria(subcategoriaId as string);
      res.json(ApiResponse.success("Productos por subcategoría obtenidos", productos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener productos con stock bajo
  async getProductosConStockBajo(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productos = await productoService.getProductosConStockBajo();
      res.json(ApiResponse.success("Productos con stock bajo obtenidos", productos));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda avanzada
  async searchProductosAvanzado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchParams = {
        nombreComercial: req.query.nombreComercial as string,
        nombreGenerico: req.query.nombreGenerico as string,
        principioActivo: req.query.principioActivo as string,
        laboratorio: req.query.laboratorio as string,
        subcategoria: req.query.subcategoria as string
      };

      const productos = await productoService.searchProductosAvanzado(searchParams);
      res.json(ApiResponse.success("Búsqueda avanzada completada", productos));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda por múltiples criterios
  async getProductosByCriterios(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criterios = {
        nombreComercial: req.query.nombreComercial as string,
        nombreGenerico: req.query.nombreGenerico as string,
        principioActivo: req.query.principioActivo as string,
        laboratorio: req.query.laboratorio as string,
        subcategoria: req.query.subcategoria as string,
        stockBajo: req.query.stockBajo === 'true'
      };

      const productos = await productoService.getProductosByCriterios(criterios);
      res.json(ApiResponse.success("Productos obtenidos por criterios", productos));
    } catch (error) {
      next(error);
    }
  }

  // Actualizar producto
  async updateProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const validacion = await productoService.validarDatosProducto(req.body, true);
      
      if (!validacion.valido) {
        throw new ApiError(400, "Datos inválidos", validacion.errores);
      }

      const producto = await productoService.updateProducto(id as string, req.body);
      
      if (!producto) {
        throw new ApiError(404, "Producto no encontrado");
      }

      res.json(ApiResponse.success("Producto actualizado exitosamente", producto));
    } catch (error) {
      next(error);
    }
  }

  // Actualizar stock mínimo
  async updateStockMinimo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { stockMinimo } = req.body;

      if (stockMinimo === undefined || stockMinimo === null) {
        throw new ApiError(400, "Stock mínimo es requerido");
      }

      if (typeof stockMinimo !== 'number' || stockMinimo < 0) {
        throw new ApiError(400, "Stock mínimo debe ser un número mayor o igual a 0");
      }

      const producto = await productoService.updateStockMinimo(id as string, stockMinimo);
      
      if (!producto) {
        throw new ApiError(404, "Producto no encontrado");
      }

      res.json(ApiResponse.success("Stock mínimo actualizado exitosamente", producto));
    } catch (error) {
      next(error);
    }
  }

  // Eliminar producto
  async deleteProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const producto = await productoService.deleteProducto(id as string);
      
      if (!producto) {
        throw new ApiError(404, "Producto no encontrado");
      }

      res.json(ApiResponse.success("Producto eliminado exitosamente", producto));
    } catch (error) {
      next(error);
    }
  }

  // Obtener estadísticas de productos
  async getProductosStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await productoService.getProductosStats();
      res.json(ApiResponse.success("Estadísticas obtenidas exitosamente", stats));
    } catch (error) {
      next(error);
    }
  }

  // Verificar reabastecimiento
  async verificarReabastecimiento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const resultado = await productoService.verificarReabastecimiento(id as string);
      res.json(ApiResponse.success("Verificación de reabastecimiento completada", resultado));
    } catch (error) {
      next(error);
    }
  }

  // Obtener resumen por laboratorio
  async getResumenPorLaboratorio(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumen = await productoService.getResumenPorLaboratorio();
      res.json(ApiResponse.success("Resumen por laboratorio obtenido", resumen));
    } catch (error) {
      next(error);
    }
  }

  // Validar datos de producto
  async validarDatosProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { isUpdate = false } = req.query;
      
      const validacion = await productoService.validarDatosProducto(
        req.body, 
        isUpdate === 'true'
      );
      
      res.json(ApiResponse.success("Validación completada", validacion));
    } catch (error) {
      next(error);
    }
  }

  // Verificar si existe código de barras
  async verificarCodigoBarras(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { codigoBarras } = req.params;

      const producto = await productoService.getProductoByCodigoBarras(codigoBarras as string);
      
      const resultado = {
        existe: !!producto,
        producto: producto || null
      };

      res.json(ApiResponse.success("Verificación de código de barras completada", resultado));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda general (combinada)
  async searchGeneral(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query, tipo } = req.query;

      if (!query || typeof query !== 'string') {
        throw new ApiError(400, "Parámetro 'query' es requerido");
      }

      let productos;

      switch (tipo) {
        case 'comercial':
          productos = await productoService.searchProductosByNombreComercial(query);
          break;
        case 'generico':
          productos = await productoService.searchProductosByNombreGenerico(query);
          break;
        case 'codigo':
          const producto = await productoService.getProductoByCodigoBarras(query);
          productos = producto ? [producto] : [];
          break;
        default:
          // Búsqueda en ambos nombres si no se especifica tipo
          const [comerciales, genericos] = await Promise.all([
            productoService.searchProductosByNombreComercial(query),
            productoService.searchProductosByNombreGenerico(query)
          ]);
          
          // Combinar y eliminar duplicados
          const idsVistos = new Set();
          productos = [...comerciales, ...genericos].filter(p => {
            const id = p._id?.toString();
            if (idsVistos.has(id)) return false;
            idsVistos.add(id);
            return true;
          });
      }

      res.json(ApiResponse.success("Búsqueda general completada", productos));
    } catch (error) {
      next(error);
    }
  }
}

export const productoController = new ProductoController();