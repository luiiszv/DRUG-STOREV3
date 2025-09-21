import { PrincipioActivoModel } from "./principioActivo.model";
import { IPrincipioActivo } from "./types/IPrincipioActivo";

export class PrincipioActivoRepository {

    // Crear un nuevo principio activo
    async create(principioActivoData: Partial<IPrincipioActivo>): Promise<IPrincipioActivo> {
        try {
            const principioActivo = new PrincipioActivoModel(principioActivoData);
            return await principioActivo.save();
        } catch (error) {
            throw new Error(`Error en el repositorio al crear principio activo: ${error}`);
        }
    }

    // Obtener todos los principios activos
    async findAll(): Promise<IPrincipioActivo[]> {
        try {
            return await PrincipioActivoModel.find().sort({ nombre: 1 });
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener principios activos: ${error}`);
        }
    }

    // Obtener principio activo por ID
    async findById(id: string): Promise<IPrincipioActivo | null> {
        try {
            return await PrincipioActivoModel.findById(id);
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener principio activo por ID: ${error}`);
        }
    }

    // Buscar principio activo por nombre exacto
    async findByNombre(nombre: string): Promise<IPrincipioActivo | null> {
        try {
            return await PrincipioActivoModel.findOne({ 
                nombre: { $regex: new RegExp(`^${nombre}$`, 'i') } 
            });
        } catch (error) {
            throw new Error(`Error en el repositorio al buscar principio activo por nombre: ${error}`);
        }
    }

    // Buscar principios activos por nombre (búsqueda parcial)
    async searchByNombre(nombre: string): Promise<IPrincipioActivo[]> {
        try {
            return await PrincipioActivoModel.find({
                nombre: { $regex: nombre, $options: 'i' }
            }).sort({ nombre: 1 });
        } catch (error) {
            throw new Error(`Error en el repositorio al buscar principios activos: ${error}`);
        }
    }

    // Actualizar principio activo por ID
    async updateById(id: string, updateData: Partial<IPrincipioActivo>): Promise<IPrincipioActivo | null> {
        try {
            return await PrincipioActivoModel.findByIdAndUpdate(
                id,
                { ...updateData, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error en el repositorio al actualizar principio activo: ${error}`);
        }
    }

    // Eliminar principio activo por ID
    async deleteById(id: string): Promise<IPrincipioActivo | null> {
        try {
            return await PrincipioActivoModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error en el repositorio al eliminar principio activo: ${error}`);
        }
    }

    // Verificar si existe un principio activo por nombre
    async existsByNombre(nombre: string): Promise<boolean> {
        try {
            const count = await PrincipioActivoModel.countDocuments({
                nombre: { $regex: new RegExp(`^${nombre}$`, 'i') }
            });
            return count > 0;
        } catch (error) {
            throw new Error(`Error en el repositorio al verificar existencia por nombre: ${error}`);
        }
    }

    // Contar total de principios activos
    async count(): Promise<number> {
        try {
            return await PrincipioActivoModel.countDocuments();
        } catch (error) {
            throw new Error(`Error en el repositorio al contar principios activos: ${error}`);
        }
    }

    // Obtener principios activos con paginación
    async findPaginated(page: number = 1, limit: number = 10): Promise<{
        principiosActivos: IPrincipioActivo[];
        total: number;
        totalPages: number;
        currentPage: number;
    }> {
        try {
            const skip = (page - 1) * limit;
            
            const [principiosActivos, total] = await Promise.all([
                PrincipioActivoModel.find()
                    .sort({ nombre: 1 })
                    .skip(skip)
                    .limit(limit),
                this.count()
            ]);

            const totalPages = Math.ceil(total / limit);

            return {
                principiosActivos,
                total,
                totalPages,
                currentPage: page
            };
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener principios activos paginados: ${error}`);
        }
    }

    // Buscar principios activos que contengan una palabra clave en nombre o descripción
    async searchByKeyword(keyword: string): Promise<IPrincipioActivo[]> {
        try {
            return await PrincipioActivoModel.find({
                $or: [
                    { nombre: { $regex: keyword, $options: 'i' } },
                    { descripcion: { $regex: keyword, $options: 'i' } }
                ]
            }).sort({ nombre: 1 });
        } catch (error) {
            throw new Error(`Error en el repositorio al buscar por palabra clave: ${error}`);
        }
    }

    // Obtener principios activos más utilizados (basado en productos que los usan)
    async findMostUsed(limit: number = 10): Promise<Array<{
        principioActivo: IPrincipioActivo;
        productCount: number;
    }>> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'productos', // nombre de la colección de productos
                        localField: '_id',
                        foreignField: 'principioActivo',
                        as: 'productos'
                    }
                },
                {
                    $addFields: {
                        productCount: { $size: '$productos' }
                    }
                },
                {
                    $sort: { productCount: -1 as -1, nombre: 1 as 1 }
                },
                {
                    $limit: limit
                },
                {
                    $project: {
                        _id: 1,
                        nombre: 1,
                        descripcion: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        productCount: 1
                    }
                }
            ];

            const result = await PrincipioActivoModel.aggregate(pipeline);
            
            return result.map(item => ({
                principioActivo: {
                    _id: item._id,
                    nombre: item.nombre,
                    descripcion: item.descripcion,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                } as unknown as IPrincipioActivo,
                productCount: item.productCount
            }));
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener principios activos más utilizados: ${error}`);
        }
    }

    // Obtener principios activos sin productos asociados
    async findUnused(): Promise<IPrincipioActivo[]> {
        try {
            const pipeline = [
                {
                    $lookup: {
                        from: 'productos',
                        localField: '_id',
                        foreignField: 'principioActivo',
                        as: 'productos'
                    }
                },
                {
                    $match: {
                        productos: { $size: 0 }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        nombre: 1,
                        descripcion: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                },
                {
                    $sort: { nombre: 1 as 1 }
                }
            ];

            return await PrincipioActivoModel.aggregate(pipeline);
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener principios activos sin uso: ${error}`);
        }
    }

    // Verificar si un principio activo está siendo usado por productos
    async isUsedByProducts(id: string): Promise<boolean> {
        try {
            // Importación dinámica para evitar dependencias circulares
            const { ProductoModel } = await import('../products/producto.model');
            
            const count = await ProductoModel.countDocuments({ principioActivo: id });
            return count > 0;
        } catch (error) {
            throw new Error(`Error en el repositorio al verificar uso del principio activo: ${error}`);
        }
    }

    // Obtener estadísticas de principios activos
    async getStats(): Promise<{
        total: number;
        conProductos: number;
        sinProductos: number;
        promedioProductosPorPrincipio: number;
    }> {
        try {
            const [total, unused, mostUsedStats] = await Promise.all([
                this.count(),
                this.findUnused(),
                this.findMostUsed(1000) // Obtener todos para calcular promedio
            ]);

            const conProductos = total - unused.length;
            const sinProductos = unused.length;
            
            const totalProductos = mostUsedStats.reduce((sum, item) => sum + item.productCount, 0);
            const promedioProductosPorPrincipio = conProductos > 0 ? totalProductos / conProductos : 0;

            return {
                total,
                conProductos,
                sinProductos,
                promedioProductosPorPrincipio: Math.round(promedioProductosPorPrincipio * 100) / 100
            };
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener estadísticas: ${error}`);
        }
    }

    // Búsqueda avanzada con múltiples filtros
    async advancedSearch(filters: {
        nombre?: string;
        descripcion?: string;
        hasProducts?: boolean;
        minProductCount?: number;
        maxProductCount?: number;
    }): Promise<IPrincipioActivo[]> {
        try {
            const pipeline: any[] = [];

            // Lookup para obtener información de productos
            pipeline.push({
                $lookup: {
                    from: 'productos',
                    localField: '_id',
                    foreignField: 'principioActivo',
                    as: 'productos'
                }
            });

            // Agregar campo de conteo de productos
            pipeline.push({
                $addFields: {
                    productCount: { $size: '$productos' }
                }
            });

            // Construir filtros de match
            const matchConditions: any = {};

            if (filters.nombre) {
                matchConditions.nombre = { $regex: filters.nombre, $options: 'i' };
            }

            if (filters.descripcion) {
                matchConditions.descripcion = { $regex: filters.descripcion, $options: 'i' };
            }

            if (filters.hasProducts !== undefined) {
                if (filters.hasProducts) {
                    matchConditions.productCount = { $gt: 0 };
                } else {
                    matchConditions.productCount = 0;
                }
            }

            if (filters.minProductCount !== undefined) {
                matchConditions.productCount = { 
                    ...matchConditions.productCount, 
                    $gte: filters.minProductCount 
                };
            }

            if (filters.maxProductCount !== undefined) {
                matchConditions.productCount = { 
                    ...matchConditions.productCount, 
                    $lte: filters.maxProductCount 
                };
            }

            if (Object.keys(matchConditions).length > 0) {
                pipeline.push({ $match: matchConditions });
            }

            // Proyección para limpiar el resultado
            pipeline.push({
                $project: {
                    _id: 1,
                    nombre: 1,
                    descripcion: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            });

            // Ordenar por nombre
            pipeline.push({ $sort: { nombre: 1 } });

            return await PrincipioActivoModel.aggregate(pipeline);
        } catch (error) {
            throw new Error(`Error en el repositorio en búsqueda avanzada: ${error}`);
        }
    }
}

export const principioActivoRepository = new PrincipioActivoRepository();