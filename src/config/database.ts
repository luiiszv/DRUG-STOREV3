import { connect, connection } from "mongoose";
import { MONGODB_URI } from "../config/env";

const connectDb = async (): Promise<void> => {
    try {
        if (!MONGODB_URI) {
            throw new Error("La URI de MongoDB no está definida en el archivo .env");
        }
        await connect(MONGODB_URI);
        console.log("Connected to database", connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


export { connectDb };