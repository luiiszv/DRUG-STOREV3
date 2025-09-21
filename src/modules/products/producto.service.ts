import { productoRepository } from "./producto.repository";
import { IProducto } from "./types/IProducto";

export class ProductoService {

    // Crear un nuevo producto
    async createProducto(productData: Partial<IProducto>): Promise<IProducto> {
        try {
            // Validaciones básicas
            if (!productData.nombreComercial || !productData.nombreGenerico) {
                throw new Error('Nombre comercial y nombre genérico son requeridos');
            }

            if (!productData.principioActivo || !productData.concentracion || !productData.formaFarmaceutica) {
                throw new Error('Principio activo, concentración y forma farmacéutica son requeridos');
            }

            if (!productData.subcategoria || !productData.laboratorio || !productData.unidadMedida) {
                throw new Error('Subcategoría, laboratorio y unidad de medida son requeridos');
            }

            // Verificar si ya existe un producto con el mismo código de barras
            if (productData.codigoBarras) {
                const existingProduct = await productoRepository.existsByCodigoBarras(productData.codigoBarras);
                if (existingProduct) {
                    throw new Error('Ya existe un producto con este código de barras');
                }
            }

            return await productoRepository.create(productData);
        } catch (error) {
            throw new Error(`Error en el servicio al crear producto: ${error}`);
        }
    }

    // Obtener todos los productos
    async getAllProductos(): Promise<IProducto[]> {
        try {
            return await productoRepository.findAll();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos: ${error}`);
        }
    }

    // Obtener todos los productos con referencias pobladas
    async getAllProductosPopulated(): Promise<IProducto[]> {
        try {
            return await productoRepository.findAllPopulated();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos poblados: ${error}`);
        }
    }

    // Obtener producto por ID
    async getProductoById(id: string): Promise<IProducto | null> {
        try {
            if (!id) {
                throw new Error('ID del producto es requerido');
            }

            const producto = await productoRepository.findById(id);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            return producto;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener producto por ID: ${error}`);
        }
    }

    // Obtener producto por ID con referencias pobladas
    async getProductoByIdPopulated(id: string): Promise<IProducto | null> {
        try {
            if (!id) {
                throw new Error('ID del producto es requerido');
            }

            const producto = await productoRepository.findByIdPopulated(id);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            return producto;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener producto poblado por ID: ${error}`);
        }
    }

    // Buscar producto por código de barras
    async getProductoByCodigoBarras(codigoBarras: string): Promise<IProducto | null> {
        try {
            if (!codigoBarras) {
                throw new Error('Código de barras es requerido');
            }

            return await productoRepository.findByCodigoBarras(codigoBarras);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar producto por código de barras: ${error}`);
        }
    }

    // Buscar productos por nombre comercial
    async searchProductosByNombreComercial(nombre: string): Promise<IProducto[]> {
        try {
            if (!nombre || nombre.trim().length < 2) {
                throw new Error('El nombre debe tener al menos 2 caracteres');
            }
            return await productoRepository.findByNombreComercial(nombre);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar productos por nombre comercial: ${error}`);
        }
    }

    // Buscar productos por nombre genérico
    async searchProductosByNombreGenerico(nombre: string): Promise<IProducto[]> {
        try {
            if (!nombre || nombre.trim().length < 2) {
                throw new Error('El nombre debe tener al menos 2 caracteres');
            }
            return await productoRepository.findByNombreGenerico(nombre);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar productos por nombre genérico: ${error}`);
        }
    }

    // Buscar productos por principio activo
    async getProductosByPrincipioActivo(principioActivoId: string): Promise<IProducto[]> {
        try {
            if (!principioActivoId) {
                throw new Error('ID del principio activo es requerido');
            }
            return await productoRepository.findByPrincipioActivo(principioActivoId);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar productos por principio activo: ${error}`);
        }
    }

    // Buscar productos por laboratorio
    async getProductosByLaboratorio(laboratorioId: string): Promise<IProducto[]> {
        try {
            if (!laboratorioId) {
                throw new Error('ID del laboratorio es requerido');
            }
            return await productoRepository.findByLaboratorio(laboratorioId);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar productos por laboratorio: ${error}`);
        }
    }

    // Buscar productos por subcategoría
    async getProductosBySubcategoria(subcategoriaId: string): Promise<IProducto[]> {
        try {
            if (!subcategoriaId) {
                throw new Error('ID de la subcategoría es requerido');
            }
            return await productoRepository.findBySubcategoria(subcategoriaId);
        } catch (error) {
            throw new Error(`Error en el servicio al buscar productos por subcategoría: ${error}`);
        }
    }

    // Obtener productos con stock bajo
    async getProductosConStockBajo(): Promise<IProducto[]> {
        try {
            return await productoRepository.findLowStock();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos con stock bajo: ${error}`);
        }
    }

    // Actualizar producto
    async updateProducto(id: string, updateData: Partial<IProducto>): Promise<IProducto | null> {
        try {
            if (!id) {
                throw new Error('ID del producto es requerido');
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                throw new Error('Datos para actualizar son requeridos');
            }

            // Si se está actualizando el código de barras, verificar que no exista
            if (updateData.codigoBarras) {
                const existingProduct = await productoRepository.findByCodigoBarras(updateData.codigoBarras);
                if (existingProduct && existingProduct._id.toString() !== id) {
                    throw new Error('Ya existe un producto con este código de barras');
                }
            }

            // Validar stockMinimo si se está actualizando
            if (updateData.stockMinimo !== undefined && updateData.stockMinimo < 0) {
                throw new Error('El stock mínimo no puede ser negativo');
            }

            const updatedProducto = await productoRepository.updateById(id, updateData);
            if (!updatedProducto) {
                throw new Error('Producto no encontrado para actualizar');
            }
            return updatedProducto;
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar producto: ${error}`);
        }
    }

    // Eliminar producto
    async deleteProducto(id: string): Promise<IProducto | null> {
        try {
            if (!id) {
                throw new Error('ID del producto es requerido');
            }

            const deletedProducto = await productoRepository.deleteById(id);
            if (!deletedProducto) {
                throw new Error('Producto no encontrado para eliminar');
            }
            return deletedProducto;
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar producto: ${error}`);
        }
    }

    // Obtener estadísticas de productos
    async getProductosStats(): Promise<{
        totalProductos: number;
        productosConStockBajo: number;
        promedioStockMinimo: number;
    }> {
        try {
            const [totalProductos, productosConStockBajo] = await Promise.all([
                productoRepository.count(),
                productoRepository.findLowStock()
            ]);

            // Calcular promedio de stock mínimo
            const todosProductos = await productoRepository.findAll();
            const promedioStockMinimo = todosProductos.length > 0
                ? todosProductos.reduce((sum, p) => sum + (p.stockMinimo || 0), 0) / todosProductos.length
                : 0;

            return {
                totalProductos,
                productosConStockBajo: productosConStockBajo.length,
                promedioStockMinimo: Math.round(promedioStockMinimo * 100) / 100
            };
        } catch (error) {
            throw new Error(`Error en el servicio al obtener estadísticas: ${error}`);
        }
    }

    // Obtener productos con paginación
    async getProductosPaginated(page: number = 1, limit: number = 10): Promise<{
        products: IProducto[];
        total: number;
        totalPages: number;
        currentPage: number;
    }> {
        try {
            if (page < 1) page = 1;
            if (limit < 1) limit = 10;
            if (limit > 100) limit = 100; // Limitar el máximo de elementos por página

            return await productoRepository.findPaginated(page, limit);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos paginados: ${error}`);
        }
    }

    // Búsqueda avanzada de productos
    async searchProductosAvanzado(searchParams: {
        nombreComercial?: string;
        nombreGenerico?: string;
        principioActivo?: string;
        laboratorio?: string;
        subcategoria?: string;
    }): Promise<IProducto[]> {
        try {
            // Validar que al menos un parámetro de búsqueda esté presente
            const hasSearchParams = Object.values(searchParams).some(param =>
                param && param.toString().trim().length > 0
            );

            if (!hasSearchParams) {
                throw new Error('Debe proporcionar al menos un parámetro de búsqueda');
            }

            return await productoRepository.searchProducts(searchParams);
        } catch (error) {
            throw new Error(`Error en el servicio de búsqueda avanzada: ${error}`);
        }
    }

    // Actualizar stock mínimo de producto
    async updateStockMinimo(id: string, nuevoStockMinimo: number): Promise<IProducto | null> {
        try {
            if (!id) {
                throw new Error('ID del producto es requerido');
            }

            if (nuevoStockMinimo < 0) {
                throw new Error('El stock mínimo no puede ser negativo');
            }

            return await this.updateProducto(id, { stockMinimo: nuevoStockMinimo });
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar stock mínimo: ${error}`);
        }
    }

    // Verificar si un producto necesita reabastecimiento
    async verificarReabastecimiento(id: string): Promise<{
        necesitaReabastecimiento: boolean;
        stockMinimo: number;
        mensaje: string;
    }> {
        try {
            const producto = await this.getProductoById(id);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            // Para este caso, solo podemos verificar con el stock mínimo configurado
            // En un sistema real con lotes, esto sería más complejo
            const stockMinimo = producto.stockMinimo || 0;
            const necesitaReabastecimiento = stockMinimo > 0; // Simplificado

            let mensaje = 'Estado de stock normal';
            if (necesitaReabastecimiento) {
                mensaje = `El producto tiene un stock mínimo configurado de ${stockMinimo} unidades. Revisar niveles de inventario.`;
            }

            return {
                necesitaReabastecimiento,
                stockMinimo,
                mensaje
            };
        } catch (error) {
            throw new Error(`Error en el servicio al verificar reabastecimiento: ${error}`);
        }
    }

    // Obtener productos por múltiples criterios
    async getProductosByCriterios(criterios: {
        nombreComercial?: string;
        nombreGenerico?: string;
        principioActivo?: string;
        laboratorio?: string;
        subcategoria?: string;
        stockBajo?: boolean;
    }): Promise<IProducto[]> {
        try {
            let productos: IProducto[];

            if (criterios.stockBajo) {
                productos = await this.getProductosConStockBajo();
            } else {
                // Filtrar otros criterios
                const rawSearchParams = {
                    nombreComercial: criterios.nombreComercial,
                    nombreGenerico: criterios.nombreGenerico,
                    principioActivo: criterios.principioActivo,
                    laboratorio: criterios.laboratorio,
                    subcategoria: criterios.subcategoria
                };

                // Remover parámetros con valor undefined
                const searchParams: {
                    nombreComercial?: string;
                    nombreGenerico?: string;
                    principioActivo?: string;
                    laboratorio?: string;
                    subcategoria?: string;
                } = {};

                Object.entries(rawSearchParams).forEach(([key, value]) => {
                    if (typeof value === "string") {
                        (searchParams as any)[key] = value;
                    }
                });

                if (Object.keys(searchParams).length > 0) {
                    productos = await this.searchProductosAvanzado(searchParams);
                } else {
                    productos = await this.getAllProductos();
                }
            }

            return productos;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos por criterios: ${error}`);
        }
    }

    // Validar datos de producto antes de crear/actualizar
    async validarDatosProducto(productData: Partial<IProducto>, isUpdate: boolean = false): Promise<{
        valido: boolean;
        errores: string[];
    }> {
        try {
            const errores: string[] = [];

            if (!isUpdate) {
                // Validaciones para creación
                if (!productData.nombreComercial) errores.push('Nombre comercial es requerido');
                if (!productData.nombreGenerico) errores.push('Nombre genérico es requerido');
                if (!productData.principioActivo) errores.push('Principio activo es requerido');
                if (!productData.concentracion) errores.push('Concentración es requerida');
                if (!productData.formaFarmaceutica) errores.push('Forma farmacéutica es requerida');
                if (!productData.subcategoria) errores.push('Subcategoría es requerida');
                if (!productData.laboratorio) errores.push('Laboratorio es requerido');
                if (!productData.unidadMedida) errores.push('Unidad de medida es requerida');
            }

            // Validaciones comunes
            if (productData.stockMinimo !== undefined && productData.stockMinimo < 0) {
                errores.push('Stock mínimo no puede ser negativo');
            }

            if (productData.nombreComercial && productData.nombreComercial.length < 2) {
                errores.push('Nombre comercial debe tener al menos 2 caracteres');
            }

            if (productData.nombreGenerico && productData.nombreGenerico.length < 2) {
                errores.push('Nombre genérico debe tener al menos 2 caracteres');
            }

            // Validar código de barras si existe
            if (productData.codigoBarras) {
                const existe = await productoRepository.existsByCodigoBarras(productData.codigoBarras);
                if (existe) {
                    errores.push('Ya existe un producto con este código de barras');
                }
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

    // Obtener resumen de productos por laboratorio
    async getResumenPorLaboratorio(): Promise<Array<{
        laboratorio: string;
        totalProductos: number;
        productosStockBajo: number;
    }>> {
        try {
            const productos = await productoRepository.findAllPopulated();
            const productosStockBajo = await this.getProductosConStockBajo();

            const resumen = new Map();

            productos.forEach(producto => {
                const labId = producto.laboratorio.toString();
                const labNombre = (producto.laboratorio as any).nombre || 'Sin nombre';

                if (!resumen.has(labId)) {
                    resumen.set(labId, {
                        laboratorio: labNombre,
                        totalProductos: 0,
                        productosStockBajo: 0
                    });
                }

                const item = resumen.get(labId);
                item.totalProductos++;

                // Verificar si está en stock bajo
                const tieneStockBajo = productosStockBajo.some(p => p._id?.toString() === producto._id?.toString());
                if (tieneStockBajo) {
                    item.productosStockBajo++;
                }
            });

            return Array.from(resumen.values());
        } catch (error) {
            throw new Error(`Error en el servicio al obtener resumen por laboratorio: ${error}`);
        }
    }
}

export const productoService = new ProductoService();