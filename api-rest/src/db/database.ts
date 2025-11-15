import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI não está definida no arquivo .env");
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("Mongo conectado com sucesso!!");
    } catch (err) {
        console.error("Houve um erro ao se conectar com o banco de dados:", err);
        process.exit(1);
    }
};

export default connectDB;
