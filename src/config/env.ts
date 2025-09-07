
import { config } from "dotenv";
config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/drug_store";
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || "your_default_secret_key";
const EXPIRES_IN = process.env.EXPIRES_IN || "9h";
const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const NODE_ENV = process.env.NODE_ENV || "development";

export {
    MONGODB_URI,
    PORT,
    SECRET_KEY,
    EXPIRES_IN,
    SALT_ROUNDS,
    NODE_ENV
};