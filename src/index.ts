import { config } from "dotenv";
import { connectDb } from "./config/database";
import app from "./app";

config();



const startServer = async (): Promise<void> => {
    try {
       
        await connectDb();
        console.log('✅ Conectado a MongoDB Atlas');
      
        app.listen(app.get('port'), () => {
            console.log('🚀 Servidor ejecutándose en puerto', app.get('port'));

        });

    } catch (error) {
        console.error(' Error iniciando la aplicación:', error);
        process.exit(1);
    }
};

// Iniciar toda la aplicación
startServer();