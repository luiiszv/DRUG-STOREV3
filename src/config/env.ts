
import { config } from "dotenv";
config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/drug_store";
const PORT = process.env.PORT || 4000;



export {
    MONGODB_URI,
    PORT
};