import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION = process.env.DB_CONNECTION || "mongodb://localhost:27017";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_CONNECTION);
        logger.info("Connected to database");
    } catch (error) {
        logger.error("Error connecting to database: ", error);
        process.exit(1);
    }
}

export const disconnectFromDatabase = async () => {
    await mongoose.connection.close();
    logger.info("Disconnected from database");
}