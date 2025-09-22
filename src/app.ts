import express, { Application, Request, Response } from 'express';
import { errorHandler } from "./core/errors/errorHandler";
import { PORT } from "./config/env";
import { swaggerUi, swaggerSpec } from "./config/swagger";
import cookieParser from "cookie-parser"; // en tu app.ts
import morgan from 'morgan';



//routas
import userRoutes from "./modules/users/user.routes"; // Importa las rutas de usuario
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/products/producto.routes";
import principioActivo from "./modules/principioActivo/principioActivo.routes";
import concentracionRoutes from './modules/concentraciones/concentracion.routes';
import formaFarmaceuticaRoutes from './modules/formasFarmaceuticas/formaFarmaceutica.routes';
import subcategoriaRoutes from './modules/subCategorias/subcategoria.routes';
import categoriaRoutes from './modules/categoria/categoria.routes';

const app: Application = express();


app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.json()); // Para recibir JSON en las peticiones


// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de usuarios
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes); // Rutas de productos
app.use("/api/principio-activo", principioActivo); // Rutas de principio activo
app.use("/api/concentraciones", concentracionRoutes); // Rutas de concentraciones
app.use('/api/formas-farmaceuticas', formaFarmaceuticaRoutes); // Rutas de formas farmacéuticas
app.use('/api/subcategorias', subcategoriaRoutes); // Rutas de subcategorías
app.use('/api/categorias', categoriaRoutes); // Rutas de categorías

// Ruta por defecto para endpoints no encontrados
app.use((_req: Request, _res: Response) => {
    _res.status(404).json({ message: "Endpoint not found" });
});

app.use(errorHandler);
app.set('port', PORT || 4000);

export default app;