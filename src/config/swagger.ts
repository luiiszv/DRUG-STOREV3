import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Drug Store API",
            version: "1.0.0",
            description: "Documentación de la API de autenticación y usuarios"
        }
    },
    apis: [
        "./src/modules/auth/auth.routes.ts",
        "./src/modules/users/user.routes.ts",
        "./src/modules/products/producto.routes.ts",
        "./src/modules/categories/categoria.routes.ts",
        "./src/modules/principioActivo/principioActivo.routes.ts",
    ]
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };