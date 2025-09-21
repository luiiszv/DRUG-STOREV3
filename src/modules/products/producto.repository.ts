import { ProductoModel } from "./producto.model";
import { IProducto } from "./types/IProducto";


export class ProductoRepository {

    // Crear un nuevo producto
    async create(productData: Partial<IProducto>): Promise<IProducto> {
        try {
            const producto = new ProductoModel(productData);
            return await producto.save();
        } catch (error) {
            throw new Error(`Error al crear producto: ${error}`);
        }
    }

    // Obtener todos los productos
    async findAll(): Promise<IProducto[]> {
        try {
            return await ProductoModel.find().exec();
        } catch (error) {
            throw new Error(`Error al obtener productos: ${error}`);
        }
    }

    // Obtener todos los productos con referencias pobladas
    async findAllPopulated(): Promise<IProducto[]> {
        try {
            return await ProductoModel.find()
                .populate('principioActivo')
                .populate('concentracion')
                .populate('formaFarmaceutica')
                .populate('subcategoria')
                .populate('laboratorio')
                .populate('unidadMedida')
                .exec();
        } catch (error) {
            throw new Error(`Error al obtener productos poblados: ${error}`);
        }
    }

    // Obtener producto por ID
    async findById(id: string): Promise<IProducto | null> {
        try {
            return await ProductoModel.findById(id).exec();
        } catch (error) {
            throw new Error(`Error al obtener producto por ID: ${error}`);
        }
    }

    // Obtener producto por ID con referencias pobladas
    async findByIdPopulated(id: string): Promise<IProducto | null> {
        try {
            return await ProductoModel.findById(id)
                .populate('principioActivo')
                .populate('concentracion')
                .populate('formaFarmaceutica')
                .populate('subcategoria')
                .populate('laboratorio')
                .populate('unidadMedida')
                .exec();
        } catch (error) {
            throw new Error(`Error al obtener producto poblado por ID: ${error}`);
        }
    }

    // Buscar producto por código de barras
    async findByCodigoBarras(codigoBarras: string): Promise<IProducto | null> {
        try {
            return await ProductoModel.findOne({ codigoBarras }).exec();
        } catch (error) {
            throw new Error(`Error al buscar producto por código de barras: ${error}`);
        }
    }

    // Buscar productos por nombre comercial (búsqueda parcial)
    async findByNombreComercial(nombre: string): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({
                nombreComercial: { $regex: nombre, $options: 'i' }
            }).exec();
        } catch (error) {
            throw new Error(`Error al buscar productos por nombre comercial: ${error}`);
        }
    }

    // Buscar productos por nombre genérico (búsqueda parcial)
    async findByNombreGenerico(nombre: string): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({
                nombreGenerico: { $regex: nombre, $options: 'i' }
            }).exec();
        } catch (error) {
            throw new Error(`Error al buscar productos por nombre genérico: ${error}`);
        }
    }

    // Buscar productos por principio activo
    async findByPrincipioActivo(principioActivoId: string): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({ principioActivo: principioActivoId }).exec();
        } catch (error) {
            throw new Error(`Error al buscar productos por principio activo: ${error}`);
        }
    }

    // Buscar productos por laboratorio
    async findByLaboratorio(laboratorioId: string): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({ laboratorio: laboratorioId }).exec();
        } catch (error) {
            throw new Error(`Error al buscar productos por laboratorio: ${error}`);
        }
    }

    // Buscar productos por subcategoría
    async findBySubcategoria(subcategoriaId: string): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({ subcategoria: subcategoriaId }).exec();
        } catch (error) {
            throw new Error(`Error al buscar productos por subcategoría: ${error}`);
        }
    }

    // Obtener productos con stock bajo
    async findLowStock(): Promise<IProducto[]> {
        try {
            return await ProductoModel.find({
                $expr: { $lte: ["$stockActual", "$stockMinimo"] }
            }).exec();
        } catch (error) {
            throw new Error(`Error al obtener productos con stock bajo: ${error}`);
        }
    }

    // Actualizar producto por ID
    async updateById(id: string, updateData: Partial<IProducto>): Promise<IProducto | null> {
        try {
            return await ProductoModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            ).exec();
        } catch (error) {
            throw new Error(`Error al actualizar producto: ${error}`);
        }
    }

    // Eliminar producto por ID
    async deleteById(id: string): Promise<IProducto | null> {
        try {
            return await ProductoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error(`Error al eliminar producto: ${error}`);
        }
    }

    // Verificar si existe un producto por código de barras
    async existsByCodigoBarras(codigoBarras: string): Promise<boolean> {
        try {
            const count = await ProductoModel.countDocuments({ codigoBarras });
            return count > 0;
        } catch (error) {
            throw new Error(`Error al verificar código de barras: ${error}`);
        }
    }

    // Contar total de productos
    async count(): Promise<number> {
        try {
            return await ProductoModel.countDocuments();
        } catch (error) {
            throw new Error(`Error al contar productos: ${error}`);
        }
    }

    // Obtener productos con paginación
    async findPaginated(page: number = 1, limit: number = 10): Promise<{
        products: IProducto[];
        total: number;
        totalPages: number;
        currentPage: number;
    }> {
        try {
            const skip = (page - 1) * limit;
            const [products, total] = await Promise.all([
                ProductoModel.find().skip(skip).limit(limit).exec(),
                ProductoModel.countDocuments()
            ]);

            return {
                products,
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            };
        } catch (error) {
            throw new Error(`Error en paginación de productos: ${error}`);
        }
    }

    // Búsqueda avanzada de productos
    async searchProducts(searchParams: {
        nombreComercial?: string;
        nombreGenerico?: string;
        principioActivo?: string;
        laboratorio?: string;
        subcategoria?: string;
    }): Promise<IProducto[]> {
        try {
            const query: any = {};

            if (searchParams.nombreComercial) {
                query.nombreComercial = { $regex: searchParams.nombreComercial, $options: 'i' };
            }

            if (searchParams.nombreGenerico) {
                query.nombreGenerico = { $regex: searchParams.nombreGenerico, $options: 'i' };
            }

            if (searchParams.principioActivo) {
                query.principioActivo = searchParams.principioActivo;
            }

            if (searchParams.laboratorio) {
                query.laboratorio = searchParams.laboratorio;
            }

            if (searchParams.subcategoria) {
                query.subcategoria = searchParams.subcategoria;
            }

            return await ProductoModel.find(query)
                .populate('principioActivo')
                .populate('concentracion')
                .populate('formaFarmaceutica')
                .populate('subcategoria')
                .populate('laboratorio')
                .populate('unidadMedida')
                .exec();
        } catch (error) {
            throw new Error(`Error en búsqueda avanzada: ${error}`);
        }
    }
}

export const productoRepository = new ProductoRepository();
