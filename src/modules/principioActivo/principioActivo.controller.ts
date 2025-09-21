import { Request, Response, NextFunction } from "express";
import { principioActivoService } from "./principioActivo.service";
import { ApiResponse } from "../../core/responses/ApiResponse";
import { ApiError } from "../../core/errors/ApiError";

export class PrincipioActivoController {

  // Crear un nuevo principio activo
  async createPrincipioActivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validacion = await principioActivoService.validarDatosPrincipioActivo(req.body, false);
      
      if (!validacion.valido) {
        throw new ApiError(400, "Datos inválidos", validacion.errores);
      }

      const principioActivo = await principioActivoService.createPrincipioActivo(req.body);
      res.status(201).json(ApiResponse.success("Principio activo creado exitosamente", principioActivo));
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los principios activos
  async getAllPrincipiosActivos(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const principiosActivos = await principioActivoService.getAllPrincipiosActivos();
      res.json(ApiResponse.success("Principios activos obtenidos exitosamente", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener principios activos con paginación
  async getPrincipiosActivosPaginated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await principioActivoService.getPrincipiosActivosPaginated(page, limit);
      res.json(ApiResponse.success("Principios activos paginados obtenidos exitosamente", result));
    } catch (error) {
      next(error);
    }
  }

  // Obtener principio activo por ID
  async getPrincipioActivoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        throw new ApiError(400, "Parámetro 'id' es requerido");
      }

      const principioActivo = await principioActivoService.getPrincipioActivoById(id);
      
      if (!principioActivo) {
        throw new ApiError(404, "Principio activo no encontrado");
      }

      res.json(ApiResponse.success("Principio activo obtenido exitosamente", principioActivo));
    } catch (error) {
      next(error);
    }
  }

  // Buscar principio activo por nombre exacto
  async getPrincipioActivoByNombre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre } = req.params;

      const principioActivo = await principioActivoService.getPrincipioActivoByNombre(nombre as string);
      
      if (!principioActivo) {
        throw new ApiError(404, "Principio activo no encontrado con ese nombre");
      }

      res.json(ApiResponse.success("Principio activo encontrado", principioActivo));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda por nombre (parcial)
  async searchByNombre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre } = req.query;

      if (!nombre || typeof nombre !== 'string') {
        throw new ApiError(400, "Parámetro 'nombre' es requerido");
      }

      const principiosActivos = await principioActivoService.searchPrincipiosActivosByNombre(nombre);
      res.json(ApiResponse.success("Búsqueda por nombre completada", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda por palabra clave
  async searchByKeyword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { keyword } = req.query;

      if (!keyword || typeof keyword !== 'string') {
        throw new ApiError(400, "Parámetro 'keyword' es requerido");
      }

      const principiosActivos = await principioActivoService.searchByKeyword(keyword);
      res.json(ApiResponse.success("Búsqueda por palabra clave completada", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Búsqueda avanzada
  async searchPrincipiosActivosAvanzado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: {
        nombre?: string;
        descripcion?: string;
        hasProducts?: boolean;
        minProductCount?: number;
        maxProductCount?: number;
      } = {};

      if (typeof req.query.nombre === 'string') {
        filters.nombre = req.query.nombre;
      }
      if (typeof req.query.descripcion === 'string') {
        filters.descripcion = req.query.descripcion;
      }
      if (req.query.hasProducts === 'true') {
        filters.hasProducts = true;
      } else if (req.query.hasProducts === 'false') {
        filters.hasProducts = false;
      }
      if (typeof req.query.minProductCount === 'string') {
        filters.minProductCount = parseInt(req.query.minProductCount);
      }
      if (typeof req.query.maxProductCount === 'string') {
        filters.maxProductCount = parseInt(req.query.maxProductCount);
      }

      const principiosActivos = await principioActivoService.searchPrincipiosActivosAvanzado(filters);
      res.json(ApiResponse.success("Búsqueda avanzada completada", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener principios activos más utilizados
  async getMostUsedPrincipiosActivos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

      const principiosActivos = await principioActivoService.getMostUsedPrincipiosActivos(limit);
      res.json(ApiResponse.success("Principios activos más utilizados obtenidos", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Obtener principios activos sin productos asociados
  async getUnusedPrincipiosActivos(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const principiosActivos = await principioActivoService.getUnusedPrincipiosActivos();
      res.json(ApiResponse.success("Principios activos sin uso obtenidos", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Actualizar principio activo
  async updatePrincipioActivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        throw new ApiError(400, "Parámetro 'id' es requerido");
      }

      const validacion = await principioActivoService.validarDatosPrincipioActivo(req.body, true);
      
      if (!validacion.valido) {
        throw new ApiError(400, "Datos inválidos", validacion.errores);
      }

      const principioActivo = await principioActivoService.updatePrincipioActivo(id, req.body);
      
      if (!principioActivo) {
        throw new ApiError(404, "Principio activo no encontrado");
      }

      res.json(ApiResponse.success("Principio activo actualizado exitosamente", principioActivo));
    } catch (error) {
      next(error);
    }
  }

  // Eliminar principio activo
  async deletePrincipioActivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        throw new ApiError(400, "Parámetro 'id' es requerido");
      }

      // Verificar si está en uso antes de eliminar
      const verificacion = await principioActivoService.verificarUso(id);
      
      if (!verificacion.puedeEliminar) {
        throw new ApiError(400, verificacion.mensaje);
      }

      const principioActivo = await principioActivoService.deletePrincipioActivo(id);
      
      if (!principioActivo) {
        throw new ApiError(404, "Principio activo no encontrado");
      }

      res.json(ApiResponse.success("Principio activo eliminado exitosamente", principioActivo));
    } catch (error) {
      next(error);
    }
  }

  // Obtener estadísticas de principios activos
  async getPrincipiosActivosStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await principioActivoService.getPrincipiosActivosStats();
      res.json(ApiResponse.success("Estadísticas obtenidas exitosamente", stats));
    } catch (error) {
      next(error);
    }
  }

  // Verificar uso de un principio activo
  async verificarUso(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        throw new ApiError(400, "Parámetro 'id' es requerido");
      }

      const resultado = await principioActivoService.verificarUso(id);
      res.json(ApiResponse.success("Verificación de uso completada", resultado));
    } catch (error) {
      next(error);
    }
  }

  // Validar datos de principio activo
  async validarDatosPrincipioActivo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { isUpdate = false } = req.query;
      
      const validacion = await principioActivoService.validarDatosPrincipioActivo(
        req.body, 
        isUpdate === 'true'
      );
      
      res.json(ApiResponse.success("Validación completada", validacion));
    } catch (error) {
      next(error);
    }
  }

  // Verificar si existe por nombre
  async verificarExistenciaPorNombre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre } = req.params;

      if (!nombre || typeof nombre !== 'string') {
        throw new ApiError(400, "Parámetro 'nombre' es requerido");
      }

      const existe = await principioActivoService.existsByNombre(nombre);
      
      const resultado = {
        existe,
        mensaje: existe 
          ? 'Ya existe un principio activo con este nombre'
          : 'El nombre está disponible'
      };

      res.json(ApiResponse.success("Verificación de existencia completada", resultado));
    } catch (error) {
      next(error);
    }
  }

  // Obtener conteo total
  async getCount(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await principioActivoService.getCount();
      res.json(ApiResponse.success("Conteo obtenido exitosamente", { total: count }));
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

      let principiosActivos;

      switch (tipo) {
        case 'nombre':
          principiosActivos = await principioActivoService.searchPrincipiosActivosByNombre(query);
          break;
        case 'keyword':
          principiosActivos = await principioActivoService.searchByKeyword(query);
          break;
        case 'exacto':
          const principioActivo = await principioActivoService.getPrincipioActivoByNombre(query);
          principiosActivos = principioActivo ? [principioActivo] : [];
          break;
        default:
          // Búsqueda combinada por defecto
          const [porNombre, porKeyword] = await Promise.all([
            principioActivoService.searchPrincipiosActivosByNombre(query),
            principioActivoService.searchByKeyword(query)
          ]);
          
          // Combinar y eliminar duplicados
          const idsVistos = new Set();
          principiosActivos = [...porNombre, ...porKeyword].filter(pa => {
            const id = pa._id?.toString();
            if (idsVistos.has(id)) return false;
            idsVistos.add(id);
            return true;
          });
      }

      res.json(ApiResponse.success("Búsqueda general completada", principiosActivos));
    } catch (error) {
      next(error);
    }
  }

  // Exportar datos (para reportes)
  async exportData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { formato = 'json', incluirEstadisticas = 'false' } = req.query;

      const principiosActivos = await principioActivoService.getAllPrincipiosActivos();
      
      let data: any = { principiosActivos };

      if (incluirEstadisticas === 'true') {
        const stats = await principioActivoService.getPrincipiosActivosStats();
        data.estadisticas = stats;
      }

      if (formato === 'csv') {
        // Aquí podrías implementar conversión a CSV
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=principios-activos.csv');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=principios-activos.json');
      }

      res.json(ApiResponse.success("Datos exportados exitosamente", data));
    } catch (error) {
      next(error);
    }
  }

  // Importar datos (para carga masiva)
  async importData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { principiosActivos } = req.body;

      if (!Array.isArray(principiosActivos)) {
        throw new ApiError(400, "Se requiere un array de principios activos");
      }

      const resultados = {
        exitosos: 0,
        errores: 0,
        detalles: [] as any[]
      };

      for (const principioActivoData of principiosActivos) {
        try {
          const validacion = await principioActivoService.validarDatosPrincipioActivo(principioActivoData, false);
          
          if (validacion.valido) {
            await principioActivoService.createPrincipioActivo(principioActivoData);
            resultados.exitosos++;
            resultados.detalles.push({
              nombre: principioActivoData.nombre,
              estado: 'exitoso'
            });
          } else {
            resultados.errores++;
            resultados.detalles.push({
              nombre: principioActivoData.nombre || 'Sin nombre',
              estado: 'error',
              errores: validacion.errores
            });
          }
        } catch (error) {
          resultados.errores++;
          resultados.detalles.push({
            nombre: principioActivoData.nombre || 'Sin nombre',
            estado: 'error',
            error: error
          });
        }
      }

      res.json(ApiResponse.success("Importación completada", resultados));
    } catch (error) {
      next(error);
    }
  }
}

export const principioActivoController = new PrincipioActivoController();