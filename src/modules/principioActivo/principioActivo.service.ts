import { principioActivoRepository } from "./principioActivo.repository";
import { IPrincipioActivo } from "./types/IPrincipioActivo";

export class PrincipioActivoService {

  // Crear un nuevo principio activo
  async createPrincipioActivo(principioActivoData: Partial<IPrincipioActivo>): Promise<IPrincipioActivo> {
    try {
      // Validaciones básicas
      if (!principioActivoData.nombre || principioActivoData.nombre.trim().length === 0) {
        throw new Error('El nombre del principio activo es requerido');
      }

      // Validar longitud mínima del nombre
      if (principioActivoData.nombre.trim().length < 2) {
        throw new Error('El nombre del principio activo debe tener al menos 2 caracteres');
      }

      // Validar longitud máxima del nombre
      if (principioActivoData.nombre.trim().length > 200) {
        throw new Error('El nombre del principio activo no puede exceder 200 caracteres');
      }

      // Verificar si ya existe un principio activo con el mismo nombre
      const nombreLimpio = principioActivoData.nombre.trim();
      const existingPrincipioActivo = await principioActivoRepository.existsByNombre(nombreLimpio);
      if (existingPrincipioActivo) {
        throw new Error('Ya existe un principio activo con este nombre');
      }

      // Validar descripción si se proporciona
      if (principioActivoData.descripcion && principioActivoData.descripcion.length > 500) {
        throw new Error('La descripción no puede exceder 500 caracteres');
      }

      // Limpiar y formatear datos
      const dataLimpia = {
        ...principioActivoData,
        nombre: nombreLimpio,
        descripcion: principioActivoData.descripcion?.trim() || ""
      };

      return await principioActivoRepository.create(dataLimpia);
    } catch (error) {
      throw new Error(`Error en el servicio al crear principio activo: ${error}`);
    }
  }

  // Obtener todos los principios activos
  async getAllPrincipiosActivos(): Promise<IPrincipioActivo[]> {
    try {
      return await principioActivoRepository.findAll();
    } catch (error) {
      throw new Error(`Error en el servicio al obtener principios activos: ${error}`);
    }
  }

  // Obtener principio activo por ID
  async getPrincipioActivoById(id: string): Promise<IPrincipioActivo | null> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('ID del principio activo es requerido');
      }

      const principioActivo = await principioActivoRepository.findById(id);
      if (!principioActivo) {
        throw new Error('Principio activo no encontrado');
      }
      return principioActivo;
    } catch (error) {
      throw new Error(`Error en el servicio al obtener principio activo por ID: ${error}`);
    }
  }

  // Buscar principio activo por nombre exacto
  async getPrincipioActivoByNombre(nombre: string): Promise<IPrincipioActivo | null> {
    try {
      if (!nombre || nombre.trim().length === 0) {
        throw new Error('Nombre del principio activo es requerido');
      }

      return await principioActivoRepository.findByNombre(nombre.trim());
    } catch (error) {
      throw new Error(`Error en el servicio al buscar principio activo por nombre: ${error}`);
    }
  }

  // Buscar principios activos por nombre (búsqueda parcial)
  async searchPrincipiosActivosByNombre(nombre: string): Promise<IPrincipioActivo[]> {
    try {
      if (!nombre || nombre.trim().length < 2) {
        throw new Error('El nombre debe tener al menos 2 caracteres para la búsqueda');
      }

      return await principioActivoRepository.searchByNombre(nombre.trim());
    } catch (error) {
      throw new Error(`Error en el servicio al buscar principios activos por nombre: ${error}`);
    }
  }

  // Buscar por palabra clave en nombre o descripción
  async searchByKeyword(keyword: string): Promise<IPrincipioActivo[]> {
    try {
      if (!keyword || keyword.trim().length < 2) {
        throw new Error('La palabra clave debe tener al menos 2 caracteres');
      }

      return await principioActivoRepository.searchByKeyword(keyword.trim());
    } catch (error) {
      throw new Error(`Error en el servicio al buscar por palabra clave: ${error}`);
    }
  }

  // Actualizar principio activo
  async updatePrincipioActivo(id: string, updateData: Partial<IPrincipioActivo>): Promise<IPrincipioActivo | null> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('ID del principio activo es requerido');
      }

      if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error('Datos para actualizar son requeridos');
      }

      // Validar nombre si se está actualizando
      if (updateData.nombre !== undefined) {
        if (!updateData.nombre || updateData.nombre.trim().length === 0) {
          throw new Error('El nombre del principio activo no puede estar vacío');
        }

        if (updateData.nombre.trim().length < 2) {
          throw new Error('El nombre del principio activo debe tener al menos 2 caracteres');
        }

        if (updateData.nombre.trim().length > 200) {
          throw new Error('El nombre del principio activo no puede exceder 200 caracteres');
        }

        // Verificar si ya existe otro principio activo con el mismo nombre
        const nombreLimpio = updateData.nombre.trim();
        const existingPrincipioActivo = await principioActivoRepository.findByNombre(nombreLimpio);
        if (existingPrincipioActivo && existingPrincipioActivo._id.toString() !== id) {
          throw new Error('Ya existe un principio activo con este nombre');
        }

        updateData.nombre = nombreLimpio;
      }

      // Validar descripción si se está actualizando
      if (updateData.descripcion !== undefined) {
        if (updateData.descripcion && updateData.descripcion.length > 500) {
          throw new Error('La descripción no puede exceder 500 caracteres');
        }
        updateData.descripcion = updateData.descripcion?.trim() || "";
      }

      const updatedPrincipioActivo = await principioActivoRepository.updateById(id, updateData);
      if (!updatedPrincipioActivo) {
        throw new Error('Principio activo no encontrado para actualizar');
      }
      return updatedPrincipioActivo;
    } catch (error) {
      throw new Error(`Error en el servicio al actualizar principio activo: ${error}`);
    }
  }

  // Eliminar principio activo
  async deletePrincipioActivo(id: string): Promise<IPrincipioActivo | null> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('ID del principio activo es requerido');
      }

      // Verificar si el principio activo está siendo usado por productos
      const isUsed = await principioActivoRepository.isUsedByProducts(id);
      if (isUsed) {
        throw new Error('No se puede eliminar el principio activo porque está siendo usado por uno o más productos');
      }

      const deletedPrincipioActivo = await principioActivoRepository.deleteById(id);
      if (!deletedPrincipioActivo) {
        throw new Error('Principio activo no encontrado para eliminar');
      }
      return deletedPrincipioActivo;
    } catch (error) {
      throw new Error(`Error en el servicio al eliminar principio activo: ${error}`);
    }
  }

  // Obtener principios activos con paginación
  async getPrincipiosActivosPaginated(page: number = 1, limit: number = 10): Promise<{
    principiosActivos: IPrincipioActivo[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      if (page < 1) page = 1;
      if (limit < 1) limit = 10;
      if (limit > 100) limit = 100; // Limitar el máximo de elementos por página

      return await principioActivoRepository.findPaginated(page, limit);
    } catch (error) {
      throw new Error(`Error en el servicio al obtener principios activos paginados: ${error}`);
    }
  }

  // Obtener principios activos más utilizados
  async getMostUsedPrincipiosActivos(limit: number = 10): Promise<Array<{
    principioActivo: IPrincipioActivo;
    productCount: number;
  }>> {
    try {
      if (limit < 1) limit = 10;
      if (limit > 50) limit = 50; // Limitar para evitar consultas muy pesadas

      return await principioActivoRepository.findMostUsed(limit);
    } catch (error) {
      throw new Error(`Error en el servicio al obtener principios activos más utilizados: ${error}`);
    }
  }

  // Obtener principios activos sin productos asociados
  async getUnusedPrincipiosActivos(): Promise<IPrincipioActivo[]> {
    try {
      return await principioActivoRepository.findUnused();
    } catch (error) {
      throw new Error(`Error en el servicio al obtener principios activos sin uso: ${error}`);
    }
  }

  // Obtener estadísticas de principios activos
  async getPrincipiosActivosStats(): Promise<{
    total: number;
    conProductos: number;
    sinProductos: number;
    promedioProductosPorPrincipio: number;
  }> {
    try {
      return await principioActivoRepository.getStats();
    } catch (error) {
      throw new Error(`Error en el servicio al obtener estadísticas: ${error}`);
    }
  }

  // Búsqueda avanzada con múltiples filtros
  async searchPrincipiosActivosAvanzado(filters: {
    nombre?: string;
    descripcion?: string;
    hasProducts?: boolean;
    minProductCount?: number;
    maxProductCount?: number;
  }): Promise<IPrincipioActivo[]> {
    try {
      // Validar que al menos un filtro esté presente
      const hasFilters = Object.values(filters).some(value => 
        value !== undefined && value !== null && value !== ''
      );

      if (!hasFilters) {
        throw new Error('Debe proporcionar al menos un filtro de búsqueda');
      }

      // Validar filtros numéricos
      if (filters.minProductCount !== undefined && filters.minProductCount < 0) {
        throw new Error('El conteo mínimo de productos no puede ser negativo');
      }

      if (filters.maxProductCount !== undefined && filters.maxProductCount < 0) {
        throw new Error('El conteo máximo de productos no puede ser negativo');
      }

      if (filters.minProductCount !== undefined && filters.maxProductCount !== undefined) {
        if (filters.minProductCount > filters.maxProductCount) {
          throw new Error('El conteo mínimo no puede ser mayor que el conteo máximo');
        }
      }

      return await principioActivoRepository.advancedSearch(filters);
    } catch (error) {
      throw new Error(`Error en el servicio de búsqueda avanzada: ${error}`);
    }
  }

  // Verificar si un principio activo está en uso
  async verificarUso(id: string): Promise<{
    enUso: boolean;
    mensaje: string;
    puedeEliminar: boolean;
  }> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('ID del principio activo es requerido');
      }

      const isUsed = await principioActivoRepository.isUsedByProducts(id);
      
      return {
        enUso: isUsed,
        mensaje: isUsed 
          ? 'El principio activo está siendo usado por uno o más productos'
          : 'El principio activo no está siendo usado por ningún producto',
        puedeEliminar: !isUsed
      };
    } catch (error) {
      throw new Error(`Error en el servicio al verificar uso: ${error}`);
    }
  }

  // Validar datos de principio activo
  async validarDatosPrincipioActivo(data: Partial<IPrincipioActivo>, isUpdate: boolean = false): Promise<{
    valido: boolean;
    errores: string[];
  }> {
    try {
      const errores: string[] = [];

      // Validaciones para creación
      if (!isUpdate) {
        if (!data.nombre) {
          errores.push('El nombre del principio activo es requerido');
        }
      }

      // Validaciones comunes
      if (data.nombre !== undefined) {
        if (data.nombre.trim().length < 2) {
          errores.push('El nombre debe tener al menos 2 caracteres');
        }
        if (data.nombre.trim().length > 200) {
          errores.push('El nombre no puede exceder 200 caracteres');
        }

        // Verificar unicidad del nombre
        const existe = await principioActivoRepository.existsByNombre(data.nombre.trim());
        if (existe) {
          errores.push('Ya existe un principio activo con este nombre');
        }
      }

      if (data.descripcion !== undefined && data.descripcion.length > 500) {
        errores.push('La descripción no puede exceder 500 caracteres');
      }

      return {
        valido: errores.length === 0,
        errores
      };
    } catch (error) {
      return {
        valido: false,
        errores: [`Error en validación: ${error}`]
      };
    }
  }

  // Obtener conteo total
  async getCount(): Promise<number> {
    try {
      return await principioActivoRepository.count();
    } catch (error) {
      throw new Error(`Error en el servicio al obtener conteo: ${error}`);
    }
  }

  // Verificar existencia por nombre
  async existsByNombre(nombre: string): Promise<boolean> {
    try {
      if (!nombre || nombre.trim().length === 0) {
        return false;
      }

      return await principioActivoRepository.existsByNombre(nombre.trim());
    } catch (error) {
      throw new Error(`Error en el servicio al verificar existencia por nombre: ${error}`);
    }
  }
}

export const principioActivoService = new PrincipioActivoService();