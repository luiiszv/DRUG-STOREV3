import { connectDb } from "../config/database";
import { seedModules } from "./module.seeder";
import { seedRoles } from "./role.seeder";
import { seedUsers } from "./user.seeder";

const runSeeders = async () => {
    try {
        await connectDb();
        console.log("✅ Conectado a MongoDB");

        await seedModules();
        await seedRoles();
        await seedUsers();



        console.log("🌱 Seeders ejecutados correctamente");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error ejecutando seeders:", error);
        process.exit(1);
    }
};



runSeeders();