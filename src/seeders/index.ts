import { connectDb } from "../config/database";
import { seedModules } from "./module.seeder";

const runSeeders = async () => {
    try {
        await connectDb();
        console.log("✅ Conectado a MongoDB");

        await seedModules();



        console.log("🌱 Seeders ejecutados correctamente");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error ejecutando seeders:", error);
        process.exit(1);
    }
};



runSeeders();